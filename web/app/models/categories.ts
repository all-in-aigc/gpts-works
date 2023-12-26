import { Category } from "@/app/types/category";
import { db } from "@vercel/postgres";

export async function getCategories(
  page: number,
  limit: number
): Promise<Category[] | undefined> {
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const client = await db.connect();
  const res =
    await client.sql`select * from categories order by sort desc, id asc limit ${limit} offset ${offset}`;
  if (res.rowCount === 0) {
    return undefined;
  }

  let categories: Category[] = [];

  const { rows } = res;
  rows.forEach((row) => {
    categories.push({
      slug: row.slug,
      name: row.name,
      sort: row.sort,
    });
  });

  return categories;
}

export async function findCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const client = await db.connect();
  const res =
    await client.sql`SELECT * FROM categories WHERE slug = ${slug} LIMIT 1`;
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const category: Category = {
    slug: row.slug,
    name: row.name,
    sort: row.sort,
  };

  return category;
}
