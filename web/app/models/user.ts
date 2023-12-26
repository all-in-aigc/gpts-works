import {
  QueryResult,
  QueryResultRow,
  createClient,
  db,
} from "@vercel/postgres";

import { User } from "@/app/types/user";

export async function insertUser(user: User) {
  const createdAt: string = new Date().toISOString();

  const client = await db.connect();
  const res = await client.sql`INSERT INTO users 
      (email, nickname, avatar_url, created_at) 
      VALUES 
      (${user.email}, ${user.nickname}, ${user.avatar_url}, ${createdAt})
  `;

  return res;
}

export async function findUserByEmail(
  email: string
): Promise<User | undefined> {
  const client = await db.connect();
  const res =
    await client.sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const user: User = {
    email: row.email,
    nickname: row.nickname,
    avatar_url: row.avatar_url,
    created_at: row.created_at,
  };

  return user;
}
