import { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import {
  SAMPLE_SCHOLARSHIPS,
  SAMPLE_STATS,
  type Scholarship,
  type StudentProfile,
} from '../data/scholarships';
import { formatINR } from '../utils/eligibility';
import type { PageId } from './Navbar';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectScholarship: (scholarship: Scholarship) => void;
  studentProfile: StudentProfile | null;
}

export default function HomePage({
  onNavigate,
  onSelectScholarship,
  studentProfile,
}: HomePageProps) {
  const [heroImageError, setHeroImageError] = useState(false);
  const featured = SAMPLE_SCHOLARSHIPS.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#0B2545] text-white">
        <div className="max-w-[1200px] mx-auto px-5 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-medium tracking-wide text-sky-200 mb-4">
              ScholarConnect · Student Scholarship Discovery &amp; Eligibility Demo
            </p>

            <h1 className="text-[clamp(2.15rem,4vw,3.4rem)] leading-[1.12] font-bold tracking-tight text-white [text-wrap:balance] mb-5">
              Your Education Deserves an Opportunity.
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mb-8">
              ScholarConnect helps students from economically weaker backgrounds
              discover financial aid, check rule-based eligibility criteria in
              seconds, and track every scholarship application in one free,
              private workspace.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1D63DC] hover:bg-[#2563EB] text-white font-semibold text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 min-h-[44px]"
              >
                <span>{studentProfile ? 'Update Student Profile' : 'Get Started'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('finder')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/35 text-white hover:bg-white/10 font-semibold text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 min-h-[44px]"
              >
                Explore Scholarships
              </button>
            </div>

            {studentProfile && (
              <p className="mt-6 text-sm text-sky-100">
                Signed in locally as <strong className="font-semibold text-white">{studentProfile.fullName}</strong>
                <span aria-hidden="true"> · </span>
                <button
                  type="button"
                  onClick={() => onNavigate('finder')}
                  className="underline underline-offset-4 hover:text-white cursor-pointer"
                >
                  View your personalized eligibility matches
                </button>
              </p>
            )}
          </div>

          <div className="lg:col-span-5 flex">
            {!heroImageError ? (
              <div className="w-full rounded-xl overflow-hidden border border-white/15 bg-[#13315C]">
                <img
                  src="/src/assets/images/hero_students_study_1795193290414.jpg"
                  alt="College students studying together with textbooks and laptops in a bright library"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImageError(true)}
                  className="w-full h-full min-h-[260px] object-cover"
                />
              </div>
            ) : (
              <div className="w-full min-h-[260px] rounded-xl border border-white/15 bg-gradient-to-br from-[#13315C] to-[#081C36] p-8 flex flex-col justify-end">
                <BookOpen className="w-10 h-10 text-sky-300 mb-4" aria-hidden="true" />
                <p className="text-lg font-semibold text-white">
                  Transparent Financial Aid Discovery
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  Built for first-time scholarship applicants across India.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sample Statistics Strip */}
      <section className="bg-[#EAF2FF] border-b border-slate-200 py-10">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <h2 className="text-lg font-bold text-[#0B2545]">
              Platform Snapshot
            </h2>
            <span className="text-xs font-medium text-slate-600">
              Sample Data · Hackathon Demonstration Figures
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SAMPLE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-slate-200 rounded-xl p-5"
              >
                <div className="font-mono text-2xl font-semibold text-[#1D63DC] tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-[#0B2545] mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ScholarConnect Works */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
              Three Steps to Find &amp; Track Aid
            </h2>
            <p className="text-slate-600 mt-2">
              Designed for first-time applicants so eligibility rules, income
              ceilings, and document checklists stay clear from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-[#F6F9FD]">
              <p className="font-mono text-xs font-semibold text-[#1D63DC] mb-2">
                01. Student Profile
              </p>
              <h3 className="text-lg font-semibold text-[#0B2545] mb-2">
                Enter Your Details Once
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Save your state, course, education level, family income,
                academic percentage, and category privately in your browser.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#F6F9FD]">
              <p className="font-mono text-xs font-semibold text-[#1D63DC] mb-2">
                02. Eligibility Matching
              </p>
              <h3 className="text-lg font-semibold text-[#0B2545] mb-2">
                See Clear Criteria Checks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instantly group scholarships into Eligible, Requires Further
                Verification, or Not Eligible based on transparent rules.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#F6F9FD]">
              <p className="font-mono text-xs font-semibold text-[#1D63DC] mb-2">
                03. Application Tracker
              </p>
              <h3 className="text-lg font-semibold text-[#0B2545] mb-2">
                Save &amp; Update Progress
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bookmark schemes and track every deadline from Interested to
                Applied, Approved, or Rejected with personal document notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sample Scholarships */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
                Featured Sample Scholarships
              </h2>
              <p className="text-slate-600 mt-1">
                Sample demo opportunities across school, diploma, and college
                streams.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('finder')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#EAF2FF] text-[#0B2545] hover:bg-blue-100 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            >
              <span>View All {SAMPLE_SCHOLARSHIPS.length} Scholarships</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((sch) => (
              <article
                key={sch.id}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-slate-500 mb-2">
                    <span>Demo Data</span>
                    <span aria-hidden="true"> · </span>
                    <span>Deadline {sch.lastDate}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#0B2545] leading-snug mb-1">
                    {sch.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">{sch.provider}</p>

                  <div className="font-mono text-xl font-semibold text-[#1D63DC] tabular-nums mb-4">
                    {sch.amountDisplay}
                  </div>

                  <dl className="space-y-1.5 text-sm text-slate-700 border-t border-slate-100 pt-4 mb-6">
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500 shrink-0">Eligibility</dt>
                      <dd className="text-right font-medium text-slate-800">
                        {sch.shortEligibility}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500 shrink-0">Income Limit</dt>
                      <dd className="text-right font-mono tabular-nums font-medium text-slate-800">
                        {formatINR(sch.incomeLimit)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectScholarship(sch)}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-sm font-semibold transition-colors cursor-pointer min-h-[40px]"
                >
                  View Details
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
