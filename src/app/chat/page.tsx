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
          `${process.env.NEXT_PUBLIC_API_URL}/intent/parser`,
          { userPrompt: finalMessage },
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 15000, // 15 second timeout
          }
        );

        // Check if the response contains an error or if API call failed
        if (response.data?.error) {
          console.warn("API returned error:", response.data.error);
          // Fall back to mock data when API returns error
          const botResponse =
            mockChatResponses[finalMessage] || 
            mockChatResponses[finalMessage.toLowerCase()] ||
            `I understand you're asking about "${finalMessage}". While I'm having trouble connecting to the live data right now, I can help you with general Ethiopian football information. Try asking about specific teams like "St. George vs Fasil Kenema" or "compare St. George and Ethiopia Bunna".`;
          
          setChat((prev) => [...prev, { sender: "bot", text: botResponse }]);
        } else {
          // Use API response if available, otherwise fall back to mock
          const botResponse = response.data?.markdown || response.data?.message || 
            mockChatResponses[finalMessage] || 
            mockChatResponses[finalMessage.toLowerCase()] ||
            "I received your message but couldn't process it properly. Try asking about Ethiopian football teams, matches, or league standings!";
          setChat((prev) => [...prev, { sender: "bot", text: botResponse }]);
        }
      } else {
        // Fallback to mock data when no API URL
        const botResponse =
          mockChatResponses[finalMessage] || 
          `I understand you're asking about "${finalMessage}". Here are some things I can help you with:

**Available Topics:**
- Team comparisons (e.g., "compare St. George and Ethiopia Bunna")
- Match summaries (e.g., "St. George vs Fasil Kenema Match")
- EPL Table information
- Walias (National team) matches
- Local club information

Try one of the suggested buttons above or ask about specific Ethiopian football topics!`;

        setTimeout(() => {
          setChat((prev) => [...prev, { sender: "bot", text: botResponse }]);
          setIsLoading(false);
        }, 500);
        return; // Exit early to avoid setting loading to false twice
      }
    } catch (error) {
      console.error("Request failed:", error);
      
      // Always fall back to mock data or helpful response on error
      const botResponse =
        mockChatResponses[finalMessage] || 
        mockChatResponses[finalMessage.toLowerCase()] ||
        `I'm having trouble connecting to the server right now, but I can still help! 

**Try these topics:**
- "EPL Table" - Get Premier League standings
- "Walias Next Match" - National team fixtures  
- "Local Clubs" - Ethiopian club information
- "compare St. George and Ethiopia Bunna" - Team comparison

Or ask me anything about Ethiopian football and I'll do my best to help!`;
      
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: botResponse },
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