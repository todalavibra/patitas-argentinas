
import React, { useState } from 'react';

interface AdoptionFormProps {
  petName: string;
}

export const AdoptionForm: React.FC<AdoptionFormProps> = ({ petName }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg text-center">
        <h4 className="font-bold">Thank you!</h4>
        <p className="text-sm">Your adoption interest for {petName} has been received. We will contact you shortly!</p>
      </div>
    );
  }

  return (
    <div className="mt-auto">
      <h3 className="font-bold text-lg mb-2 text-stone-700">Ready for a new adventure?</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your Full Name"
          required
          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
        />
        <input
          type="email"
          placeholder="Your Email Address"
          required
          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300"
        >
          Express Interest in {petName}
        </button>
      </form>
    </div>
  );
};
