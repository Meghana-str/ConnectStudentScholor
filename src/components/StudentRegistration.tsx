import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  CATEGORIES,
  COURSES,
  EDUCATION_LEVELS,
  INDIAN_STATES,
  type CategoryType,
  type StudentProfile,
} from '../data/scholarships';
import type { PageId } from './Navbar';

interface StudentRegistrationProps {
  studentProfile: StudentProfile | null;
  onSaveProfile: (profile: StudentProfile) => void;
  onClearProfile: () => void;
  onNavigate: (page: PageId) => void;
}

interface FormState {
  fullName: string;
  email: string;
  state: string;
  course: string;
  educationLevel: string;
  annualIncome: string;
  percentage: string;
  category: CategoryType | '';
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  fullName: '',
  email: '',
  state: '',
  course: '',
  educationLevel: '',
  annualIncome: '',
  percentage: '',
  category: '',
};

export default function StudentRegistration({
  studentProfile,
  onSaveProfile,
  onClearProfile,
  onNavigate,
}: StudentRegistrationProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    if (studentProfile) {
      setFormData({
        fullName: studentProfile.fullName || '',
        email: studentProfile.email || '',
        state: studentProfile.state || '',
        course: studentProfile.course || '',
        educationLevel: studentProfile.educationLevel || '',
        annualIncome:
          studentProfile.annualIncome !== undefined
            ? String(studentProfile.annualIncome)
            : '',
        percentage:
          studentProfile.percentage !== undefined
            ? String(studentProfile.percentage)
            : '',
        category: studentProfile.category || '',
      });
    } else {
      setFormData(INITIAL_FORM);
    }
  }, [studentProfile]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.state) {
      newErrors.state = 'Please select your state or union territory.';
    }

    if (!formData.course) {
      newErrors.course = 'Please select your course or stream.';
    }

    if (!formData.educationLevel) {
      newErrors.educationLevel = 'Please select your current education level.';
    }

    if (formData.annualIncome === '' || isNaN(Number(formData.annualIncome))) {
      newErrors.annualIncome = 'Please enter your annual family income in INR.';
    } else if (Number(formData.annualIncome) < 0) {
      newErrors.annualIncome = 'Annual family income cannot be negative.';
    }

    if (formData.percentage === '' || isNaN(Number(formData.percentage))) {
      newErrors.percentage = 'Please enter your academic percentage.';
    } else if (
      Number(formData.percentage) < 0 ||
      Number(formData.percentage) > 100
    ) {
      newErrors.percentage = 'Academic percentage must be between 0 and 100.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select your category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (savedMessage) setSavedMessage('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanedProfile: StudentProfile = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      state: formData.state,
      course: formData.course,
      educationLevel: formData.educationLevel,
      annualIncome: Number(formData.annualIncome),
      percentage: Number(formData.percentage),
      category: formData.category as CategoryType,
      updatedAt: new Date().toISOString(),
    };

    onSaveProfile(cleanedProfile);
    setSavedMessage(
      'Profile saved to your browser. You can now view personalized eligibility checks.'
    );
  };

  const handleFillSample = () => {
    setFormData({
      fullName: 'Aarav Sharma',
      email: 'aarav.student@example.org',
      state: 'Maharashtra',
      course: 'Engineering / B.Tech',
      educationLevel: 'Undergraduate',
      annualIncome: '240000',
      percentage: '74',
      category: 'OBC',
    });
    setErrors({});
    setSavedMessage('');
  };

  const handleReset = () => {
    onClearProfile();
    setFormData(INITIAL_FORM);
    setErrors({});
    setSavedMessage('Saved student profile has been cleared from this browser.');
  };

  return (
    <div>
      <section className="bg-[#0B2545] text-white py-10">
        <div className="max-w-[1200px] mx-auto px-5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Student Profile &amp; Registration
          </h1>
          <p className="text-slate-200 mt-2 max-w-2xl">
            Enter your academic and family details once. ScholarConnect stores
            your profile in your browser&apos;s localStorage to run instant
            eligibility checks.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[880px] mx-auto px-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-[#0B2545]">
                  {studentProfile
                    ? 'Update Student Details'
                    : 'Register Your Student Profile'}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  All fields marked with <span className="text-red-600">*</span>{' '}
                  are required.
                </p>
              </div>

              <button
                type="button"
                onClick={handleFillSample}
                className="px-3.5 py-2 rounded-lg bg-[#EAF2FF] text-[#0B2545] hover:bg-blue-100 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
              >
                Fill Sample Student Data
              </button>
            </div>

            {savedMessage && (
              <div
                role="status"
                className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-700 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{savedMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('finder')}
                  className="px-4 py-2 rounded-lg bg-[#0B2545] hover:bg-[#13315C] text-white text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer min-h-[38px]"
                >
                  Find Eligible Scholarships
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="e.g., Priya Verma"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-2 focus:outline-[#1D63DC] ${
                      errors.fullName ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g., priya@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-2 focus:outline-[#1D63DC] ${
                      errors.email ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    State / Union Territory <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-2 focus:outline-[#1D63DC] ${
                      errors.state ? 'border-red-500' : 'border-slate-300'
                    }`}
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {errors.state}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-2 focus:outline-[#1D63DC] ${
                      errors.category ? 'border-red-500' : 'border-slate-300'
                    }`}
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Course */}
                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Course / Stream <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-2 focus:outline-[#1D63DC] ${
                      errors.course ? 'border-red-500' : 'border-slate-300'
                    }`}
                  >
                    <option value="">Select Course</option>
                    {COURSES.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                  {errors.course && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {errors.course}
                    </p>
                  )}
                </div>

                {/* Education Level */}
                <div>
                  <label
                    htmlFor="educationLevel"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Current Education Level <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="educationLevel"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-2 focus:outline-[#1D63DC] ${
                      errors.educationLevel
                        ? 'border-red-500'
                        : 'border-slate-300'
                    }`}
                  >
                    <option value="">Select Education Level</option>
                    {EDUCATION_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                  {errors.educationLevel && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {errors.educationLevel}
                    </p>
                  )}
                </div>

                {/* Annual Family Income */}
                <div>
                  <label
                    htmlFor="annualIncome"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Annual Family Income (₹){' '}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="annualIncome"
                    name="annualIncome"
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="e.g., 250000"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white font-mono tabular-nums focus:outline-2 focus:outline-[#1D63DC] ${
                      errors.annualIncome ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.annualIncome && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {errors.annualIncome}
                    </p>
                  )}
                </div>

                {/* Academic Percentage */}
                <div>
                  <label
                    htmlFor="percentage"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Academic Percentage (%){' '}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="percentage"
                    name="percentage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="e.g., 78.5"
                    value={formData.percentage}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white font-mono tabular-nums focus:outline-2 focus:outline-[#1D63DC] ${
                      errors.percentage ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.percentage && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {errors.percentage}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#1D63DC] hover:bg-[#13315C] text-white font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
                >
                  {studentProfile ? 'Update Profile' : 'Submit & Save Profile'}
                </button>

                {studentProfile && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-3 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
                  >
                    Clear Saved Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
