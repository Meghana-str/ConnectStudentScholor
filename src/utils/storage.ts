import type { SavedApplication, StudentProfile } from '../data/scholarships';

const PROFILE_KEY = 'scholarconnect_student_profile';
const APPLICATIONS_KEY = 'scholarconnect_applications';

export function loadStudentProfile(): StudentProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as StudentProfile) : null;
  } catch (err) {
    console.error('Failed to read student profile from localStorage:', err);
    return null;
  }
}

export function saveStudentProfile(profile: StudentProfile): boolean {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    return true;
  } catch (err) {
    console.error('Failed to save student profile to localStorage:', err);
    return false;
  }
}

export function clearStudentProfile(): void {
  try {
    localStorage.removeItem(PROFILE_KEY);
  } catch (err) {
    console.error('Failed to clear student profile:', err);
  }
}

export function loadApplications(): SavedApplication[] {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    return raw ? (JSON.parse(raw) as SavedApplication[]) : [];
  } catch (err) {
    console.error('Failed to read applications from localStorage:', err);
    return [];
  }
}

export function saveApplications(applications: SavedApplication[]): boolean {
  try {
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
    return true;
  } catch (err) {
    console.error('Failed to save applications to localStorage:', err);
    return false;
  }
}
