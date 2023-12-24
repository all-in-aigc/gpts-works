import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Gpts } from "@/app/types/gpts";
import Stripe from "stripe";
import { findByUuid } from "@/app/models/gpts";
import { renameShortUrl } from "@/app/utils/gpts";
import { updatePromoteOrderStatus } from "@/app/models/order";

async function handleWithSession(
  session_id: string
): Promise<Gpts | undefined> {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("pay success session: ", session);
    if (
      !session ||
      !session.metadata ||
      !session.metadata.order_no ||
      !session.metadata.gpts_uuid
    ) {
      console.log("invalid session");
      return;
    }

    const order_no = session.metadata.order_no;
    const paied_at = new Date().toISOString();
    updatePromoteOrderStatus(order_no, 2, paied_at);
    console.log(
      "update promote order with success status: ",
      order_no,
      paied_at
    );

    const gpts_uuid = session.metadata.gpts_uuid;
    const gpts = findByUuid(gpts_uuid);

    return gpts;
  } catch (e) {
    console.log("handle pay success session failed: ", e);
  }
}

const SuccessPanel = (gpts: Gpts | undefined) => {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            Congratulations
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              Your GPTs{" "}
              <span className="text-primary">{gpts && gpts.name}</span> has been
              promoted.
            </p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              {gpts && (
                <a
                  href={`/${renameShortUrl(gpts.short_url, gpts.uuid)}`}
                  target="_blank"
                  className="mr-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  View this GPTs
                </a>
              )}
              <a
                href="/dashboard/my-gpts/promoted"
                className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                Manage promoted GPTs
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async ({ params }: { params: { session_id: string } }) => {
  const gpts = await handleWithSession(params.session_id);
  console.log("promoted gpts: ", gpts);

  return (
    <div>
      <h2 className="text-3xl font-medium mb-8">Promote GPTs Success</h2>
      {SuccessPanel(gpts)}
    </div>
  );
};
