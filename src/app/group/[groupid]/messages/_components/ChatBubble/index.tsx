import React from 'react';

type ChatBubbleProps = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  userid: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ senderId, message, createdAt, userid }) => {
  const isSender = senderId === userid;

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isSender ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
        }`}
      >
        <p>{message}</p>
        <span className="text-xs text-gray-600">{new Date(createdAt).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default ChatBubble;