// ChatInterface.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Volume2, Link as LinkIcon, Bot } from 'lucide-react';
import { ElectVoiceEngine } from '../../services/ElectVoiceEngine';
import { useLanguage } from '../../context/LanguageContext';

export function ChatInterface({ onActionTriggered }) {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Reset chat when language changes
  useEffect(() => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: t.chat.welcome,
      options: t.chat.quickReplies,
      source: null,
      audio_hint: t.chat.welcome
    }]);
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

    setTimeout(async () => {
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
      setIsTyping(false);
      onActionTriggered(response);
    }, 700);
  };

  const lastAssistantIndex = [...messages].map((m, i) => ({ m, i })).filter(({ m }) => m.role === 'assistant').pop()?.i;

  return (
    <div className="flex flex-col h-full bg-white border border-gov-light-gray rounded-xl overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-gov-navy px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Bot size={20} className="text-gov-blue" />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gov-navy"></span>
        </div>
        <div>
          <h2 className="font-bold text-white text-sm leading-none">{t.chat.headerTitle}</h2>
          <p className="text-white/60 text-xs mt-0.5">{t.chat.status}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f0f4f8]">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            const isLastAssistant = idx === lastAssistantIndex;
            return (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-end gap-2 max-w-[82%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-gov-blue flex items-center justify-center flex-shrink-0 mb-1">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-gov-blue text-white rounded-br-none'
                        : 'bg-white text-gov-navy rounded-bl-none border border-gov-light-gray'
                    }`}>
                      <p>{msg.content}</p>
                      {!isUser && (msg.source || msg.audio_hint) && (
                        <div className="mt-2 pt-2 border-t border-gov-light-gray flex items-center gap-3 text-xs text-gov-gray">
                          {msg.source && (
                            <a href={msg.source} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-gov-blue underline">
                              <LinkIcon size={10} />{t.chat.source}
                            </a>
                          )}
                          <button className="flex items-center gap-1 hover:text-gov-blue" title={msg.audio_hint}>
                            <Volume2 size={10} />{t.chat.listen}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {!isUser && isLastAssistant && msg.options?.length > 0 && (
                  <div className="mt-2 ml-9 flex flex-wrap gap-2">
                    {msg.options.map((opt, i) => (
                      <button key={i} onClick={() => handleSend(opt)} disabled={isTyping}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors disabled:opacity-50 shadow-sm">
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-gov-blue flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-white border border-gov-light-gray rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 bg-gov-gray rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gov-gray rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gov-gray rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gov-light-gray flex-shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={t.chat.placeholder}
            className="flex-1 bg-[#f0f4f8] border border-gov-light-gray rounded-full px-4 py-2.5 text-sm text-gov-navy placeholder:text-gov-gray/60 focus:outline-none focus:ring-2 focus:ring-gov-blue focus:border-transparent transition-all"
          />
          <button type="submit" disabled={!input.trim() || isTyping}
            className="w-10 h-10 flex items-center justify-center bg-gov-blue text-white rounded-full hover:bg-gov-navy disabled:opacity-40 transition-colors flex-shrink-0">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
