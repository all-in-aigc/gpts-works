import { QueryResult, QueryResultRow } from "pg";

import { Gpts } from "@/app/types/gpts";
import { getDb } from "@/app/models/db";
import { getPromotedGpts } from "@/app/models/order";
import { isGptsSensitive } from "@/app/services/gpts";
import { mergeGptsList } from "@/app/utils/gpts";

export async function createTable() {
  const db = getDb();
  const res = await db.query(`CREATE TABLE gpts (
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
);`);

  return res;
}

export async function insertRow(gpts: Gpts) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO gpts 
  (uuid, org_id, name, description, avatar_url, short_url, author_id, author_name, created_at, updated_at, detail) 
  VALUES 
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
`,
    [
      gpts.uuid,
      gpts.org_id,
      gpts.name,
      gpts.description,
      gpts.avatar_url,
      gpts.short_url,
      gpts.author_id,
      gpts.author_name,
      gpts.created_at,
      gpts.updated_at,
      gpts.detail,
    ]
  );

  return res;
}

export async function updateAvatarCdnUrl(uuid: string, avatarCdnUrl: string) {
  const db = getDb();
  const res = await db.query(
    `UPDATE gpts SET avatar_cdn_url=$1 WHERE uuid=$2`,
    [avatarCdnUrl, uuid]
  );

  return res;
}

export async function getUuids(): Promise<string[]> {
  const db = getDb();
  const res = await db.query(`SELECT uuid FROM gpts`);
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
  const db = getDb();
  const res = await db.query(`SELECT uuid FROM gpts WHERE avatar_cdn_url = ''`);
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

export async function getRows(page: number, limit: number): Promise<Gpts[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `SELECT * FROM gpts ORDER BY created_at asc LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
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

  const db = getDb();
  const res = await db.query(
    `SELECT * FROM gpts WHERE name ILIKE $1 ORDER BY sort DESC LIMIT 100`,
    [keyword]
  );

  return getGptsFromSqlResult(res);
}

export async function getByUuids(uuids: string[]): Promise<Gpts[]> {
  try {
    const db = getDb();
    const placeholders = uuids.map((_, index) => `$${index + 1}`).join(", ");
    const res = await db.query(
      `SELECT * FROM gpts WHERE uuid IN (${placeholders})`,
      uuids
    );

    return getGptsFromSqlResult(res);
  } catch (e) {
    return [];
  }
}

export async function getRandRows(
  page: number,
  limit: number
): Promise<Gpts[]> {
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `SELECT * FROM gpts ORDER BY RANDOM() LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return getGptsFromSqlResult(res);
}

export async function getLatestRows(
  page: number,
  limit: number
): Promise<Gpts[]> {
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `SELECT * FROM gpts ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return getGptsFromSqlResult(res);
}

export async function getRecommendedRows(
  page: number,
  limit: number
): Promise<Gpts[]> {
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `SELECT * FROM gpts WHERE is_recommended=true ORDER BY sort DESC LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return getGptsFromSqlResult(res);
}

export async function getHotRows(page: number, limit: number): Promise<Gpts[]> {
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `SELECT * FROM gpts WHERE rating IS NOT null ORDER BY rating DESC, sort DESC LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return getGptsFromSqlResult(res);
}

export async function getTotalCount(): Promise<number> {
  const db = getDb();
  const res = await db.query(`SELECT count(1) as count FROM gpts LIMIT 1`);
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export async function findByUuid(uuid: string): Promise<Gpts | undefined> {
  const db = getDb();
  const res = await db.query(`SELECT * FROM gpts WHERE uuid = $1 LIMIT 1`, [
    uuid,
  ]);
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const gpts = formatGpts(row);

  return gpts;
}

export function getGptsFromSqlResult(res: QueryResult<QueryResultRow>): Gpts[] {
  if (!res.rowCount || res.rowCount === 0) {
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
  let gpts: Gpts = {
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
    submitted_at: row.submitted_at,
  };

  if (row.submitted_at > 0 && row.submitted_user_email) {
    gpts.submitted_user = {
      email: row.submitted_user_email,
      nickname: row.submitted_user_name,
      avatar_url: row.submitted_user_avatar,
    };
  }

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
