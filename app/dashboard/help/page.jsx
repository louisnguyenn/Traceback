'use client';
import AnimatedContent from '@/components/animations/AnimatedContent';
import React from 'react';

const page = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      <main>
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="px-6 py-7">
            <div className="flex justify-between items-center">
              <div>
                <AnimatedContent
                  distance={60}
                  direction="up"
                  reverse={true}
                  duration={0.7}
                  ease="power2.out"
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.2}
                  delay={0.3}
                >
                  <h2 className="text-4xl font-bold text-white">Help</h2>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </header>
      </main>
    </div>
  );
};

export default page;
