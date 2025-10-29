'use client';

import React, { useState } from 'react';
import { ChevronRight, Bookmark, FolderOpen, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const features = [
  {
    icon: FolderOpen,
    title: 'Organize Your Knowledge',
    description: 'Create custom categories and add your favorite YouTube channels to build a personalized knowledge hub.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    description: 'Get intelligent summaries and research insights from your content. Generate creative ideas with a single click.',
  },
  {
    icon: Bookmark,
    title: 'Save & Track Progress',
    description: 'Bookmark important content and navigate through your learning journey with an intuitive card-based interface.',
  }
];

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < features.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    router.push('/auth');
  };

  const currentFeature = features[currentSlide];
  const Icon = currentFeature.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-2xl w-full">
        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mb-8 sm:mb-12">
          {features.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-black w-12' : 'bg-gray-300 w-8'
              }`}
            />
          ))}
        </div>

        {/* Feature Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 text-center mb-6 sm:mb-8">
          <div className="bg-black w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 transform transition-transform duration-300 hover:scale-110 shadow-lg">
            <Icon size={36} className="text-white sm:hidden" />
            <Icon size={40} className="text-white hidden sm:block" />
          </div>

          <h2 className="text-2xl sm:text-3xl text-gray-900 mb-3 sm:mb-4">
            {currentFeature.title}
          </h2>
          
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-md mx-auto">
            {currentFeature.description}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleSkip}
            className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-gray-600 hover:text-gray-900 transition"
          >
            Skip
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-black text-white rounded-xl hover:bg-gray-800 transition shadow-lg"
          >
            {currentSlide === features.length - 1 ? 'Get Started' : 'Continue'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
