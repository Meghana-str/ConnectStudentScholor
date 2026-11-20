import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  APPLICATION_STATUSES,
  SAMPLE_SCHOLARSHIPS,
  type ApplicationStatusType,
  type SavedApplication,
  type Scholarship,
  type StudentProfile,
} from '../data/scholarships';
import { evaluateEligibility } from '../utils/eligibility';
import type { PageId } from './Navbar';

interface MyApplicationsProps {
  applications: SavedApplication[];
  studentProfile: StudentProfile | null;
  onUpdateStatus: (scholarshipId: string, status: ApplicationStatusType) => void;
  onUpdateNotes: (scholarshipId: string, notes: string) => void;
  onRemoveApplication: (scholarshipId: string) => void;
  onSelectScholarship: (scholarship: Scholarship) => void;
  onNavigate: (page: PageId) => void;
}

type StatusFilter = 'All' | ApplicationStatusType;

export default function MyApplications({
  applications,
  studentProfile,
  onUpdateStatus,
  onUpdateNotes,
  onRemoveApplication,
  onSelectScholarship,
  onNavigate,
}: MyApplicationsProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  const enrichedApps = applications
    .map((app) => {
      const scholarship = SAMPLE_SCHOLARSHIPS.find(
        (s) => s.id === app.scholarshipId
      );
      if (!scholarship) return null;
      return {
        ...app,
        scholarship,
        eligibility: studentProfile
          ? evaluateEligibility(studentProfile, scholarship)
          : null,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const statusCounts = APPLICATION_STATUSES.reduce<Record<string, number>>(
    (acc, st) => {
      acc[st] = enrichedApps.filter((a) => a.status === st).length;
      return acc;
    },
    {}
  );

  const visibleApps =
    statusFilter === 'All'
      ? enrichedApps
      : enrichedApps.filter((a) => a.status === statusFilter);

  return (
    <div>
      <section className="bg-[#0B2545] text-white py-10">
        <div className="max-w-[1200px] mx-auto px-5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            My Applications
          </h1>
          <p className="text-slate-200 mt-2 max-w-2xl">
            Save scholarships, track deadlines, and update your progress from
            Interested to Applied, Approved, or Rejected. All changes save
            automatically in localStorage.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-5 space-y-6">
          {/* Status Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter saved applications by status"
            className="inline-flex flex-wrap gap-1.5 p-1.5 bg-slate-200/70 rounded-lg"
          >
            <button
              type="button"
              role="tab"
              aria-selected={statusFilter === 'All'}
              onClick={() => setStatusFilter('All')}
              className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                statusFilter === 'All'
                  ? 'bg-white text-[#0B2545] shadow-xs'
                  : 'text-slate-700 hover:text-[#0B2545]'
              }`}
            >
              All Saved ({enrichedApps.length})
            </button>

            {APPLICATION_STATUSES.map((st) => (
              <button
                key={st}
                type="button"
                role="tab"
                aria-selected={statusFilter === st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#0B2545] text-white'
                    : 'text-slate-700 hover:text-[#0B2545]'
                }`}
              >
                {st} ({statusCounts[st] || 0})
              </button>
            ))}
          </div>

          {enrichedApps.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center">
              <h2 className="text-lg font-bold text-[#0B2545]">
                No saved scholarships yet
              </h2>
              <p className="text-sm text-slate-600 mt-1 mb-5">
                Browse the scholarship finder and select <strong>Save</strong>{' '}
                to build your personal application tracker.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('finder')}
                className="px-5 py-2.5 rounded-lg bg-[#1D63DC] hover:bg-[#13315C] text-white text-sm font-semibold cursor-pointer"
              >
                Explore Scholarships
              </button>
            </div>
          ) : visibleApps.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center">
              <h2 className="text-lg font-bold text-[#0B2545]">
                No applications marked as &ldquo;{statusFilter}&rdquo;
              </h2>
              <button
                type="button"
                onClick={() => setStatusFilter('All')}
                className="mt-4 px-4 py-2 rounded-lg bg-[#EAF2FF] text-[#0B2545] text-sm font-semibold cursor-pointer"
              >
                Show All Saved Applications
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleApps.map(
                ({ scholarship, status, notes, updatedAt, eligibility }) => (
                  <article
                    key={scholarship.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                  >
                    <div className="lg:col-span-8 space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
                        <span>Demo Data</span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={`font-semibold ${
                            status === 'Approved'
                              ? 'text-emerald-700'
                              : status === 'Rejected'
                              ? 'text-red-700'
                              : status === 'Applied'
                              ? 'text-amber-700'
                              : 'text-[#1D63DC]'
                          }`}
                        >
                          Status: {status}
                        </span>
                        {eligibility && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums text-slate-700">
                              {eligibility.statusLabel} (
                              {eligibility.matchPercentage}%)
                            </span>
                          </>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-[#0B2545]">
                          {scholarship.name}
                        </h3>
                        <p className="text-sm text-slate-600 mt-0.5">
                          {scholarship.provider}
                          <span aria-hidden="true"> · </span>
                          <span className="font-mono font-semibold text-[#1D63DC] tabular-nums">
                            {scholarship.amountDisplay}
                          </span>
                          <span aria-hidden="true"> · </span>
                          <span>Deadline: {scholarship.lastDate}</span>
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor={`notes-${scholarship.id}`}
                          className="block text-xs font-semibold text-[#0B2545] mb-1"
                        >
                          Personal Notes / Document Checklist
                        </label>
                        <input
                          id={`notes-${scholarship.id}`}
                          type="text"
                          placeholder="e.g., Collect income certificate before Friday..."
                          value={notes || ''}
                          onChange={(e) =>
                            onUpdateNotes(scholarship.id, e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-2 focus:outline-[#1D63DC]"
                        />
                      </div>

                      <p className="text-xs text-slate-500">
                        Last updated:{' '}
                        {new Date(updatedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>

                    <div className="lg:col-span-4 lg:border-l lg:border-slate-200 lg:pl-6 space-y-3">
                      <div>
                        <label
                          htmlFor={`status-${scholarship.id}`}
                          className="block text-xs font-semibold text-[#0B2545] mb-1.5"
                        >
                          Update Application Status
                        </label>
                        <select
                          id={`status-${scholarship.id}`}
                          value={status}
                          onChange={(e) =>
                            onUpdateStatus(
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

                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => onSelectScholarship(scholarship)}
                          className="flex-1 py-2 px-3 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold whitespace-nowrap cursor-pointer min-h-[38px]"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveApplication(scholarship.id)}
                          aria-label={`Remove ${scholarship.name} from applications`}
                          className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold cursor-pointer min-h-[38px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
