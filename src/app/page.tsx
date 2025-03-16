'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {/* Header */}
      <header className="py-4 px-6 border-b bg-gray-800 border-gray-700">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center text-white">
            <div className="flex items-center mr-4">
              {/* Groq Logo (simplified) */}
              <div className="w-8 h-8 rounded-full bg-groq-primary flex items-center justify-center text-white font-bold mr-2">G</div>
              <span className="text-lg font-medium">Powered by API Groq</span>
            </div>
            {/* Vercel Logo (simplified) */}
            <div className="flex items-center text-xs text-gray-400">
              <div className="w-4 h-4 mr-1">
                <svg viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#FFFFFF" />
                </svg>
              </div>
              <span>Vercel</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat container */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="space-y-6 mb-6">
          {messages.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-groq-primary flex items-center justify-center text-white text-2xl font-bold">G</div>
              </div>
              <p className="text-2xl mb-3 font-medium">Bienvenue sur l&apos;API Groq</p>
              <p className="max-w-md mx-auto text-sm">Posez une question pour commencer la conversation avec Llama 3.3 70B, l&apos;un des modèles les plus rapides et les plus performants disponibles.</p>
            </div>
          ) : (
            messages.map(m => (
              <div 
                key={m.id} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div 
                  className={`
                    max-w-[80%] rounded-xl px-5 py-3 shadow-message
                    ${m.role === 'user' 
                      ? 'bg-groq-dark text-white' 
                      : 'bg-gray-800 text-gray-100 border border-gray-700'}
                  `}
                >
                  <div className={`text-xs mb-1 ${m.role === 'user' ? 'text-blue-100' : 'text-gray-400'} flex items-center`}>
                    {m.role === 'user' ? (
                      'Vous'
                    ) : (
                      <>
                        <div className="w-3 h-3 mr-1">
                          <div className="w-3 h-3 rounded-full bg-groq-primary"></div>
                        </div>
                        <span>Llama 3.3 70B powered by Groq</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form 
          onSubmit={handleSubmit} 
          className="flex gap-2 sticky bottom-4 p-3 rounded-xl shadow-md bg-gray-800 border border-gray-700"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Écrivez votre message..."
            className="flex-1 rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors bg-gray-700 text-white border border-gray-600 focus:border-groq-light"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`rounded-lg px-5 py-3 font-medium text-white transition-colors ${
              isLoading || !input.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black hover:bg-gray-800'
            }`}
          >
            {isLoading ? 
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi...
              </span> 
              : 'Envoyer'
            }
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-3 h-3">
              <svg viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#FFFFFF" />
              </svg>
            </div>
            <span>Powered by Vercel AI SDK & Groq API</span>
          </div>
        </div>
      </div>
    </div>
  );
}
