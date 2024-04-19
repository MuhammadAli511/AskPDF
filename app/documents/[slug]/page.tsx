'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { sendMessage, chatHistory } from '@/pages/api/documents';

export default function DocumentPage() {
  const docId = usePathname()?.split('/')?.pop() ?? '';
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: 'user' | 'system', loading?: boolean, feedback?: 'positive' | 'negative' }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [userQuestion, setUserQuestion] = useState('');

  type Message = {
    id: number;
    text: string;
    sender: 'user' | 'system';
    loading?: boolean;
    feedback?: 'positive' | 'negative';
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = { id: messages.length + 1, text: inputValue, sender: 'user' };
    setMessages([...messages, newMessage]);

    const loadingMessage: Message = { id: messages.length + 2, text: '', sender: 'system', loading: true };
    setMessages(prev => [...prev, loadingMessage]);

    const response = await sendMessage(inputValue, docId);
    setUserQuestion(inputValue);

    setMessages(prev => prev.map(m => (m.loading ? { ...m, text: response.response, loading: false } : m)));

    setInputValue('');
  };

  const handleFeedback = async (id: number, feedback: string) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id) {
        if (message.feedback !== feedback) {
          chatHistory(userQuestion, message.text, feedback, docId);
        }
        return { ...message, feedback: feedback as 'positive' | 'negative' | undefined };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  return (
    <div className="flex flex-col mx-2 md:mx-20 lg:mx-60">
      <div className="flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`max-w-xs md:max-w-md lg:max-w-2xl ${message.sender === 'user' ? 'ml-auto bg-blue-200' : 'mr-auto bg-gray-200'} rounded px-4 py-2 flex items-center justify-between`}>
            {message.loading ? (
              <div className="loader-dots block relative w-20 h-5 mt-2">
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-black"></div>
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-black"></div>
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-black"></div>
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-black"></div>
              </div>
            ) : (
              <>
                <span>{message.text}</span>
                {message.sender === 'system' && (
                  <div>
                    <button
                      onClick={() => handleFeedback(message.id, 'positive')}
                      className={`p-2 ${message.feedback === 'positive' ? 'bg-green-600' : 'text-green-600'}`}
                    >👍</button>
                    <button
                      onClick={() => handleFeedback(message.id, 'negative')}
                      className={`p-2 ${message.feedback === 'negative' ? 'bg-red-600' : 'text-red-600'}`}
                    >👎</button>
                  </div>
                )}
              </>
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
