import { useEffect, useState } from 'react';
import notFoundImage from '../assets/404.webp';
import { navigateTo } from '@/lib/navigation';
import OptimizedImage from './ui/OptimizedImage';

function NotFoundPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const goHome = () => navigateTo('/');

  return (
    <main className="not-found-page relative z-10 flex h-[calc(100dvh-5rem)] min-h-[320px] flex-col items-center justify-center overflow-hidden bg-transparent px-4 text-white">
      <div
        className={`flex flex-col items-center transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* 404 Image - viewport-fitted hero */}
        <div className="animate-float">
          <OptimizedImage
            src={notFoundImage}
            alt="Page not found on iFranchise franchise website"
            className="w-auto object-contain max-h-[78vh] max-w-[95vw] drop-shadow-2xl"
            width={800}
            height={600}
            priority
          />
        </div>

        {/* Home icon button */}
        <button
          type="button"
          onClick={goHome}
          title="Go Home"
          aria-label="Go back to home"
          className="mt-4 group relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 shadow-lg shadow-slate-900/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-slate-900/40 active:scale-95"
        >
          <svg
            className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>

          {/* Tooltip */}
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Home
          </span>
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </main>
  );
}

export default NotFoundPage;

