export interface ConversationItem {
  speaker: string;
  message: string;
}

export interface Conversation {
  greeting: ConversationItem;
  goodbye: ConversationItem;
}

export const conversationData = {
  greeting: {
    speaker: "Seller",
    message: "Welcome to my store! How can I assist you today?",
  },
  goodbye: { speaker: "Seller", message: "Thank you for visiting!" },
};
