import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  XCircle,
} from 'lucide-react';
import {
  APPLICATION_STATUSES,
  type ApplicationStatusType,
  type SavedApplication,
  type Scholarship,
  type StudentProfile,
} from '../data/scholarships';
import { evaluateEligibility, formatINR } from '../utils/eligibility';
import type { PageId } from './Navbar';

interface ScholarshipDetailsProps {
  scholarship: Scholarship;
  studentProfile: StudentProfile | null;
  savedApplication: SavedApplication | null;
  onSaveStatus: (scholarshipId: string, status: ApplicationStatusType) => void;
  onRemoveSaved: (scholarshipId: string) => void;
  onBack: () => void;
  onNavigate: (page: PageId) => void;
}

export default function ScholarshipDetails({
  scholarship,
  studentProfile,
  savedApplication,
  onSaveStatus,
  onRemoveSaved,
  onBack,
  onNavigate,
}: ScholarshipDetailsProps) {
  const [demoNoticeVisible, setDemoNoticeVisible] = useState(false);

  const eligibility = studentProfile
    ? evaluateEligibility(studentProfile, scholarship)
    : null;

  const currentStatus = savedApplication ? savedApplication.status : '';

  return (
    <div>
      <section className="bg-[#0B2545] text-white py-10">
        <div className="max-w-[1200px] mx-auto px-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/25 text-slate-100 hover:bg-white/10 text-xs font-semibold mb-5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Scholarships</span>
          </button>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-sky-200 mb-2">
                Sample Scholarship Data (Demo) · {scholarship.provider}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance]">
                {scholarship.name}
              </h1>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 min-w-[210px]">
              <p className="text-xs text-sky-200">Award Benefit</p>
              <p className="font-mono text-2xl font-bold text-white tabular-nums mt-0.5">
                {scholarship.amountDisplay}
              </p>
              <p className="text-xs text-slate-200 mt-1 font-mono tabular-nums">
                Deadline: {scholarship.lastDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-[#0B2545] mb-2.5">
                Scholarship Description
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {scholarship.description}
              </p>
            </div>

            {/* Eligibility Breakdown */}
            {eligibility ? (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <h2 className="text-lg font-bold text-[#0B2545]">
                    Your Eligibility Breakdown
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                      eligibility.overallStatus === 'eligible'
                        ? 'text-emerald-800'
                        : eligibility.overallStatus === 'verification'
                        ? 'text-amber-800'
                        : 'text-red-800'
                    }`}
                  >
                    {eligibility.overallStatus === 'eligible' && (
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    )}
                    {eligibility.overallStatus === 'verification' && (
                      <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                    )}
                    {eligibility.overallStatus === 'not_eligible' && (
                      <XCircle className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>
                      {eligibility.statusLabel} ·{' '}
                      <span className="font-mono tabular-nums">
                        {eligibility.matchPercentage}%
                      </span>{' '}
                      Criteria Match
                    </span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 bg-[#F6F9FD] border border-slate-200 rounded-lg px-3.5 py-2.5 mb-4">
                  Criteria Match % strictly reflects how many of the 5 profile
                  rules below matched. It is <strong>not</strong> an official
                  selection probability.
                </p>

                <ul className="space-y-2.5">
                  {eligibility.checks.map((check) => (
                    <li
                      key={check.label}
                      className={`p-3.5 rounded-lg border text-sm flex items-start gap-3 ${
                        check.status === 'pass'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : check.status === 'verify'
                          ? 'bg-amber-50 border-amber-200 text-amber-950'
                          : 'bg-red-50 border-red-200 text-red-950'
                      }`}
                    >
                      {check.status === 'pass' && (
                        <CheckCircle2
                          className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                      {check.status === 'verify' && (
                        <AlertTriangle
                          className="w-4 h-4 text-amber-700 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                      {check.status === 'fail' && (
                        <XCircle
                          className="w-4 h-4 text-red-700 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                      <div>
                        <strong className="font-semibold">{check.label}:</strong>{' '}
                        {check.detail}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-[#EAF2FF] border border-blue-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-[#0B2545]">
                  Register your student profile to view a line-by-line
                  eligibility comparison for this scholarship.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 rounded-lg bg-[#1D63DC] hover:bg-[#13315C] text-white text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Register Now
                </button>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-[#0B2545] mb-3">
                Eligibility Requirements
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>
                  <strong className="text-[#0B2545]">Eligible Categories:</strong>{' '}
                  {scholarship.categories.join(', ')}
                </li>
                <li>
                  <strong className="text-[#0B2545]">
                    Annual Family Income Limit:
                  </strong>{' '}
                  Up to{' '}
                  <span className="font-mono tabular-nums">
                    {formatINR(scholarship.incomeLimit)}
                  </span>
                </li>
                <li>
                  <strong className="text-[#0B2545]">
                    Minimum Academic Percentage:
                  </strong>{' '}
                  <span className="font-mono tabular-nums">
                    {scholarship.minPercentage}%
                  </span>
                </li>
                <li>
                  <strong className="text-[#0B2545]">
                    Eligible Education Levels:
                  </strong>{' '}
                  {scholarship.educationLevels.join(', ')}
                </li>
                <li>
                  <strong className="text-[#0B2545]">Eligible Courses:</strong>{' '}
                  {scholarship.courses.join(', ')}
                </li>
                <li>
                  <strong className="text-[#0B2545]">Verification Note:</strong>{' '}
                  {scholarship.verificationNote}
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-[#0B2545] mb-3">Benefits</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                {scholarship.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-[#0B2545] mb-3">
                Required Documents
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                {scholarship.documents.map((doc) => (
                  <li key={doc}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:sticky lg:top-24 space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#0B2545] mb-3">
                  Application Summary
                </h3>
                <dl className="divide-y divide-slate-100 text-sm">
                  <div className="py-2.5 flex justify-between gap-2">
                    <dt className="text-slate-600">Application Deadline</dt>
                    <dd className="font-mono font-semibold text-[#0B2545] tabular-nums">
                      {scholarship.lastDate}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-2">
                    <dt className="text-slate-600">Income Limit</dt>
                    <dd className="font-mono font-semibold text-[#0B2545] tabular-nums">
                      {formatINR(scholarship.incomeLimit)}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-2">
                    <dt className="text-slate-600">Minimum Percentage</dt>
                    <dd className="font-mono font-semibold text-[#0B2545] tabular-nums">
                      {scholarship.minPercentage}%
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="pt-5 border-t border-slate-200">
                <h4 className="text-sm font-bold text-[#0B2545] mb-3">
                  Track in My Applications
                </h4>

                {savedApplication ? (
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="detailStatusSelect"
                        className="block text-xs font-medium text-slate-600 mb-1.5"
                      >
                        Current Application Status
                      </label>
                      <select
                        id="detailStatusSelect"
                        value={currentStatus}
                        onChange={(e) =>
                          onSaveStatus(
                            scholarship.id,
                            e.target.value as ApplicationStatusType
                          )
                        }
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-2 focus:outline-[#1D63DC]"
                      >
                        {APPLICATION_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveSaved(scholarship.id)}
                      className="w-full py-2 px-3 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                    >
                      Remove from My Applications
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSaveStatus(scholarship.id, 'Interested')}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#1D63DC] hover:bg-[#13315C] text-white text-sm font-semibold cursor-pointer min-h-[42px]"
                  >
                    Save as Interested
                  </button>
                )}
              </div>

              <div className="pt-5 border-t border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-[#0B2545]">
                  Application Website Links
                </h4>

                <button
                  type="button"
                  onClick={() => setDemoNoticeVisible((prev) => !prev)}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#EAF2FF] hover:bg-blue-100 text-[#0B2545] text-xs font-semibold transition-colors cursor-pointer"
                >
                  {scholarship.demoLinkLabel} (Demo Link)
                </button>

                {demoNoticeVisible && (
                  <p className="text-xs text-[#0B2545] bg-[#F6F9FD] border border-blue-200 rounded-lg p-3 leading-relaxed">
                    <strong>Demo Notice:</strong> This scholarship entry is
                    sample demonstration data, so there is no live external
                    application form for this mock scheme. Use the verified
                    official portal below for real government scholarships.
                  </p>
                )}

                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D63DC] hover:underline"
                >
                  <span>
                    Verified Official Link: National Scholarship Portal
                    (scholarships.gov.in)
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
