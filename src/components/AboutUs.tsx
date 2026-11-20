import { useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import type { PageId } from './Navbar';

interface AboutUsProps {
  onNavigate: (page: PageId) => void;
}

export default function AboutUs({ onNavigate }: AboutUsProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div>
      <section className="bg-[#0B2545] text-white py-10">
        <div className="max-w-[1200px] mx-auto px-5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            About ScholarConnect
          </h1>
          <p className="text-slate-200 mt-2 max-w-2xl">
            Bridging the information gap between students from economically
            weaker backgrounds and financial support for their education.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-5 space-y-8">
          {/* Editorial Visual Banner */}
          {!imageError ? (
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white max-h-[360px]">
              <img
                src="/src/assets/images/about_campus_library_1795193290046.jpg"
                alt="Sunlit university reading hall with students studying at wooden desks"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full max-h-[360px] object-cover"
              />
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-[#EAF2FF] p-8 flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-[#1D63DC] shrink-0" aria-hidden="true" />
              <p className="text-sm font-medium text-[#0B2545]">
                Equal access to scholarship information helps students complete
                school and college without financial disruption.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7">
              <h2 className="text-xl font-bold text-[#0B2545] mb-3">
                Our Purpose
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-3">
                Every year, thousands of capable students from low-income
                households miss out on scholarships—not because they lack
                merit, but because eligibility rules, income ceilings, and
                document requirements are scattered across dozens of portals.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                ScholarConnect organizes this process into one clear workflow:
                create a student profile once, immediately inspect rule-based
                eligibility checks, and track every saved scholarship from
                Interested to Approved.
              </p>
            </article>

            <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7">
              <h2 className="text-xl font-bold text-[#0B2545] mb-3">
                How It Supports Economically Weaker Students
              </h2>
              <ul className="list-disc pl-5 space-y-2.5 text-sm sm:text-base text-slate-700">
                <li>
                  <strong className="text-[#0B2545]">
                    Plain-Language Eligibility Checks:
                  </strong>{' '}
                  Compares family income, academic percentage, category,
                  education level, and course step by step.
                </li>
                <li>
                  <strong className="text-[#0B2545]">
                    Early Document Preparation:
                  </strong>{' '}
                  Highlights required income, caste, EWS, and bonafide
                  certificates before deadlines close.
                </li>
                <li>
                  <strong className="text-[#0B2545]">
                    Free &amp; Browser-Private:
                  </strong>{' '}
                  Zero registration fees or paid APIs. Your profile and tracked
                  statuses stay locally in your browser&apos;s{' '}
                  <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
                    localStorage
                  </code>
                  .
                </li>
              </ul>
            </article>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7">
            <h2 className="text-xl font-bold text-[#0B2545] mb-3">
              Transparency &amp; Demo Data Notice
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-3">
              ScholarConnect is a hackathon prototype. All 10 scholarship
              listings and summary metrics in this application are{' '}
              <strong>sample demo data</strong> created to demonstrate search,
              filtering, eligibility verification, and application tracking.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              The <strong>Criteria Match %</strong> shown on scholarships strictly
              reflects how many rule-based profile checks passed or require
              verification. It is <strong>not</strong> an official selection
              probability.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="px-5 py-2.5 rounded-lg bg-[#1D63DC] hover:bg-[#13315C] text-white text-sm font-semibold cursor-pointer min-h-[42px]"
              >
                Create Student Profile
              </button>
              <button
                type="button"
                onClick={() => onNavigate('finder')}
                className="px-5 py-2.5 rounded-lg bg-[#EAF2FF] hover:bg-blue-100 text-[#0B2545] text-sm font-semibold cursor-pointer min-h-[42px]"
              >
                Explore Sample Scholarships
              </button>
              <a
                href="https://scholarships.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 text-[#0B2545] hover:bg-slate-50 text-sm font-semibold min-h-[42px]"
              >
                <span>Official National Scholarship Portal</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
