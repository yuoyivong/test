import React from 'react';

const letterToColorClass = {
  A: { bg: 'bg-red-500', text: 'text-red-500' },
  B: { bg: 'bg-yellow-500', text: 'text-yellow-500' },
  C: { bg: 'bg-red-800', text: 'text-red-800' },
  D: { bg: 'bg-purple-800', text: 'text-purple-800' },
  E: { bg: 'bg-orange-500', text: 'text-orange-500' },
  F: { bg: 'bg-yellow-300', text: 'text-yellow-300' },
  G: { bg: 'bg-blue-500', text: 'text-blue-500' },
  H: { bg: 'bg-green-500', text: 'text-green-500' },
  I: { bg: 'bg-indigo-500', text: 'text-indigo-500' },
  J: { bg: 'bg-pink-500', text: 'text-pink-500' },
  K: { bg: 'bg-teal-500', text: 'text-teal-500' },
  L: { bg: 'bg-lime-500', text: 'text-lime-500' },
  M: { bg: 'bg-emerald-500', text: 'text-emerald-500' },
  N: { bg: 'bg-amber-500', text: 'text-amber-500' },
  O: { bg: 'bg-orange-400', text: 'text-orange-400' },
  P: { bg: 'bg-purple-400', text: 'text-purple-400' },
  Q: { bg: 'bg-cyan-400', text: 'text-cyan-400' },
  R: { bg: 'bg-rose-400', text: 'text-rose-400' },
  S: { bg: 'bg-slate-500', text: 'text-slate-500' },
  T: { bg: 'bg-teal-400', text: 'text-teal-400' },
  U: { bg: 'bg-amber-400', text: 'text-amber-400' },
  V: { bg: 'bg-violet-400', text: 'text-violet-400' },
  W: { bg: 'bg-white', text: 'text-white' },
  X: { bg: 'bg-gray-500', text: 'text-gray-500' },
  Y: { bg: 'bg-yellow-400', text: 'text-yellow-400' },
  Z: { bg: 'bg-zinc-500', text: 'text-zinc-500' },
};

export const RandomIcon = ({ name, className }) => {
  if (!name) {
    return null;
  }
  
  const firstLetter = name.charAt(0).toUpperCase();
  const colorClass = letterToColorClass[firstLetter] || { bg: 'bg-black', text: 'text-black' };

  return (
    <div className={`w-6 h-6 flex items-center justify-center ${colorClass.bg} bg-opacity-25 rounded-md ${className}`}>
      <span className={`${colorClass.text} opacity-100`}>{firstLetter}</span>
    </div>
  );
};
