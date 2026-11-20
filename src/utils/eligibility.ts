import type { Scholarship, StudentProfile } from '../data/scholarships';

export type CheckStatus = 'pass' | 'verify' | 'fail';

export type OverallEligibilityStatus =
  | 'eligible'
  | 'verification'
  | 'not_eligible';

export interface EligibilityCheck {
  label: string;
  status: CheckStatus;
  detail: string;
}

export interface EligibilityEvaluation {
  overallStatus: OverallEligibilityStatus;
  statusLabel: string;
  matchPercentage: number;
  checks: EligibilityCheck[];
}

export function formatINR(amount: number | string | null | undefined): string {
  if (amount === '' || amount === null || amount === undefined || isNaN(Number(amount))) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

/**
 * Evaluates rule-based eligibility criteria between a student's profile and a scholarship.
 * Note: The resulting matchPercentage reflects how many profile criteria checks matched
 * and is NOT an official selection probability.
 */
export function evaluateEligibility(
  student: StudentProfile | null,
  scholarship: Scholarship
): EligibilityEvaluation | null {
  if (!student) return null;

  const checks: EligibilityCheck[] = [];

  // 1. Category Check
  const categoryMatched = scholarship.categories.includes(student.category);
  checks.push({
    label: 'Category',
    status: categoryMatched ? 'pass' : 'fail',
    detail: categoryMatched
      ? `Your category (${student.category}) is eligible.`
      : `Restricted to: ${scholarship.categories.join(', ')} (Your profile: ${student.category}).`,
  });

  // 2. Annual Family Income Check
  const income = Number(student.annualIncome);
  const limit = Number(scholarship.incomeLimit);
  let incomeStatus: CheckStatus = 'fail';
  let incomeDetail = '';

  if (income <= limit) {
    incomeStatus = 'pass';
    incomeDetail = `Your family income (${formatINR(income)}) is within the ${formatINR(limit)} limit.`;
  } else if (income <= limit * 1.15) {
    incomeStatus = 'verify';
    incomeDetail = `Your income (${formatINR(income)}) is slightly above ${formatINR(limit)} (within 15% margin — income certificate verification required).`;
  } else {
    incomeStatus = 'fail';
    incomeDetail = `Your income (${formatINR(income)}) exceeds the ${formatINR(limit)} limit.`;
  }
  checks.push({
    label: 'Annual Family Income',
    status: incomeStatus,
    detail: incomeDetail,
  });

  // 3. Academic Percentage Check
  const pct = Number(student.percentage);
  const minPct = Number(scholarship.minPercentage);
  let pctStatus: CheckStatus = 'fail';
  let pctDetail = '';

  if (pct >= minPct) {
    pctStatus = 'pass';
    pctDetail = `Your score (${pct}%) meets the minimum ${minPct}% requirement.`;
  } else if (pct >= minPct - 5) {
    pctStatus = 'verify';
    pctDetail = `Your score (${pct}%) is close to ${minPct}% — requires mark-sheet / relaxation verification.`;
  } else {
    pctStatus = 'fail';
    pctDetail = `Minimum ${minPct}% required (Your profile: ${pct}%).`;
  }
  checks.push({
    label: 'Academic Percentage',
    status: pctStatus,
    detail: pctDetail,
  });

  // 4. Education Level Check
  const levelMatched = scholarship.educationLevels.includes(student.educationLevel);
  checks.push({
    label: 'Education Level',
    status: levelMatched ? 'pass' : 'fail',
    detail: levelMatched
      ? `Your level (${student.educationLevel}) matches.`
      : `Applicable for: ${scholarship.educationLevels.join(', ')} (Your profile: ${student.educationLevel}).`,
  });

  // 5. Course & Additional Document Verification Check
  const courseMatched = scholarship.courses.includes(student.course);
  if (!courseMatched) {
    checks.push({
      label: 'Course & Document Check',
      status: 'fail',
      detail: `Applicable courses: ${scholarship.courses.join(', ')} (Your profile: ${student.course}).`,
    });
  } else if (scholarship.requiresExtraVerification) {
    checks.push({
      label: 'Course & Document Check',
      status: 'verify',
      detail: `Course (${student.course}) matches, but requires further verification: ${scholarship.verificationNote}`,
    });
  } else {
    checks.push({
      label: 'Course & Document Check',
      status: 'pass',
      detail: `Course (${student.course}) is eligible.`,
    });
  }

  // Criteria match percentage (pass = 1.0, verify = 0.5, fail = 0)
  const scoreSum = checks.reduce((sum, item) => {
    if (item.status === 'pass') return sum + 1;
    if (item.status === 'verify') return sum + 0.5;
    return sum;
  }, 0);

  const matchPercentage = Math.round((scoreSum / checks.length) * 100);

  const hasFail = checks.some((c) => c.status === 'fail');
  const hasVerify = checks.some((c) => c.status === 'verify');

  let overallStatus: OverallEligibilityStatus = 'eligible';
  let statusLabel = 'Eligible';

  if (hasFail) {
    overallStatus = 'not_eligible';
    statusLabel = 'Not Eligible';
  } else if (hasVerify) {
    overallStatus = 'verification';
    statusLabel = 'Requires Further Verification';
  }

  return {
    overallStatus,
    statusLabel,
    matchPercentage,
    checks,
  };
}
