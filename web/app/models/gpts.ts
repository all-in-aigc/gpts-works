import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";

import { Gpts } from "@/app/types/gpts";
import { isGptsSensitive } from "@/app/services/gpts";

export async function createTable() {
  const res = await sql`CREATE TABLE gpts (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(50) UNIQUE NOT NULL,
    org_id VARCHAR(50),
    name VARCHAR(50),
    description TEXT,
    avatar_url VARCHAR(255),
    short_url VARCHAR(100),
    author_id VARCHAR(50),
    author_name VARCHAR(50),
    created_at timestamptz,
    updated_at timestamptz,
    detail JSON 
);`;

  return res;
}

export async function insertRow(gpts: Gpts) {
  const res = await sql`INSERT INTO gpts 
    (uuid, org_id, name, description, avatar_url, short_url, author_id, author_name, created_at, updated_at, detail) 
    VALUES 
    (${gpts.uuid}, ${gpts.org_id}, ${gpts.name}, ${gpts.description}, ${gpts.avatar_url}, ${gpts.short_url}, ${gpts.author_id}, ${gpts.author_name}, ${gpts.created_at}, ${gpts.updated_at}, ${gpts.detail})
`;

  return res;
}

export async function updateAvatarCdnUrl(uuid: string, avatarCdnUrl: string) {
  const res =
    await sql`UPDATE gpts SET avatar_cdn_url=${avatarCdnUrl} WHERE uuid=${uuid}`;

  return res;
}

export async function getUuids(): Promise<string[]> {
  const res = await sql`SELECT uuid FROM gpts`;
  if (res.rowCount === 0) {
    return [];
  }

  const { rows } = res;
  let uuids: string[] = [];
  rows.forEach((row) => {
    uuids.push(row.uuid);
  });

  return uuids;
}

export async function getNoAvatarCdnUrlUuids(): Promise<string[]> {
  const res = await sql`SELECT uuid FROM gpts WHERE avatar_cdn_url = ''`;
  if (res.rowCount === 0) {
    return [];
  }

  const { rows } = res;
  let uuids: string[] = [];
  rows.forEach((row) => {
    uuids.push(row.uuid);
  });

  return uuids;
}

export async function getRows(last_id: number, limit: number): Promise<Gpts[]> {
  const res =
    await sql`SELECT * FROM gpts WHERE id > ${last_id} LIMIT ${limit} `;
  if (res.rowCount === 0) {
    return [];
  }

  const gpts: Gpts[] = [];
  const { rows } = res;

  rows.forEach((row) => {
    const gpt = formatGpts(row);
    if (gpt) {
      gpts.push(gpt);
    }
  });

  return gpts;
}

export async function getRowsByName(name: string): Promise<Gpts[]> {
  const keyword = `%${name}%`;
  const res =
    await sql`SELECT * FROM gpts WHERE name ILIKE ${keyword} ORDER BY sort DESC LIMIT 50`;

  return getGptsFromSqlResult(res);
}

export async function getRandRows(
  last_id: number,
  limit: number
): Promise<Gpts[]> {
  const res =
    await sql`SELECT * FROM gpts WHERE id > ${last_id} ORDER BY RANDOM() LIMIT ${limit}`;

  return getGptsFromSqlResult(res);
}

export async function getLatestRows(
  last_id: number,
  limit: number
): Promise<Gpts[]> {
  const res =
    await sql`SELECT * FROM gpts WHERE id > ${last_id} ORDER BY created_at DESC LIMIT ${limit}`;

  return getGptsFromSqlResult(res);
}

export async function getRecommendedRows(
  last_id: number,
  limit: number
): Promise<Gpts[]> {
  const res =
    await sql`SELECT * FROM gpts WHERE is_recommended=true AND id > ${last_id} ORDER BY sort DESC LIMIT ${limit}`;

  return getGptsFromSqlResult(res);
}

export async function getHotRows(
  last_id: number,
  limit: number
): Promise<Gpts[]> {
  const res =
    await sql`SELECT * FROM gpts WHERE rating IS NOT null AND id > ${last_id} ORDER BY rating DESC, sort DESC LIMIT ${limit}`;

  return getGptsFromSqlResult(res);
}

export async function getTotalCount(): Promise<number> {
  const res = await sql`SELECT count(1) as count FROM gpts LIMIT 1`;
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export async function findByUuid(uuid: string): Promise<Gpts | undefined> {
  const res = await sql`SELECT * FROM gpts WHERE uuid = ${uuid} LIMIT 1`;
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const gpts = formatGpts(row);

  return gpts;
}

function getGptsFromSqlResult(res: QueryResult<QueryResultRow>): Gpts[] {
  if (res.rowCount === 0) {
    return [];
  }

  const gpts: Gpts[] = [];
  const { rows } = res;
  rows.forEach((row) => {
    const gpt = formatGpts(row);
    if (gpt) {
      gpts.push(gpt);
    }
  });

  return gpts;
}

export function formatGpts(row: QueryResultRow): Gpts | undefined {
  const gpts: Gpts = {
    uuid: row.uuid,
    org_id: row.org_id,
    name: row.name,
    description: row.description,
    avatar_url: row.avatar_url,
    short_url: row.short_url,
    author_id: row.author_id,
    author_name: row.author_name,
    created_at: row.created_at,
    updated_at: row.updated_at,
    visit_url: "https://chat.openai.com/g/" + row.short_url,
    avatar_cdn_url: row.avatar_cdn_url,
    detail: row.detail,
    rating: row.rating,
  };

  if (gpts.avatar_cdn_url) {
    gpts.avatar_url = gpts.avatar_cdn_url;
  }

  try {
    gpts.detail = JSON.parse(JSON.stringify(gpts.detail));
  } catch (e) {
    console.log("parse gpts detail failed: ", e);
  }

  if (isGptsSensitive(gpts)) {
    return;
  }

  return gpts;
}
