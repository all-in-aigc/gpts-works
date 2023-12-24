import { Gpts } from "@/app/types/gpts";
import PromotePlan from "../../_components/PromotePlan";
import { findByUuid } from "@/app/models/gpts";

async function getGpts(uuid: string): Promise<Gpts | undefined> {
  try {
    const gpts = findByUuid(uuid);
    return gpts;
  } catch (e) {
    console.log("get gpts failed: ", e);
  }

  return;
}

export default async ({ params }: { params: { uuid: string } }) => {
  const { uuid } = params;
  const gpts = await getGpts(uuid);

  return (
    <div>
      <h2 className="text-3xl font-medium mb-8">Promote Checkout</h2>
      {gpts && <PromotePlan gpts={gpts} />}
    </div>
  );
};
