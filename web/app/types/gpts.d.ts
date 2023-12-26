import { User } from "./user";

export interface Gpts {
  uuid: string;
  org_id: string;
  name: string;
  description: string;
  avatar_url: string;
  short_url: string;
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  detail?: any;
  visit_url?: string;
  avatar_cdn_url?: string;
  rating?: number;
  is_promoted?: boolean;
  submitted_at?: string;
  submitted_user?: User;
}

export interface UserGpts {
  user_email: string;
  gpts_uuid: string;
}
