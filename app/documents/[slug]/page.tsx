'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { sendMessage } from '@/pages/api/documents';

export default function DocumentPage() {
  const docId = usePathname()?.split('/')?.pop() ?? '';
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: 'user' | 'system', loading?: boolean }>>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Add the user message
    const newMessage = { id: messages.length + 1, text: inputValue, sender: 'user' };
    setMessages([...messages, newMessage]);

    // Indicate loading for the system message
    const loadingMessage = { id: messages.length + 2, text: '', sender: 'system', loading: true };
    setMessages(prev => [...prev, loadingMessage]);
    setInputValue('');

    // Simulate API call
    const response = await sendMessage(inputValue, docId);

    // Update the messages, replace the loading message with the actual system message
    setMessages(prev => prev.map(m => (m.loading ? { ...m, text: response.response, loading: false } : m)));
  };

  return (
    <div className="flex flex-col mx-2 md:mx-20 lg:mx-60">
      <div className="flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`max-w-xs md:max-w-md lg:max-w-2xl ${message.sender === 'user' ? 'ml-auto bg-blue-200' : 'mr-auto bg-gray-200'} rounded px-4 py-2 flex items-center`}>
            {message.loading ? (
              <div className="loader-dots block relative w-20 h-5 mt-2">
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-black"></div>
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-black"></div>
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-black"></div>
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-black"></div>
              </div>
            ) : (
              <span>{message.text}</span>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 fixed inset-x-0 bottom-0 bg-[#f8f5ee] border-2 mx-2 md:mx-20 lg:mx-60 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Ask anything..."
          className="w-full p-2 rounded-full text-black placeholder-gray-400 focus:outline-none border-4"
        />
        <button
          onClick={handleSendMessage}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black p-2 "
        >
          🔍
        </button>
      </div>
    </div>
  );
}
