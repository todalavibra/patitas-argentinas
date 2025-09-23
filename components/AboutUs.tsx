
import React, { useState, useEffect } from 'react';
import { generateAboutUsImage } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { PawIcon } from './IconComponents';

export const AboutUs: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const generatedImageUrl = await generateAboutUsImage();
        setImageUrl(generatedImageUrl);
      } catch (err) {
        console.error(err);
        setError('Could not load our team photo, but our volunteers are always working hard!');
        // Fallback image in case of API error
        setImageUrl('https://picsum.photos/seed/volunteers/800/600');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <section className="bg-orange-50 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 mb-4 flex items-center gap-3">
                <PawIcon className="w-8 h-8 text-orange-500" />
                Our Mission
              </h2>
              <p className="text-lg text-stone-600 mb-4 leading-relaxed">
                Patitas Argentinas is a non-profit initiative dedicated to rescuing, rehabilitating, and rehoming street animals across Argentina. We believe every pet deserves a second chance at a happy life.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Through our network of dedicated volunteers and the power of technology, we connect loving families with furry friends in need, one paw at a time. Join us in creating a paw-sitive future for them!
              </p>
            </div>
            <div className="order-1 md:order-2 h-64 md:h-full min-h-[250px] bg-stone-100 flex items-center justify-center">
                {isLoading ? (
                  <LoadingSpinner message="Painting our mission..." />
                ) : (
                  <img
                    src={imageUrl || ''}
                    alt="Volunteers at Patitas Argentinas"
                    className="w-full h-full object-cover"
                  />
                )}
            </div>
          </div>
        </div>
        {error && !isLoading && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </section>
  );
};
