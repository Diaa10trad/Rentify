import { Container } from "react-bootstrap";
import ChatMessage from "@/components/chat/ChatMessage";
import { useEffect, useRef, useState } from "react";

function ChatWindow({ messages }) {
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      // Check if the user is at the bottom (or close to it)
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll to bottom if the user was already at the bottom
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]); // Scroll to bottom when messages change

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => {
        chatContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <Container
      fluid
      className="py-3"
      style={{ overflowY: "auto" }}
      ref={chatContainerRef}
    >
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </Container>
  );
}

export default ChatWindow;
