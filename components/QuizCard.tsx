
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizCardProps {
  questions: QuizQuestion[];
}

const QuizCard: React.FC<QuizCardProps> = ({ questions }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === questions[currentIdx].isTrue) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="kawaii-card p-8 text-center bg-white h-full flex flex-col justify-center items-center">
        <div className="mb-4 text-6xl animate-bounce">🎉🍬</div>
        <h3 className="text-3xl font-bold text-pink-500 mb-2">¡Súper!</h3>
        <p className="text-slate-500 mb-6 text-lg font-medium">Acertaste {score} de {questions.length} preguntas ✨</p>
        <button 
          onClick={() => {
            setCurrentIdx(0);
            setIsFinished(false);
            setScore(0);
            setSelectedAnswer(null);
            setShowFeedback(false);
          }}
          className="kawaii-btn px-8 py-3 bg-pink-400 text-white text-lg font-bold rounded-full shadow-[0_4px_0_#f472b6] hover:shadow-[0_2px_0_#f472b6] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all"
        >
          Jugar otra vez 🎮
        </button>
      </div>
    );
  }

  const current = questions[currentIdx];
  const isCorrect = selectedAnswer === current.isTrue;

  return (
    <div className="kawaii-card p-8 h-full flex flex-col relative overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none text-6xl">🍩</div>

      <div className="flex justify-between items-center mb-6">
        <span className="px-4 py-1.5 bg-sky-100 text-sky-600 text-sm font-bold rounded-full border-2 border-sky-200">
          Pregunta {currentIdx + 1} / {questions.length}
        </span>
        <div className="h-4 w-32 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div 
            className="h-full bg-pink-400 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-700 mb-8 min-h-[4rem] leading-relaxed">
        {current.question}
      </h3>

      {!showFeedback ? (
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <button
            onClick={() => handleAnswer(true)}
            className="kawaii-btn p-4 bg-emerald-100 border-b-4 border-emerald-300 text-emerald-700 rounded-3xl font-bold hover:bg-emerald-200 transition-all text-xl"
          >
            Verdad ✅
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="kawaii-btn p-4 bg-rose-100 border-b-4 border-rose-300 text-rose-700 rounded-3xl font-bold hover:bg-rose-200 transition-all text-xl"
          >
            Falso ❌
          </button>
        </div>
      ) : (
        <div className="mt-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className={`p-6 rounded-3xl mb-6 border-2 ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-orange-50 border-orange-200 text-orange-800'}`}>
            <p className="font-bold mb-2 text-lg flex items-center gap-2">
              {isCorrect ? (
                <><span>😺</span> ¡Yay! ¡Correcto!</>
              ) : (
                <><span>🙀</span> ¡Oops! Casi...</>
              )}
            </p>
            <p className="text-base leading-relaxed font-medium">{current.explanation}</p>
          </div>
          <button
            onClick={nextQuestion}
            className="kawaii-btn w-full py-4 bg-purple-500 text-white rounded-2xl font-bold shadow-[0_4px_0_#9333ea] hover:bg-purple-600 hover:shadow-[0_2px_0_#9333ea] hover:translate-y-[2px] transition-all text-lg"
          >
            {currentIdx === questions.length - 1 ? 'Ver mis puntos ⭐' : 'Siguiente ✨'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
