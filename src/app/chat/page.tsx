"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

import Sidebar from "@/src/components/Sidebar";
import ChatBox from "@/src/components/ChatBox";
import EthiopianFootballCard from "@/src/components/EthiopianFootballCard";

import { mockChatResponses } from "@/public/mock/chatResponse";

export default function MainContent() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (presetMessage?: string) => {
    const finalMessage = presetMessage || message;
    if (!finalMessage.trim()) return;

    const userMessage = { sender: "user" as const, text: finalMessage.trim() };
    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      if (process.env.NEXT_PUBLIC_API_URL) {

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/intent/parse`,
          { text: finalMessage },
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 15000, // 15 second timeout
          }
        );

        const botResponse = response.data?.markdown || "No response from server.";
        setChat((prev) => [...prev, { sender: "bot", text: botResponse }]);
      } else {
        // Fallback to mock data
        const botResponse =
          mockChatResponses[finalMessage] || "I don't have a response for that yet.";

        setTimeout(() => {
          setChat((prev) => [...prev, { sender: "bot", text: botResponse }]);
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error("Request failed:", error);
      
      let errorMessage = "Network error. Please try again.";
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          errorMessage = `Server error: ${error.response.status}`;
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = "No response from server. Please try again.";
        } else {
          // Something else happened
          errorMessage = `Request error: ${error.message}`;
        }
      }
      
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: errorMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 lg:p-8 gap-6 lg:gap-8 max-w-7xl w-full mx-auto h-[calc(70vh-70px)] mb-50">
      <div className="flex flex-col flex-1 gap-6">
        {chat.length === 0 ? (
          <EthiopianFootballCard handleSend={handleSend} />
        ) : (
          <ChatBox chat={chat} />
        )}

        <div className="p-4 bg-gray-50 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about teams, players, matches..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
              className="flex-1 border-none focus:outline-none bg-transparent text-gray-800 placeholder-gray-400"
              disabled={isLoading}
            />
            <button 
              onClick={() => !isLoading && handleSend()} 
              disabled={isLoading}
              className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Image src="/Email Send.png" alt="send" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-80">
        <Sidebar />
      </div>
    </div>
  );
}