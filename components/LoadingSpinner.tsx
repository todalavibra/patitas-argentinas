
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-4 border-solid border-orange-400 border-t-transparent"
      ></div>
      <p className="mt-2 text-stone-500">{message}</p>
    </div>
  );
};
