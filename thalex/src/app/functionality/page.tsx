"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Send,
  Shield,
  AlertTriangle,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  maskedContent?: string;
  sensitiveItems?: string[];
  isLoading?: boolean;
}

// API service functions
const API_BASE_URL =
  "https://cape-backend-bsbtg6c7g3cxbchf.centralindia-01.azurewebsites.net";

const apiService = {
  async analyzeText(text: string) {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer dev-api-key-12345",
      },
      body: JSON.stringify({
        text,
        mode: "audit",
      }),
    });
    if (!response.ok) throw new Error("Failed to analyze text");
    return response.json();
  },

  // Legacy endpoints - keeping for fallback if needed
  async sendPseudonymizedInput(text: string) {
    const response = await fetch(`${API_BASE_URL}/pseudonymized-input`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer dev-api-key-12345",
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error("Failed to send pseudonymized input");
    return response.json();
  },

  async getRawOutput() {
    const response = await fetch(`${API_BASE_URL}/raw-output`, {
      headers: {
        Authorization: "Bearer dev-api-key-12345",
      },
    });
    if (!response.ok) throw new Error("Failed to get raw output");
    return response.json();
  },

  async getPseudonymizedOutput() {
    const response = await fetch(`${API_BASE_URL}/pseudonymized-output`, {
      headers: {
        Authorization: "Bearer dev-api-key-12345",
      },
    });
    if (!response.ok) throw new Error("Failed to get pseudonymized output");
    return response.json();
  },
};

