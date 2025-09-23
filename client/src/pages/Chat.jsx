import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Bot,
  User,
  Languages,
  Mic,
  Paperclip,
  MoreVertical,
  History
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    type: "bot",
    content: "Hello! I'm your AI farming assistant. I can help you with crop advice, weather information, government schemes, and market prices. How can I assist you today?",
    timestamp: "10:30 AM",
    language: "en"
  },
  {
    id: 2,
    type: "bot",
    content: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കൃഷി സഹായിയാണ്. വിള ഉപദേശം, കാലാവസ്ഥ വിവരങ്ങൾ, സർക്കാർ പദ്ധതികൾ, മാർക്കറ്റ് വിലകൾ എന്നിവയിൽ സഹായിക്കാൻ എനിക്ക് കഴിയും।",
    timestamp: "10:30 AM",
    language: "ml"
  }
];

const suggestedQuestions = [
  "What's the best time to plant pepper?",
  "Current market price for cardamom?",
  "How to apply for organic farming scheme?",
  "Weather forecast for next week?",
  "പെപ്പർ നടാൻ ഏറ്റവും നല്ല സമയം എപ്പോഴാണ്?",
  "ഏലയുടെ ഇന്നത്തെ വില എത്രയാണ്?",
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "bot",
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      en: [
        "Based on current weather conditions and your location, I'd recommend checking soil moisture levels first. Here's what you should consider...",
        "That's a great question! For Kerala's climate, the optimal timing would be during the pre-monsoon period. Let me provide more details...",
        "I can help you with that. The current market rates are updated every hour. Here's the latest information for your area...",
      ],
      ml: [
        "നിലവിലെ കാലാവസ്ഥയും നിങ്ങളുടെ പ്രദേശവും അടിസ്ഥാനമാക്കി, ആദ്യം മണ്ണിന്റെ ഈർപ്പം പരിശോധിക്കാൻ ഞാൻ ശുപാർശ ചെയ്യുന്നു...",
        "അതൊരു നല്ല ചോദ്യമാണ്! കേരളത്തിന്റെ കാലാവസ്ഥയ്ക്ക്, മൺസൂൺ പൂർവ കാലഘട്ടത്തിൽ ആയിരിക്കും ഏറ്റവും അനുയോജ്യമായ സമയം...",
      ]
    };

    const languageResponses = responses[language] || responses.en;
    return languageResponses[Math.floor(Math.random() * languageResponses.length)];
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
  };

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
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }}>
                    <Button variant="ghost" size="sm" className="w-full text-left justify-start h-auto p-3 text-wrap" onClick={() => handleSuggestedQuestion(question)}>
                      <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed">{question}</span>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
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
                    <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "ml" : "en")}>
                      <Languages className="h-4 w-4 mr-2" />
                      {language === "en" ? "മലയാളം" : "English"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div key={message.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    {message.type === "bot" && <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0"><Bot className="h-4 w-4 text-primary-foreground" /></div>}
                    <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
                      <div className={`p-3 rounded-lg ${message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"}`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-3">{message.timestamp}</p>
                    </div>
                    {message.type === "user" && <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"><User className="h-4 w-4 text-secondary-foreground" /></div>}
                  </motion.div>
                ))}

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

              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder={language === "en" ? "Type your farming question..." : "നിങ്ങളുടെ കൃഷി ചോദ്യം ടൈപ്പ് ചെയ്യുക..."}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-12"
                    />
                  </div>
                  <Button variant="ghost" size="icon"><Mic className="h-4 w-4" /></Button>
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="px-6"><Send className="h-4 w-4" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
