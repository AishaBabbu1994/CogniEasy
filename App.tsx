
import React, { useState } from 'react';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import { simplifyText } from './services/geminiService';
import { SimplificationResult, AppStep } from './types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState<AppStep>('input');
  const [result, setResult] = useState<SimplificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSimplify = async () => {
    if (!inputText.trim()) return;
    
    setStep('loading');
    setError(null);
    
    try {
      const data = await simplifyText(inputText);
      setResult(data);
      setStep('results');
    } catch (err) {
      console.error(err);
      setError('¡Ups! Algo salió mal. ¿Lo intentamos de nuevo? 🥺');
      setStep('input');
    }
  };

  const handleReset = () => {
    setInputText('');
    setResult(null);
    setStep('input');
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden selection:bg-pink-200 selection:text-pink-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4">
        {step === 'input' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="kawaii-card p-8 bg-white relative">
              {/* Cute decoration */}
              <div className="absolute -top-6 -right-6 text-6xl transform rotate-12 drop-shadow-md">✏️</div>
              
              <label htmlFor="complex-text" className="block text-lg font-bold text-pink-500 mb-4 ml-2 flex items-center gap-2">
                 <span>📝</span> Pega tu texto difícil aquí:
              </label>
              <textarea
                id="complex-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Por ejemplo: La fotosíntesis es un proceso..."
                className="w-full h-64 p-6 bg-pink-50/50 border-2 border-dashed border-pink-200 rounded-3xl focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition-all text-xl resize-none placeholder:text-pink-300 text-slate-600"
              />
              
              {error && (
                <div className="mt-4 p-4 bg-rose-100 text-rose-600 rounded-2xl flex items-center gap-3 border-2 border-rose-200 font-bold">
                  <span>😿</span>
                  <p>{error}</p>
                </div>
              )}

              <button
                onClick={handleSimplify}
                disabled={!inputText.trim() || step === 'loading'}
                className="kawaii-btn w-full mt-8 py-5 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 text-white rounded-[2rem] text-2xl font-bold shadow-[0_6px_0_rgba(0,0,0,0.1)] hover:shadow-[0_3px_0_rgba(0,0,0,0.1)] hover:translate-y-[3px] transition-all"
              >
                ¡Simplificar! ✨🌈
              </button>
            </div>
          </div>
        )}

        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 border-4 border-pink-200 animate-bounce shadow-lg">
              <span className="text-4xl animate-spin">🍭</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-700 mb-2 text-center">Leyendo... 📖</h2>
            <p className="text-pink-400 text-xl font-medium text-center">¡Buscando las palabras más bonitas!</p>
          </div>
        )}

        {step === 'results' && result && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-700">
            {/* Main Summary Section */}
            <div className="lg:col-span-7 space-y-8">
              {/* One Sentence Summary */}
              <section className="kawaii-card p-8 bg-[#fffcea] border-[#ffeeba] shadow-[8px_8px_0px_#ffeeba] transform rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-200 text-yellow-700 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-700">La idea principal</h2>
                </div>
                <p className="text-2xl font-bold text-yellow-600 leading-snug font-handwriting">
                  "{result.oneSentenceSummary}"
                </p>
              </section>

              {/* ELI5 Explanation */}
              <section className="kawaii-card p-8 bg-[#f0f9ff] border-[#bae6fd] shadow-[8px_8px_0px_#bae6fd] transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-sky-200 text-sky-700 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-700">Explicación sencillita</h2>
                </div>
                <div className="space-y-4">
                  {result.eli5Explanation.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="text-slate-600 text-lg leading-relaxed font-medium">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Analogy */}
              <section className="kawaii-card p-8 bg-[#fdf2f8] border-[#fbcfe8] shadow-[8px_8px_0px_#fbcfe8] transform rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-pink-200 text-pink-700 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-700">Es como...</h2>
                </div>
                <p className="text-xl text-pink-600 font-medium leading-relaxed italic">
                  "{result.analogy}"
                </p>
              </section>
            </div>

            {/* Sidebar with Quiz */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <QuizCard questions={result.quiz} />

              <div className="mt-auto">
                <button
                  onClick={handleReset}
                  className="kawaii-btn w-full py-4 px-6 bg-white border-4 border-slate-100 text-slate-400 rounded-3xl font-bold hover:bg-slate-50 hover:text-pink-400 hover:border-pink-100 transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 8.959 8.959 0 01-9 9m-9-9a8.959 8.959 0 019-9" />
                  </svg>
                  Probar otro texto
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center glass-card border-t border-white/50 z-10">
        <p className="text-sm font-bold text-pink-300 uppercase tracking-widest flex items-center justify-center gap-2">
          Made with 💖 by CogniEasy
        </p>
      </footer>
    </div>
  );
};

export default App;
