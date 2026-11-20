import { useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import type { StudentProfile } from '../data/scholarships';

export type PageId =
  | 'home'
  | 'finder'
  | 'applications'
  | 'about'
  | 'register'
  | 'details';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  studentProfile: StudentProfile | null;
  savedCount: number;
}

export default function Navbar({
  currentPage,
  onNavigate,
  studentProfile,
  savedCount,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const firstName = studentProfile?.fullName.trim().split(/\s+/)[0] || '';

  return (
    <header className="sticky top-0 z-50 bg-[#0B2545] text-white border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-5 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Title */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 rounded-md"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#1D63DC] text-white">
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
          </span>
          <span>ScholarConnect</span>
        </button>

        {/* Zone 2: Clean single-line text nav links (Desktop) */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 ${
              currentPage === 'home'
                ? 'border-sky-300 text-white'
                : 'border-transparent text-slate-200 hover:text-white hover:border-white/40'
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('finder')}
            className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 ${
              currentPage === 'finder' || currentPage === 'details'
                ? 'border-sky-300 text-white'
                : 'border-transparent text-slate-200 hover:text-white hover:border-white/40'
            }`}
          >
            Find Scholarships
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('applications')}
            className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 ${
              currentPage === 'applications'
                ? 'border-sky-300 text-white'
                : 'border-transparent text-slate-200 hover:text-white hover:border-white/40'
            }`}
          >
            <span>My Applications</span>
            {savedCount > 0 && (
              <span className="ml-1.5 font-mono text-xs text-sky-300 tabular-nums">
                ({savedCount})
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 ${
              currentPage === 'about'
                ? 'border-sky-300 text-white'
                : 'border-transparent text-slate-200 hover:text-white hover:border-white/40'
            }`}
          >
            About Us
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Desktop) + Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('register')}
            className={`hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 max-w-[190px] truncate ${
              currentPage === 'register'
                ? 'bg-white text-[#0B2545]'
                : 'bg-[#1D63DC] text-white hover:bg-[#2563EB]'
            }`}
          >
            {studentProfile ? `Profile: ${firstName}` : 'Student Registration'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/20 text-white hover:bg-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-[#081C36] border-t border-white/10 px-5 py-4 flex flex-col gap-1.5"
        >
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium min-h-[44px] cursor-pointer ${
              currentPage === 'home'
                ? 'bg-white/15 text-white'
                : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('finder')}
            className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium min-h-[44px] cursor-pointer ${
              currentPage === 'finder' || currentPage === 'details'
                ? 'bg-white/15 text-white'
                : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            Find Scholarships
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('applications')}
            className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium min-h-[44px] cursor-pointer ${
              currentPage === 'applications'
                ? 'bg-white/15 text-white'
                : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            My Applications {savedCount > 0 ? `(${savedCount})` : ''}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium min-h-[44px] cursor-pointer ${
              currentPage === 'about'
                ? 'bg-white/15 text-white'
                : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            About Us
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('register')}
            className="mt-2 w-full text-center px-4 py-3 rounded-lg text-sm font-semibold bg-[#1D63DC] text-white hover:bg-[#2563EB] min-h-[44px] cursor-pointer"
          >
            {studentProfile ? `Profile: ${firstName}` : 'Student Registration'}
          </button>
        </nav>
      )}
    </header>
  );
}
