import { useState, useEffect } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import MessageInput from "@/components/chat/MessageInput";
import ChatHeader from "@/components/chat/ChatHeader";
import ErrorBoundary from "@/components/chat/ErrorBoundary";
import { Container, Spinner } from "react-bootstrap";
import { createConnection } from "@/services/SignalRService";
import { startChat, sendMessage, formatMessages } from "@/services/ChatService";
import { getToken, getSenderId } from "@/utils/AuthUtils";
import { useLocation } from "react-router-dom";
const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const data = location.state;

  const token = getToken();
  const receiverId = data.receiverId;
  const senderId = getSenderId(token);

  useEffect(() => {
    const newConnection = createConnection(token);
    setConnection(newConnection);
  }, [token]);

  useEffect(() => {
    if (connection) {
      setLoading(true);
      connection
        .start()
        .then(async () => {
          try {
            const chat = await startChat(connection, senderId, receiverId);
            setChat(chat);

            const formattedMessages = formatMessages(chat.messages, senderId);
            setMessages(formattedMessages);

            connection.on("ReceiveMessage", (user, receivedMessage) => {
              const newMessage = {
                text: receivedMessage,
                sender: user,
                isSender: user === senderId,
                sentAt: new Date().toLocaleTimeString(),
              };

              setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
          } catch (err) {
            setError("فشل بدء المحادثة. حاول مرة أخرى");
          } finally {
            setLoading(false);
          }
        })
        .catch((err) => {
          setError("فشل الاتصال بالخادم");
          setLoading(false);
        });
    }
  }, [connection, receiverId, senderId]);

  const handleSend = async (text) => {
    if (connection && chat?.chatId) {
      try {
        await sendMessage(connection, chat.chatId, text);

        //setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (err) {
        setError("فشل الإرسال. الرجاء المحاولة مرة أخرى.");
      }
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  return (
    <Container className="d-flex flex-column" style={{ height: "100vh" }}>
      <ChatHeader
        chat={chat}
        receiverId={receiverId}
        bookingDetails={data.bookingDetails}
      />

      <ChatWindow messages={messages} />

      <div className="mt-auto">
        <MessageInput onSend={handleSend} />
      </div>
    </Container>
  );
};

export default ChatPage;
