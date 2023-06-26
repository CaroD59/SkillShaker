export interface MessageInterface {
  id: number;
  abuse: any;
  message: string;
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  updated_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  is_post: boolean;
  id_conversation: any;
  author_id: number;
  author_abuse: any;
  author_block: any;
  author_email: string;
  author_firstname: string;
  author_image_name: string;
  tags: {
    m_id: number;
    id: number;
    name: string;
    community: string;
  }[];
  audience: number;
}

export interface AllMessages {
  messages: MessageInterface[];
}
