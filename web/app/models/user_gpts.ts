import { Gpts, UserGpts } from "@/app/types/gpts";
import { formatGpts, getByUuids } from "./gpts";

import { sql } from "@vercel/postgres";

export async function insertUserGpts(userEmail: string, gptsUuid: string) {
  const createdAt: string = new Date().toISOString();

  const res = await sql`INSERT INTO user_gpts 
      (user_email, gpts_uuid, created_at) 
      VALUES 
      (${userEmail}, ${gptsUuid}, ${createdAt})
  `;

  return res;
}

export async function findUserGpts(
  userEmail: string,
  gptsUuid: string
): Promise<UserGpts | undefined> {
  const res =
    await sql`SELECT * FROM user_gpts WHERE user_email = ${userEmail} AND gpts_uuid = ${gptsUuid} LIMIT 1`;
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];

  const userGpts: UserGpts = {
    user_email: row.user_email,
    gpts_uuid: row.gptsUuid,
  };

  return userGpts;
}

export async function getUserGpts(
  user_email: string,
  page: number,
  limit: number
): Promise<Gpts[] | undefined> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const res =
    await sql`SELECT * FROM user_gpts WHERE user_email = ${user_email} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  let uuids: string[] = [];

  rows.forEach((row) => {
    uuids.push(row.gpts_uuid);
  });

  const gpts = await getByUuids(uuids);

  return gpts;
}
