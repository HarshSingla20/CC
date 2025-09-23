import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, Languages, Mic, Paperclip, MoreVertical, History } from "lucide-react";

// Initial messages
const initialMessages = [
  { id: 1, type: "bot", content: "Hello! I'm your AI farming assistant. I can help you with crop advice, weather info, government schemes, and market prices.", timestamp: "10:30 AM", language: "en" },
  { id: 2, type: "bot", content: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കൃഷി സഹായിയാണ്. വിള ഉപദേശം, കാലാവസ്ഥ വിവരങ്ങൾ, സർക്കാർ പദ്ധതികൾ, മാർക്കറ്റ് വിലകൾ എന്നിവയിൽ സഹായിക്കാൻ എനിക്ക് കഴിയും।", timestamp: "10:30 AM", language: "ml" },
];

// Suggested questions
const suggestedQuestions = [
  "What's the best time to plant pepper?",
  "Current market price for cardamom?",
  "How to apply for organic farming scheme?",
  "Weather forecast for next week?",
  "പെപ്പർ നടാൻ ഏറ്റവും നല്ല സമയം എപ്പോഴാണ്?",
  "ഏലയുടെ ഇന്നത്തെ വില എത്രയാണ്?",
];

// Hook to manage chat logic
function useChat(initialMessages) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en");

  const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const generateAIResponse = (userMessage) => {
    const responses = {
      en: [
        "Based on current weather, check soil moisture first...",
        "Optimal timing is pre-monsoon for Kerala...",
        "Current market rates are updated hourly..."
      ],
      ml: [
        "നിലവിലെ കാലാവസ്ഥയും നിങ്ങളുടെ പ്രദേശവും അടിസ്ഥാനമാക്കി, ആദ്യം മണ്ണിന്റെ ഈർപ്പം പരിശോധിക്കുക...",
        "അതൊരു നല്ല ചോദ്യമാണ്! കേരളത്തിന് മൺസൂൺ പൂർവകാലം ഏറ്റവും അനുയോജ്യമാണ്..."
      ]
    };
    const langResponses = responses[language] || responses.en;
    return langResponses[Math.floor(Math.random() * langResponses.length)];
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMsg = { id: messages.length + 1, type: "user", content: inputMessage, timestamp: timestamp(), language };
    setMessages([...messages, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = { id: messages.length + 2, type: "bot", content: generateAIResponse(inputMessage), timestamp: timestamp(), language };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggested = (question) => setInputMessage(question);

  const toggleLanguage = () => setLanguage(prev => prev === "en" ? "ml" : "en");

  return { messages, inputMessage, setInputMessage, isTyping, language, sendMessage, handleSuggested, toggleLanguage };
}

// Chat Message Component
function ChatMessage({ message }) {
  const isUser = message.type === "user";
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0"><Bot className="h-4 w-4 text-primary-foreground" /></div>}
      <div className={`max-w-[80%] ${isUser ? "order-1" : ""}`}>
        <div className={`p-3 rounded-lg ${isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"}`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1 px-3">{message.timestamp}</p>
      </div>
      {isUser && <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"><User className="h-4 w-4 text-secondary-foreground" /></div>}
    </motion.div>
  );
}

// Suggested Questions Component
function SuggestedQuestions({ questions, onSelect }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Suggested Questions</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {questions.map((q, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
            <Button variant="ghost" size="sm" className="w-full text-left justify-start h-auto p-3 text-wrap" onClick={() => onSelect(q)}>
              <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-xs leading-relaxed">{q}</span>
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

// Chat Input Component
function ChatInput({ inputMessage, setInputMessage, sendMessage, language }) {
  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
        <div className="flex-1 relative">
          <Input
            placeholder={language === "en" ? "Type your farming question..." : "നിങ്ങളുടെ കൃഷി ചോദ്യം ടൈപ്പ് ചെയ്യുക..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="pr-12"
          />
        </div>
        <Button variant="ghost" size="icon"><Mic className="h-4 w-4" /></Button>
        <Button onClick={sendMessage} disabled={!inputMessage.trim()} className="px-6"><Send className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

// Main Chat Component
export default function Chat() {
  const { messages, inputMessage, setInputMessage, isTyping, language, sendMessage, handleSuggested, toggleLanguage } = useChat(initialMessages);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">AI Farming Assistant</h1>
              <p className="text-muted-foreground">Get instant answers to your farming questions in Malayalam and English</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                Online
              </Badge>
              <Button variant="outline" size="sm"><History className="h-4 w-4 mr-2" />History</Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
            <SuggestedQuestions questions={suggestedQuestions} onSelect={handleSuggested} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
            <Card className="h-[70vh] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Kerala Farming AI</CardTitle>
                      <p className="text-sm text-muted-foreground">Always here to help</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={toggleLanguage}>
                      <Languages className="h-4 w-4 mr-2" />
                      {language === "en" ? "മലയാളം" : "English"}
                    </Button>
                    <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center"><Bot className="h-4 w-4 text-primary-foreground" /></div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>

              <ChatInput inputMessage={inputMessage} setInputMessage={setInputMessage} sendMessage={sendMessage} language={language} />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
