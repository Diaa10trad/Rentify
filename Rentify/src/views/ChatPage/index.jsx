import { useState, useEffect } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import MessageInput from "@/components/chat/MessageInput";
import ChatHeader from "@/components/chat/ChatHeader";
import ErrorBoundary from "@/components/chat/ErrorBoundary";
import { Container, Spinner } from "react-bootstrap";
import { createConnection } from "@/services/SignalRService";
import {
  startChat,
  sendMessage,
  formatMessages,
  sendBookingMessage,
} from "@/services/ChatService";
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

  const [bookingDetails, setBookingDetails] = useState(data.bookingDetails);
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

            var formattedMessages = formatMessages(chat.messages, senderId);
            formattedMessages = formattedMessages.map((fmsg) => {
              if (fmsg.message.type === "booking") {
                return {
                  ...fmsg,
                  message: {
                    ...fmsg.message,
                    data: {
                      ...fmsg.message.data,
                      startDate: fmsg.message.data.startDate.split("T")[0],
                      endDate: fmsg.message.data.endDate.split("T")[0],
                    },
                  },
                };
              }
              return fmsg;
            });
            var sameBookingExistsOrNoBooking = false;
            for (const fmsg of formattedMessages) {
              if (fmsg.message.type === "booking") {
                var startDateMatches;
                var endDateMatches;
                if (bookingDetails) {
                  console.log(fmsg.message);
                  startDateMatches =
                    fmsg.message.data.startDate === bookingDetails.startDate;
                  endDateMatches =
                    fmsg.message.data.endDate === bookingDetails.endDate;
                } else {
                  sameBookingExistsOrNoBooking = true;
                  setBookingDetails(fmsg.message.data);
                }

                if (startDateMatches && endDateMatches) {
                  sameBookingExistsOrNoBooking = true;

                  setBookingDetails(fmsg.message.data);
                }
              }
            }

            if (!sameBookingExistsOrNoBooking) {
              //then send the initial booking details that came from the item details page
              var messageData = JSON.stringify({
                data: bookingDetails,
                type: "booking",
              });

              await sendMessage(connection, chat.chatId, messageData);
              var newMessage = {
                message: JSON.parse(messageData),
                sender: senderId,
                isSender: true,
                sentAt: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };
              formattedMessages.push(newMessage);
            }

            setMessages(formattedMessages);
            console.log(formattedMessages);

            connection.on("ReceiveMessage", (user, receivedMessage) => {
              const parsedMessage = JSON.parse(receivedMessage);

              if (parsedMessage.type === "booking") {
                parsedMessage.data.startDate =
                  parsedMessage.data.startDate.split("T")[0];
                parsedMessage.data.endDate =
                  parsedMessage.data.endDate.split("T")[0];
              }
              const newMessage = {
                message: parsedMessage,
                sender: user,
                isSender: user === senderId,
                sentAt: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };
              setMessages((prevMessages) => [...prevMessages, newMessage]);

              if (newMessage.message.type == "booking")
                setBookingDetails(newMessage.message.data);
            });
          } catch (err) {
            console.log(err);
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

  const handleSend = async (message, type) => {
    var messageData = JSON.stringify({ data: message, type: type });

    if (connection && chat?.chatId) {
      try {
        if (type == "text") {
          await sendMessage(connection, chat.chatId, messageData);
        } else {
          await sendBookingMessage(connection, chat.chatId, messageData);
        }
        //setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (err) {
        console.log(err);
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
        bookingDetails={bookingDetails}
        setBookingDetails={setBookingDetails}
        onSend={handleSend}
      />

      <ChatWindow messages={messages} />

      <div className="mt-auto">
        <MessageInput onSend={handleSend} />
      </div>
    </Container>
  );
};

export default ChatPage;
