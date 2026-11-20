import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Search,
  XCircle,
} from 'lucide-react';
import {
  CATEGORIES,
  COURSES,
  SAMPLE_SCHOLARSHIPS,
  type SavedApplication,
  type Scholarship,
  type StudentProfile,
} from '../data/scholarships';
import {
  evaluateEligibility,
  formatINR,
  type OverallEligibilityStatus,
} from '../utils/eligibility';
import type { PageId } from './Navbar';

interface ScholarshipFinderProps {
  studentProfile: StudentProfile | null;
  applications: SavedApplication[];
  onSelectScholarship: (scholarship: Scholarship) => void;
  onToggleSave: (scholarshipId: string) => void;
  onNavigate: (page: PageId) => void;
}

type EligibilityFilter = 'all' | OverallEligibilityStatus;

export default function ScholarshipFinder({
  studentProfile,
  applications,
  onSelectScholarship,
  onToggleSave,
  onNavigate,
}: ScholarshipFinderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [incomeFilter, setIncomeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [eligibilityTab, setEligibilityTab] = useState<EligibilityFilter>('all');

  const evaluatedList = useMemo(() => {
    return SAMPLE_SCHOLARSHIPS.map((sch) => ({
      scholarship: sch,
      eligibility: studentProfile
        ? evaluateEligibility(studentProfile, sch)
        : null,
    }));
  }, [studentProfile]);

  const counts = useMemo(() => {
    if (!studentProfile) return null;
    return evaluatedList.reduce(
      (acc, item) => {
        if (item.eligibility) {
          acc[item.eligibility.overallStatus] += 1;
        }
        return acc;
      },
      { eligible: 0, verification: 0, not_eligible: 0 }
    );
  }, [evaluatedList, studentProfile]);

  const filteredList = useMemo(() => {
    return evaluatedList
      .filter(({ scholarship, eligibility }) => {
        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          const matchText =
            scholarship.name.toLowerCase().includes(q) ||
            scholarship.provider.toLowerCase().includes(q) ||
            scholarship.description.toLowerCase().includes(q) ||
            scholarship.shortEligibility.toLowerCase().includes(q);
          if (!matchText) return false;
        }

        if (
          courseFilter !== 'All' &&
          !scholarship.courses.includes(courseFilter)
        ) {
          return false;
        }

        if (
          categoryFilter !== 'All' &&
          !scholarship.categories.includes(
            categoryFilter as Scholarship['categories'][number]
          )
        ) {
          return false;
        }

        if (incomeFilter !== 'All') {
          const maxStudentIncome = Number(incomeFilter);
          if (scholarship.incomeLimit < maxStudentIncome) {
            return false;
          }
        }

        if (
          studentProfile &&
          eligibilityTab !== 'all' &&
          eligibility &&
          eligibility.overallStatus !== eligibilityTab
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (!a.eligibility || !b.eligibility) return 0;
        return b.eligibility.matchPercentage - a.eligibility.matchPercentage;
      });
  }, [
    evaluatedList,
    searchQuery,
    courseFilter,
    categoryFilter,
    incomeFilter,
    eligibilityTab,
    studentProfile,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setCourseFilter('All');
    setIncomeFilter('All');
    setCategoryFilter('All');
    setEligibilityTab('all');
  };

  const getSavedApplication = (id: string) =>
    applications.find((app) => app.scholarshipId === id);

  return (
    <div>
      <section className="bg-[#0B2545] text-white py-10">
        <div className="max-w-[1200px] mx-auto px-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-sky-200 mb-2">
              Sample Demo Dataset · {SAMPLE_SCHOLARSHIPS.length} Curated
              Scholarships
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Find Scholarships
            </h1>
            <p className="text-slate-200 mt-1.5 max-w-2xl">
              Search and filter sample scholarships by course, annual family
              income, and category, or view your personalized criteria match.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-5 space-y-6">
          {/* Student Eligibility Summary / Registration Callout */}
          {studentProfile && counts ? (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-[#0B2545]">
                    Eligibility Matching for {studentProfile.fullName}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {studentProfile.category}
                    <span aria-hidden="true"> · </span>
                    {studentProfile.course} ({studentProfile.educationLevel})
                    <span aria-hidden="true"> · </span>
                    Income:{' '}
                    <span className="font-mono tabular-nums">
                      {formatINR(studentProfile.annualIncome)}
                    </span>
                    <span aria-hidden="true"> · </span>
                    Marks:{' '}
                    <span className="font-mono tabular-nums">
                      {studentProfile.percentage}%
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="px-3.5 py-2 rounded-lg bg-[#EAF2FF] text-[#0B2545] hover:bg-blue-100 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer min-h-[38px]"
                >
                  Edit Profile
                </button>
              </div>

              {/* Segmented Eligibility Tabs */}
              <div
                role="tablist"
                aria-label="Filter by eligibility status"
                className="inline-flex flex-wrap gap-1.5 p-1.5 bg-slate-100 rounded-lg mb-4"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={eligibilityTab === 'all'}
                  onClick={() => setEligibilityTab('all')}
                  className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    eligibilityTab === 'all'
                      ? 'bg-white text-[#0B2545] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({SAMPLE_SCHOLARSHIPS.length})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={eligibilityTab === 'eligible'}
                  onClick={() => setEligibilityTab('eligible')}
                  className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    eligibilityTab === 'eligible'
                      ? 'bg-emerald-700 text-white'
                      : 'text-slate-700 hover:text-emerald-800'
                  }`}
                >
                  Eligible ({counts.eligible})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={eligibilityTab === 'verification'}
                  onClick={() => setEligibilityTab('verification')}
                  className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    eligibilityTab === 'verification'
                      ? 'bg-amber-700 text-white'
                      : 'text-slate-700 hover:text-amber-800'
                  }`}
                >
                  Requires Further Verification ({counts.verification})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={eligibilityTab === 'not_eligible'}
                  onClick={() => setEligibilityTab('not_eligible')}
                  className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    eligibilityTab === 'not_eligible'
                      ? 'bg-red-700 text-white'
                      : 'text-slate-700 hover:text-red-800'
                  }`}
                >
                  Not Eligible ({counts.not_eligible})
                </button>
              </div>

              <p className="text-xs text-slate-600 bg-[#F6F9FD] border border-slate-200 rounded-lg px-3.5 py-2.5">
                <strong className="text-slate-800">Disclaimer:</strong> Match
                percentages reflect how many rule-based profile checks (Category,
                Income, Marks, Education Level, and Course) matched. They are{' '}
                <strong>not</strong> an official selection probability.
              </p>
            </div>
          ) : (
            <div className="bg-[#EAF2FF] border border-blue-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-[#0B2545] max-w-2xl">
                <strong className="font-semibold">
                  Register your student profile for instant eligibility checks.
                </strong>{' '}
                We will compare your details against every scholarship and show
                eligible matches, verification flags, and non-matching criteria.
              </div>
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="px-4 py-2.5 rounded-lg bg-[#1D63DC] hover:bg-[#13315C] text-white text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
              >
                Register Student Profile
              </button>
            </div>
          )}

          {/* Search and Filter Controls */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="searchQuery"
                  className="block text-xs font-semibold text-[#0B2545] mb-1.5"
                >
                  Search Scholarships
                </label>
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="searchQuery"
                    type="text"
                    placeholder="Name, course, or provider..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-2 focus:outline-[#1D63DC]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="courseFilter"
                  className="block text-xs font-semibold text-[#0B2545] mb-1.5"
                >
                  Filter by Course
                </label>
                <select
                  id="courseFilter"
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-2 focus:outline-[#1D63DC]"
                >
                  <option value="All">All Courses</option>
                  {COURSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="incomeFilter"
                  className="block text-xs font-semibold text-[#0B2545] mb-1.5"
                >
                  Family Income Bracket
                </label>
                <select
                  id="incomeFilter"
                  value={incomeFilter}
                  onChange={(e) => setIncomeFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-2 focus:outline-[#1D63DC]"
                >
                  <option value="All">Any Income Limit</option>
                  <option value="200000">Up to ₹2,00,000</option>
                  <option value="300000">Up to ₹3,00,000</option>
                  <option value="450000">Up to ₹4,50,000</option>
                  <option value="600000">Up to ₹6,00,000</option>
                  <option value="800000">Up to ₹8,00,000</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="categoryFilter"
                  className="block text-xs font-semibold text-[#0B2545] mb-1.5"
                >
                  Filter by Category
                </label>
                <select
                  id="categoryFilter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-2 focus:outline-[#1D63DC]"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-600 tabular-nums">
                Showing <strong className="text-[#0B2545]">{filteredList.length}</strong> of{' '}
                {SAMPLE_SCHOLARSHIPS.length} sample scholarships
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="px-3 py-1.5 rounded-md text-xs font-semibold text-[#1D63DC] hover:bg-[#EAF2FF] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Results Grid */}
          {filteredList.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center">
              <h3 className="text-lg font-semibold text-[#0B2545]">
                No matching scholarships found
              </h3>
              <p className="text-sm text-slate-600 mt-1 mb-5">
                Try clearing some filters or switching your eligibility filter
                tab.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-lg bg-[#1D63DC] hover:bg-[#13315C] text-white text-sm font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredList.map(({ scholarship, eligibility }) => {
                const savedApp = getSavedApplication(scholarship.id);

                return (
                  <article
                    key={scholarship.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs text-slate-500 mb-2">
                        <span>Demo Data</span>
                        <span aria-hidden="true"> · </span>
                        <span>Last Date {scholarship.lastDate}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-[#0B2545] leading-snug mb-1">
                        {scholarship.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">
                        {scholarship.provider}
                      </p>

                      <div className="font-mono text-xl font-semibold text-[#1D63DC] tabular-nums mb-4">
                        {scholarship.amountDisplay}
                      </div>

                      {eligibility && (
                        <div className="mb-4 p-3 rounded-lg bg-[#F6F9FD] border border-slate-200">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                                eligibility.overallStatus === 'eligible'
                                  ? 'text-emerald-800'
                                  : eligibility.overallStatus === 'verification'
                                  ? 'text-amber-800'
                                  : 'text-red-800'
                              }`}
                            >
                              {eligibility.overallStatus === 'eligible' && (
                                <CheckCircle2
                                  className="w-3.5 h-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                              {eligibility.overallStatus === 'verification' && (
                                <AlertTriangle
                                  className="w-3.5 h-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                              {eligibility.overallStatus === 'not_eligible' && (
                                <XCircle
                                  className="w-3.5 h-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                              <span>{eligibility.statusLabel}</span>
                            </span>

                            <span className="font-mono text-xs font-semibold text-[#0B2545] tabular-nums">
                              {eligibility.matchPercentage}% Criteria Match
                            </span>
                          </div>

                          {/* 5-segment criteria indicator (no inline styles) */}
                          <div
                            className="grid grid-cols-5 gap-1"
                            aria-label={`${eligibility.matchPercentage}% criteria match across 5 checks`}
                          >
                            {eligibility.checks.map((chk) => (
                              <div
                                key={chk.label}
                                title={`${chk.label}: ${chk.status}`}
                                className={`h-1.5 rounded-sm ${
                                  chk.status === 'pass'
                                    ? 'bg-emerald-600'
                                    : chk.status === 'verify'
                                    ? 'bg-amber-500'
                                    : 'bg-red-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <dl className="space-y-1.5 text-sm text-slate-700 border-t border-slate-100 pt-3 mb-5">
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-500 shrink-0">
                            Eligibility
                          </dt>
                          <dd className="text-right font-medium text-slate-800">
                            {scholarship.shortEligibility}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-500 shrink-0">
                            Income Limit
                          </dt>
                          <dd className="text-right font-mono tabular-nums font-medium text-slate-800">
                            {formatINR(scholarship.incomeLimit)} / yr
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => onSelectScholarship(scholarship)}
                        className="py-2.5 px-3 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer min-h-[40px]"
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleSave(scholarship.id)}
                        className={`py-2.5 px-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer min-h-[40px] ${
                          savedApp
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                            : 'bg-[#EAF2FF] text-[#0B2545] hover:bg-blue-100'
                        }`}
                      >
                        {savedApp ? (
                          <>
                            <BookmarkCheck
                              className="w-4 h-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="truncate">{savedApp.status}</span>
                          </>
                        ) : (
                          <>
                            <Bookmark
                              className="w-4 h-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span>Save</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
