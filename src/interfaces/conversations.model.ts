export interface ConversationInterface {
  id: number;
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  nb_users: number;
  message: {
    id: number;
    updated_at: {
      date: string;
      timezone_type: number;
      timezone: string;
    };
    message: string;
    created_at: {
      date: string;
      timezone_type: number;
      timezone: string;
    };
    is_post: boolean;
    author_id: number;
    author_abuse: any;
    author_email: string;
    author_firstname: string;
    author_image_name: string;
    tag_id: number;
    tag_community: string;
    tags: [
      {
        m_id: number;
        id: number;
        name: string;
        community: string;
      }
    ];
  };

  notifications: number;
}

export interface AllConversations {
  conversations: ConversationInterface[];
}
