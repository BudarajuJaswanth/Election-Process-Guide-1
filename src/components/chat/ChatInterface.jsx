// ChatInterface.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Volume2, Link as LinkIcon, Bot, ArrowLeft, Trash2 } from 'lucide-react';
import { ElectVoiceEngine } from '../../services/ElectVoiceEngine';
import { useLanguage } from '../../context/LanguageContext';

export function ChatInterface({ onActionTriggered, onClose }) {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const initChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: t.chat.welcome,
      options: t.chat.quickReplies,
      source: null,
      audio_hint: t.chat.welcome
    }]);
  };

  // Reset chat when language changes
  useEffect(() => {
    initChat();
    setInput('');
    setIsTyping(false);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textOverride = null) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg = { id: crypto.randomUUID(), role: 'user', content: textToSend };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await ElectVoiceEngine.processInput(textToSend, newMessages, lang);
      const assistantMsg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.text,
        options: response.next_prompts,
        source: response.source,
        audio_hint: response.audio_hint
      };
      setMessages(prev => [...prev, assistantMsg]);
      onActionTriggered(response);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const lastAssistantIndex = [...messages].map((m, i) => ({ m, i })).filter(({ m }) => m.role === 'assistant').pop()?.i;

  return (
    <div className="flex flex-col h-full bg-white border border-gov-light-gray rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-gov-navy to-gov-blue px-4 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
            title="Back to Home"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Bot size={22} className="text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gov-navy animate-pulse"></span>
          </div>
          <div>
            <h2 className="font-bold text-white text-base leading-none">{t.chat.headerTitle}</h2>
            <p className="text-white/70 text-[10px] uppercase tracking-widest mt-1 font-semibold">{t.chat.status}</p>
          </div>
        </div>
        <button 
          onClick={initChat}
          className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
          title="Clear Chat"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            const isLastAssistant = idx === lastAssistantIndex;
            return (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex items-end gap-3 max-w-[88%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-gov-blue/10 flex items-center justify-center flex-shrink-0 mb-1 border border-gov-blue/20">
                      <Bot size={16} className="text-gov-blue" />
                    </div>
                  )}
                  <div className="group">
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${
                      isUser
                        ? 'bg-gov-blue text-white rounded-br-none hover:shadow-md'
                        : 'bg-white text-gov-navy rounded-bl-none border border-gov-light-gray hover:border-gov-blue/30'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      {!isUser && (msg.source || msg.audio_hint) && (
                        <div className="mt-3 pt-2 border-t border-gov-light-gray/50 flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-gov-gray">
                          {msg.source && (
                            <a href={msg.source} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-gov-blue transition-colors underline">
                              <LinkIcon size={12} />{t.chat.source}
                            </a>
                          )}
                          <button className="flex items-center gap-1 hover:text-gov-blue transition-colors">
                            <Volume2 size={12} />{t.chat.listen}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {!isUser && isLastAssistant && msg.options?.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 ml-11 flex flex-wrap gap-2"
                  >
                    {msg.options.map((opt, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSend(opt)} 
                        disabled={isTyping}
                        className="text-[11px] font-bold px-4 py-2 rounded-full bg-white border-2 border-gov-blue/20 text-gov-blue hover:bg-gov-blue hover:text-white hover:border-gov-blue transition-all disabled:opacity-50 shadow-sm"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-end gap-3">
            <div className="w-8 h-8 rounded-full bg-gov-blue/10 flex items-center justify-center flex-shrink-0 border border-gov-blue/20">
              <Bot size={16} className="text-gov-blue" />
            </div>
            <div className="bg-white border border-gov-light-gray rounded-2xl rounded-bl-none px-5 py-4 flex items-center gap-2 shadow-sm">
              <span className="w-1.5 h-1.5 bg-gov-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-gov-blue rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
              <span className="w-1.5 h-1.5 bg-gov-blue rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gov-light-gray flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              className="w-full bg-[#f1f5f9] border border-gov-light-gray rounded-full px-6 py-3.5 text-sm text-gov-navy placeholder:text-gov-gray/50 focus:outline-none focus:ring-2 focus:ring-gov-blue focus:bg-white transition-all shadow-inner"
            />
          </div>
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 flex items-center justify-center bg-gov-blue text-white rounded-full hover:bg-gov-navy hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all flex-shrink-0 shadow-lg shadow-gov-blue/20"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
