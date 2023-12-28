import { Gpts, UserGpts } from "@/app/types/gpts";
import { getByUuids, getGptsFromSqlResult } from "./gpts";

import { getDb } from "@/app/models/db";
import { getUserPromotedUuids } from "@/app/models/order";

export async function insertUserGpts(userEmail: string, gptsUuid: string) {
  const createdAt: string = new Date().toISOString();

  const db = getDb();
  const res = await db.query(
    `INSERT INTO user_gpts 
      (user_email, gpts_uuid, created_at) 
      VALUES 
      ($1, $2, $3)
  `,
    [userEmail, gptsUuid, createdAt]
  );

  return res;
}

export async function findUserGpts(
  userEmail: string,
  gptsUuid: string
): Promise<UserGpts | undefined> {
  const db = getDb();
  const res = await db.query(
    `SELECT * FROM user_gpts WHERE user_email = $1 AND gpts_uuid = $2 LIMIT 1`,
    [userEmail, gptsUuid]
  );
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

  const db = getDb();
  const res = await db.query(
    `SELECT * FROM user_gpts WHERE user_email = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
    [user_email, limit, offset]
  );
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  let uuids: string[] = [];

  rows.forEach((row) => {
    uuids.push(row.gpts_uuid);
  });

  const gpts = await getByUuids(uuids);
  if (gpts) {
    const promoted_uuids = await getUserPromotedUuids(user_email);
    if (promoted_uuids) {
      for (let i = 0, l = gpts.length; i < l; i++) {
        if (promoted_uuids.includes(gpts[i].uuid)) {
          gpts[i].is_promoted = true;
        }
      }
    }
  }

  return gpts;
}

export async function getFeedGpts(
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

  const db = getDb();
  const res = await db.query(
    `select g.*, ug.created_at as submitted_at, ug.user_email as submitted_user_email, u.nickname as submitted_user_name, u.avatar_url as submitted_user_avatar from user_gpts as ug left join gpts as g on ug.gpts_uuid = g.uuid left join users as u on ug.user_email = u.email order by ug.id desc limit $1 offset $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return undefined;
  }

  const gpts = getGptsFromSqlResult(res);

  return gpts;
}
