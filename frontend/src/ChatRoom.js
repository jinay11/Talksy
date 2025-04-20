import React, { useEffect, useState } from "react";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    try {
      await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, message }),
      });
      // Clear the message input after sending
      setMessage("");
      // Fetch messages to update the list
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    // fetch messages on componet mount
    fetchMessages();
    // poll for new messages every 2 seconds
    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);
    return () => clearInterval(interval);
  }, []); //runs only once on mount

  return (
    <div>
      <h2>Chat Room</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <strong>{message.user} </strong>
            {message.message}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="message"
          placeholder="Type Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;