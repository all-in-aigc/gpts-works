export interface PromoteOrder {
  order_no: string;
  created_at: string;
  user_email: string;
  gpts_uuid: string;
  amount: number;
  plan: string;
  expired_at: string;
  order_status: number;
  paied_at?: string;
  stripe_session_id?: string;
}
