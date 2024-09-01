import { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message, "text");
      setMessage("");
    }
  };

  return (
    <InputGroup className="p-3 border-top">
      <FormControl
        placeholder="اكتب رسالة..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button variant="success" onClick={handleSend}>
        إرسال
      </Button>
    </InputGroup>
  );
}

export default MessageInput;
