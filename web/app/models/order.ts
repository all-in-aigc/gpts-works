import { Gpts } from "@/app/types/gpts";
import { PromoteOrder } from "@/app/types/order";
import { getByUuids } from "@/app/models/gpts";
import { getDb } from "@/app/models/db";

export async function insertPromoteOrder(order: PromoteOrder) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO promote_orders 
        (order_no, created_at, user_email, gpts_uuid, amount, plan, expired_at, order_status) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    [
      order.order_no,
      order.created_at,
      order.user_email,
      order.gpts_uuid,
      order.amount,
      order.plan,
      order.expired_at,
      order.order_status,
    ]
  );

  return res;
}

export async function findPromoteOrderByOrderNo(
  order_no: number
): Promise<PromoteOrder | undefined> {
  const db = getDb();
  const res = await db.query(
    `SELECT * FROM promote_orders WHERE order_no = $1 LIMIT 1`,
    [order_no]
  );
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const order: PromoteOrder = {
    order_no: row.order_no,
    created_at: row.created_at,
    user_email: row.user_email,
    gpts_uuid: row.gpts_uuid,
    amount: row.amount,
    plan: row.plan,
    expired_at: row.expired_at,
    order_status: row.order_status,
    paied_at: row.paied_at,
    stripe_session_id: row.stripe_session_id,
  };

  return order;
}

export async function updatePromoteOrderStatus(
  order_no: string,
  order_status: number,
  paied_at: string
) {
  const db = getDb();
  const res = await db.query(
    `UPDATE promote_orders SET order_status=$1, paied_at=$2 WHERE order_no=$3`,
    [order_status, paied_at, order_no]
  );

  return res;
}

export async function updatePromoteOrderSession(
  order_no: string,
  stripe_session_id: string
) {
  const db = getDb();
  const res = await db.query(
    `UPDATE promote_orders SET stripe_session_id=$1 WHERE order_no=$2`,
    [stripe_session_id, order_no]
  );

  return res;
}

export async function getPromotedGpts(): Promise<Gpts[] | undefined> {
  const now = new Date().toISOString();
  const db = getDb();
  const res = await db.query(
    `SELECT * FROM promote_orders WHERE order_status = 2 AND expired_at >= $1`,
    [now]
  );
  if (res.rowCount === 0) {
    return undefined;
  }

  let gpts_uuids: string[] = [];
  const { rows } = res;
  rows.forEach((row) => {
    gpts_uuids.push(row.gpts_uuid);
  });

  const gpts_list = getByUuids(gpts_uuids);

  return gpts_list;
}

export async function getUserPromotedUuids(
  user_email: string
): Promise<string[] | undefined> {
  const now = new Date().toISOString();
  const db = getDb();
  const res = await db.query(
    `SELECT * FROM promote_orders WHERE user_email = $1 AND order_status = 2 AND expired_at >= $2`,
    [user_email, now]
  );
  if (res.rowCount === 0) {
    return undefined;
  }

  let gpts_uuids: string[] = [];
  const { rows } = res;
  rows.forEach((row) => {
    gpts_uuids.push(row.gpts_uuid);
  });

  return gpts_uuids;
}

export async function getUserPromotedGpts(
  user_email: string
): Promise<Gpts[] | undefined> {
  const gpts_uuids = await getUserPromotedUuids(user_email);
  if (!gpts_uuids) {
    return;
  }

  let gpts = await getByUuids(gpts_uuids);
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
