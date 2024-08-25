export const startChat = async (connection, senderId, receiverId) => {
  return await connection.invoke("StartChatAsync", senderId, receiverId);
};

export const sendMessage = async (connection, chatId, text) => {
  return await connection.invoke("SendMessageAsync", chatId, text);
};

export const formatMessages = (messages, senderId) => {
  return messages.map((msg) => ({
    text: msg.message,
    sender: msg.senderId,
    isSender: msg.senderId === senderId,
    sentAt: new Date(msg.sentAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
};