const ChatInterface = ({
  title,
  description,
  messages,
  onSendMessage,
  showMasking = false,
  icon: Icon,
  accentColor,
  isLoading = false,
}: {
  title: string;
  description: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
  showMasking?: boolean;
  icon: any;
  accentColor: string;
  isLoading?: boolean;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden group hover:shadow-2xl transition-all duration-500">
      {/* Header */}
      <div className={`p-6 ${accentColor} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              {isLoading && (
                <div className="flex items-center gap-2 mt-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-xs opacity-80">Processing...</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 min-h-0 bg-gradient-to-b from-slate-50/30 to-transparent dark:from-slate-800/30">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-slate-500 dark:text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Start a conversation to see the difference
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              Try entering sensitive information
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
                  message.isUser
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                    : "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600"
                }`}
              >
                {message.isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                      <Loader2 className="w-3 h-3 animate-spin text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium">
                        Processing your message...
                      </span>
                      <div className="flex gap-1 mt-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm leading-relaxed">
                      {showMasking && message.maskedContent && !message.isUser
                        ? message.maskedContent
                        : message.content}
                    </p>
                    {showMasking &&
                      message.sensitiveItems &&
                      message.sensitiveItems.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 pt-3 border-t border-green-200 dark:border-green-800"
                        >
                          <div className="flex items-center gap-2 text-xs font-medium text-green-700 dark:text-green-400">
                            <div className="w-5 h-5 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                              <Shield className="w-3 h-3" />
                            </div>
                            <span>
                              {message.sensitiveItems.length} sensitive item(s)
                              protected
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {message.sensitiveItems.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                  </>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 disabled:opacity-50 transition-all duration-200"
          />
          <motion.button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={`px-6 py-3 ${accentColor} text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2`}
            whileHover={{ scale: inputValue.trim() && !isLoading ? 1.02 : 1 }}
            whileTap={{ scale: inputValue.trim() && !isLoading ? 0.98 : 1 }}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default function FunctionalityPage() {
  const [withoutMessages, setWithoutMessages] = useState<Message[]>([]);
  const [withMessages, setWithMessages] = useState<Message[]>([]);
  const [isWithoutLoading, setIsWithoutLoading] = useState(false);
  const [isWithLoading, setIsWithLoading] = useState(false);

  const sampleSensitiveData = [
    "My social security number is 123-45-6789",
    "Please process payment for john.doe@email.com using card 4532-1234-5678-9012",
    "The patient John Smith (DOB: 03/15/1985) needs treatment",
    "Contact me at +1-555-123-4567 or my address 123 Main St, NYC",
    "My account number is ACC-98765432 with PIN 1234",
  ];

  const maskSensitiveData = (content: string) => {
    const patterns = [
      {
        regex: /\b\d{3}-\d{2}-\d{4}\b/g,
        replacement: "***-**-****",
        type: "SSN",
      },
      {
        regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
        replacement: "***@***.***",
        type: "Email",
      },
      {
        regex: /\b\d{4}-\d{4}-\d{4}-\d{4}\b/g,
        replacement: "****-****-****-****",
        type: "Credit Card",
      },
      {
        regex: /\b\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
        replacement: "***-***-****",
        type: "Phone",
      },
      {
        regex: /\b\d{1,5}\s\w+\s\w+,?\s\w+\b/g,
        replacement: "*** *** ***, ***",
        type: "Address",
      },
      { regex: /\bACC-\d+\b/g, replacement: "ACC-********", type: "Account" },
      { regex: /\bPIN\s\d+\b/g, replacement: "PIN ****", type: "PIN" },
      {
        regex: /\b\d{2}\/\d{2}\/\d{4}\b/g,
        replacement: "**/**/****",
        type: "Date",
      },
    ];

    let maskedContent = content;
    const detectedItems: string[] = [];

    patterns.forEach((pattern) => {
      if (pattern.regex.test(content)) {
        maskedContent = maskedContent.replace(
          pattern.regex,
          pattern.replacement
        );
        detectedItems.push(pattern.type);
      }
    });

    return { maskedContent, detectedItems };
  };

  const handleWithoutMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "",
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    setWithoutMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsWithoutLoading(true);

    try {
      // Use the new analyze endpoint
      const response = await apiService.analyzeText(content);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Original message processed: "${content}" - This would be sent to AI without privacy protection, exposing ${
          response.summary?.total || 0
        } sensitive entities detected.`,
        isUser: false,
        timestamp: new Date(),
      };

      setWithoutMessages((prev) => [...prev.slice(0, -1), botResponse]);
    } catch (error) {
      console.error("Error in without cape chat:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, there was an error processing your message.",
        isUser: false,
        timestamp: new Date(),
      };
      setWithoutMessages((prev) => [...prev.slice(0, -1), errorResponse]);
    } finally {
      setIsWithoutLoading(false);
    }
  };

  const handleWithMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "",
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    setWithMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsWithLoading(true);

    try {
      // Use the new analyze endpoint
      const response = await apiService.analyzeText(content);

      // Extract detected entity types for display
      const detectedItems = response.entities
        ? [...new Set(response.entities.map((entity: any) => entity.label))]
        : [];

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Privacy-protected response for: "${content}"`,
        maskedContent: `Privacy-protected response for: "${
          response.pseudonymized || content
        }"`,
        isUser: false,
        timestamp: new Date(),
        sensitiveItems: detectedItems as string[],
      };

      setWithMessages((prev) => [...prev.slice(0, -1), botResponse]);
    } catch (error) {
      console.error("Error in with cape chat:", error);
      // Fallback to local masking if API fails
      const { maskedContent, detectedItems } = maskSensitiveData(content);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Privacy-protected response for: "${content}" (using fallback protection)`,
        maskedContent: `Privacy-protected response for: "${maskedContent}"`,
        isUser: false,
        timestamp: new Date(),
        sensitiveItems: detectedItems,
      };

      setWithMessages((prev) => [...prev.slice(0, -1), botResponse]);
    } finally {
      setIsWithLoading(false);
    }
  };

  const insertSampleData = () => {
    const randomSample =
      sampleSensitiveData[
        Math.floor(Math.random() * sampleSensitiveData.length)
      ];
    handleWithoutMessage(randomSample);
    handleWithMessage(randomSample);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/">
                <motion.button
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-medium"
                  whileHover={{ x: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  Back to Home
                </motion.button>
              </Link>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Interactive Demo
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Experience privacy protection in real-time
                </p>
              </div>
            </div>

            <motion.button
              onClick={insertSampleData}
              disabled={isWithoutLoading || isWithLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 flex items-center gap-3"
              whileHover={{
                scale: !(isWithoutLoading || isWithLoading) ? 1.02 : 1,
                y: !(isWithoutLoading || isWithLoading) ? -2 : 0,
              }}
              whileTap={{
                scale: !(isWithoutLoading || isWithLoading) ? 0.98 : 1,
              }}
            >
              {isWithoutLoading || isWithLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Try Sample Data
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Eye className="w-4 h-4 mr-2" />
            Live Comparison Demo
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-700 dark:from-slate-100 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
            See the Difference in Action
          </h2>
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Compare how traditional AI handles sensitive data versus our
            privacy-preserving approach.
            <br /> Experience real-time protection powered by our advanced
            algorithms.
          </p>
        </motion.div>

        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Without CaPE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[700px]"
          >
            <ChatInterface
              title="Without CaPE"
              description="Traditional AI chat exposing sensitive information to potential risks"
              messages={withoutMessages}
              onSendMessage={handleWithoutMessage}
              showMasking={false}
              icon={AlertTriangle}
              accentColor="bg-gradient-to-r from-red-500 to-orange-600"
              isLoading={isWithoutLoading}
            />
          </motion.div>

          {/* With CaPE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[700px]"
          >
            <ChatInterface
              title="With CaPE"
              description="Privacy-protected AI chat with intelligent data masking and real-time protection"
              messages={withMessages}
              onSendMessage={handleWithMessage}
              showMasking={true}
              icon={Shield}
              accentColor="bg-gradient-to-r from-green-500 to-emerald-600"
              isLoading={isWithLoading}
            />
          </motion.div>
        </div>

        {/* Enhanced Instructions */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              Try These Examples
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Test our privacy protection with real-world sensitive data
              patterns
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl border border-red-100 dark:border-red-800/30">
                <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Personal Information
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    Social Security Numbers (123-45-6789)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    Email addresses (user@domain.com)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    Phone numbers (+1-555-123-4567)
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Financial Data
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Credit card numbers (4532-1234-5678-9012)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Account numbers (ACC-98765432)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Personal addresses (123 Main St, NYC)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">
                  Intelligent Protection
                </h4>
                <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
                  Our advanced algorithms detect and mask sensitive information
                  in real-time, ensuring your data remains protected while
                  maintaining full AI functionality. Experience enterprise-grade
                  privacy protection that adapts to your needs.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
