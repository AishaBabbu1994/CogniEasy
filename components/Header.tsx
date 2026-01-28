
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <div className="inline-flex items-center justify-center p-4 bg-pink-100 rounded-full shadow-sm mb-4 border-2 border-pink-200 animate-bounce hover:animate-none cursor-pointer">
        <span className="text-4xl">🌸</span>
      </div>
      <h1 className="text-5xl font-bold text-slate-700 tracking-tight mb-2 drop-shadow-sm">
        Cogni<span className="text-pink-400">Easy</span> <span className="text-2xl align-top">✨</span>
      </h1>
      <p className="text-slate-500 text-lg max-w-md mx-auto font-medium">
        ¡Transforma textos difíciles en algo súper cute y fácil! 🧸
      </p>
    </header>
  );
};

export default Header;
