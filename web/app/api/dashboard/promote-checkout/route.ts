import {
  insertPromoteOrder,
  updatePromoteOrderSession,
} from "@/app/models/order";
import { respData, respErr } from "@/app/utils/resp";

import { PromoteOrder } from "@/app/types/order";
import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { genOrderNo } from "@/app/utils/order";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("not login");
  }
  const user_email = user.emailAddresses[0].emailAddress;
  console.log("user email: ", user_email);

  try {
    const { gpts_uuid, amount, plan } = await req.json();
    if (!gpts_uuid || !amount || !plan) {
      return respErr("invalid params");
    }

    const order_no = genOrderNo();

    const currentDate = new Date();
    const oneMonthLater = new Date(currentDate);
    oneMonthLater.setMonth(currentDate.getMonth() + 1);

    const created_at = currentDate.toISOString();
    const expired_at = oneMonthLater.toISOString();

    const promoteOrder: PromoteOrder = {
      order_no: order_no,
      created_at: created_at,
      user_email: user_email,
      gpts_uuid: gpts_uuid,
      amount: amount,
      plan: "montyly",
      expired_at: expired_at,
      order_status: 1,
    };
    insertPromoteOrder(promoteOrder);
    console.log("create new promote order: ", promoteOrder);

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");

    const session = await stripe.checkout.sessions.create({
      customer_email: user_email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "gpts.works promotional plan",
            },
            unit_amount: amount,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      metadata: {
        project: "gpts-works",
        pay_scene: "promote-gpts",
        order_no: order_no.toString(),
        gpts_uuid: gpts_uuid,
        user_email: user_email,
      },
      mode: "subscription",
      success_url: `${process.env.WEB_BASE_URI}/dashboard/promote-success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.WEB_BASE_URI}/dashboard/promote-gpts`,
    });

    const stripe_session_id = session.id;
    updatePromoteOrderSession(order_no, stripe_session_id);
    console.log("update promote order session: ", order_no, stripe_session_id);

    return respData({
      public_key: process.env.STRIPE_PUBLIC_KEY,
      order_no: order_no,
      session_id: stripe_session_id,
    });
  } catch (e) {
    console.log("promote checkout failed: ", e);
    return respErr("promote checkout failed");
  }
}
