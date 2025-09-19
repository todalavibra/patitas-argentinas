
import React from 'react';
import { DogIcon, CatIcon, PawIcon } from './IconComponents';
import type { PetType } from '../types';

interface HeaderProps {
  activeFilter: PetType | 'all';
  onFilterChange: (filter: PetType | 'all') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeFilter, onFilterChange }) => {
  const getButtonClasses = (filter: PetType | 'all') => {
    const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300 ease-in-out transform';
    if (activeFilter === filter) {
      return `${baseClasses} bg-orange-500 text-white shadow-lg scale-105`;
    }
    return `${baseClasses} bg-white text-stone-600 hover:bg-orange-100 hover:text-orange-600 hover:scale-105`;
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <PawIcon className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-extrabold text-stone-700 tracking-tight">Patitas Argentinas</span>
        </div>
        <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-full">
          <button onClick={() => onFilterChange('all')} className={getButtonClasses('all')}>
            All Pets
          </button>
          <button onClick={() => onFilterChange('dog')} className={getButtonClasses('dog')}>
            <DogIcon className="w-5 h-5" />
            Dogs
          </button>
          <button onClick={() => onFilterChange('cat')} className={getButtonClasses('cat')}>
            <CatIcon className="w-5 h-5" />
            Cats
          </button>
        </div>
      </nav>
    </header>
  );
};
