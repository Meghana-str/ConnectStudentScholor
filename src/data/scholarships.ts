export type CategoryType = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';

export type ApplicationStatusType =
  | 'Interested'
  | 'Applied'
  | 'Approved'
  | 'Rejected';

export interface Scholarship {
  id: string;
  isDemo: boolean;
  name: string;
  provider: string;
  amount: number;
  amountDisplay: string;
  categories: CategoryType[];
  incomeLimit: number;
  minPercentage: number;
  courses: string[];
  educationLevels: string[];
  lastDate: string;
  requiresExtraVerification: boolean;
  verificationNote: string;
  shortEligibility: string;
  description: string;
  benefits: string[];
  documents: string[];
  demoLinkLabel: string;
}

export interface StudentProfile {
  fullName: string;
  email: string;
  state: string;
  course: string;
  educationLevel: string;
  annualIncome: number;
  percentage: number;
  category: CategoryType;
  updatedAt: string;
}

export interface SavedApplication {
  scholarshipId: string;
  status: ApplicationStatusType;
  notes: string;
  updatedAt: string;
}

export const INDIAN_STATES: string[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Other / Union Territory',
];

export const COURSES: string[] = [
  'School (Class 9-12)',
  'Engineering / B.Tech',
  'Medical / MBBS',
  'Science / B.Sc',
  'Commerce / B.Com',
  'Arts / Humanities',
  'Polytechnic / Diploma',
  'Management / MBA',
  'Other',
];

export const EDUCATION_LEVELS: string[] = [
  'Class 9-10',
  'Class 11-12',
  'Diploma',
  'Undergraduate',
  'Postgraduate',
];

export const CATEGORIES: CategoryType[] = ['General', 'OBC', 'SC', 'ST', 'EWS'];

export const APPLICATION_STATUSES: ApplicationStatusType[] = [
  'Interested',
  'Applied',
  'Approved',
  'Rejected',
];

export interface SampleStat {
  label: string;
  value: string;
  note: string;
}

export const SAMPLE_STATS: SampleStat[] = [
  {
    label: 'Sample Scholarships Listed',
    value: '10',
    note: 'Curated demo dataset across school, diploma, UG & PG',
  },
  {
    label: 'Annual Aid Pool (Sample)',
    value: '₹4.32L+',
    note: 'Combined sample awards per student cohort',
  },
  {
    label: 'Categories Covered',
    value: '5',
    note: 'General, OBC, SC, ST & EWS inclusion',
  },
  {
    label: 'Platform Cost',
    value: '₹0',
    note: 'Free & stored privately in your browser',
  },
];

// Clearly marked sample/demo scholarship data
export const SAMPLE_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'sch-01',
    isDemo: true,
    name: 'National Merit-cum-Means Access Scholarship',
    provider: 'ScholarConnect Sample Foundation',
    amount: 12000,
    amountDisplay: '₹12,000 / year',
    categories: ['General', 'EWS', 'OBC', 'SC', 'ST'],
    incomeLimit: 350000,
    minPercentage: 55,
    courses: ['School (Class 9-12)'],
    educationLevels: ['Class 9-10', 'Class 11-12'],
    lastDate: '2026-12-31',
    requiresExtraVerification: false,
    verificationNote: 'Standard school enrollment & income certificate check.',
    shortEligibility: 'Class 9–12 · Min 55% · All Categories',
    description:
      'Sample financial support scheme designed to prevent school dropouts among meritorious students from economically weaker families studying in Classes 9 to 12.',
    benefits: [
      '₹1,000 per month (₹12,000 annually) direct support for tuition and books',
      'Renewable up to Class 12 upon maintaining minimum attendance and marks',
      'Zero application fee',
    ],
    documents: [
      'Previous academic year mark sheet',
      'Family Annual Income Certificate from competent authority',
      'School Bonafide / Enrollment Certificate',
      'Student Identity Proof & Bank Passbook copy',
    ],
    demoLinkLabel: 'Demo Portal — National Merit-cum-Means',
  },
  {
    id: 'sch-02',
    isDemo: true,
    name: 'Pragati Technical & Engineering Uplift Grant',
    provider: 'Future Builders Technical Trust',
    amount: 50000,
    amountDisplay: '₹50,000 / year',
    categories: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    incomeLimit: 800000,
    minPercentage: 60,
    courses: ['Engineering / B.Tech', 'Polytechnic / Diploma'],
    educationLevels: ['Diploma', 'Undergraduate'],
    lastDate: '2026-12-20',
    requiresExtraVerification: false,
    verificationNote: 'College admission letter verification required.',
    shortEligibility: 'Engineering / Diploma · Min 60% · All Categories',
    description:
      'Sample technical education grant helping deserving students pursue engineering degrees or polytechnic diplomas without taking high-interest loans.',
    benefits: [
      '₹50,000 per year covering tuition, lab fees, and learning hardware',
      'Access to free peer mentorship workshops (demo feature)',
      'Supports up to 4 years of undergraduate technical study',
    ],
    documents: [
      'Class 12 / Qualifying Examination Mark Sheet',
      'College Admission / Fee Receipt',
      'Income Certificate (Family income under ₹8,00,000)',
      'Bank Account details linked with student ID',
    ],
    demoLinkLabel: 'Demo Portal — Pragati Technical Grant',
  },
  {
    id: 'sch-03',
    isDemo: true,
    name: 'Post-Matric SC Empowerment Scholarship',
    provider: 'Social Equity Education Cell',
    amount: 35000,
    amountDisplay: '₹35,000 / year',
    categories: ['SC'],
    incomeLimit: 250000,
    minPercentage: 50,
    courses: [
      'School (Class 9-12)',
      'Engineering / B.Tech',
      'Medical / MBBS',
      'Science / B.Sc',
      'Commerce / B.Com',
      'Arts / Humanities',
      'Polytechnic / Diploma',
      'Management / MBA',
      'Other',
    ],
    educationLevels: ['Class 11-12', 'Diploma', 'Undergraduate', 'Postgraduate'],
    lastDate: '2027-01-15',
    requiresExtraVerification: false,
    verificationNote: 'Valid SC caste certificate & income certificate required.',
    shortEligibility: 'SC Category · Class 11 to PG · Min 50%',
    description:
      'Sample post-matric scholarship created to support Scheduled Caste students across higher secondary, diploma, undergraduate, and postgraduate courses.',
    benefits: [
      'Tuition fee reimbursement up to ₹25,000 plus ₹10,000 study allowance',
      'Covers hostelers and day scholars across recognized institutions',
      'Applicable across all major academic streams',
    ],
    documents: [
      'Valid Caste Certificate (SC)',
      'Annual Family Income Certificate',
      'Previous Exam Mark Sheet',
      'Current Institution Bonafide Certificate',
    ],
    demoLinkLabel: 'Demo Portal — Post-Matric SC Scheme',
  },
  {
    id: 'sch-04',
    isDemo: true,
    name: 'Tribal Future Scholars Fellowship',
    provider: 'Adivasi Higher Learning Initiative',
    amount: 45000,
    amountDisplay: '₹45,000 / year',
    categories: ['ST'],
    incomeLimit: 300000,
    minPercentage: 50,
    courses: [
      'Engineering / B.Tech',
      'Medical / MBBS',
      'Science / B.Sc',
      'Commerce / B.Com',
      'Arts / Humanities',
      'Management / MBA',
    ],
    educationLevels: ['Undergraduate', 'Postgraduate'],
    lastDate: '2027-01-31',
    requiresExtraVerification: false,
    verificationNote: 'Valid ST certificate & college enrollment verification.',
    shortEligibility: 'ST Category · UG / PG · Min 50%',
    description:
      'Sample fellowship empowering Scheduled Tribe students enrolled in undergraduate or postgraduate degrees with tuition assistance and academic stipend.',
    benefits: [
      '₹45,000 annual grant for tuition, books, and hostel expenses',
      'One-time ₹5,000 academic stationery allowance (sample)',
      'Renewable across the full degree duration',
    ],
    documents: [
      'Valid ST Category Certificate',
      'Family Income Certificate',
      'University / College ID & Fee Receipt',
      'Last Qualifying Examination Mark Sheet',
    ],
    demoLinkLabel: 'Demo Portal — Tribal Future Scholars',
  },
  {
    id: 'sch-05',
    isDemo: true,
    name: 'OBC Higher Studies & Digital Aid Scheme',
    provider: 'Inclusive Youth Scholarship Board',
    amount: 30000,
    amountDisplay: '₹30,000 / year',
    categories: ['OBC'],
    incomeLimit: 450000,
    minPercentage: 60,
    courses: [
      'Engineering / B.Tech',
      'Science / B.Sc',
      'Commerce / B.Com',
      'Arts / Humanities',
      'Management / MBA',
    ],
    educationLevels: ['Undergraduate', 'Postgraduate'],
    lastDate: '2026-12-28',
    requiresExtraVerification: false,
    verificationNote: 'Non-Creamy Layer (NCL) OBC certificate required.',
    shortEligibility: 'OBC (NCL) · UG / PG · Min 60%',
    description:
      'Sample scholarship aimed at OBC students pursuing degree courses who require support for tuition fees, internet access, and study materials.',
    benefits: [
      '₹30,000 annual financial assistance',
      'Supports undergraduate and postgraduate learners across Arts, Science, Commerce, Engineering, and MBA',
    ],
    documents: [
      'OBC Non-Creamy Layer Certificate',
      'Income Certificate (up to ₹4,50,000)',
      'Academic Transcripts (minimum 60%)',
      'Institution Verification Form',
    ],
    demoLinkLabel: 'Demo Portal — OBC Higher Studies',
  },
  {
    id: 'sch-06',
    isDemo: true,
    name: 'EWS Healthcare & Life Sciences Scholarship',
    provider: 'CareMed Education Foundation',
    amount: 75000,
    amountDisplay: '₹75,000 / year',
    categories: ['EWS', 'General'],
    incomeLimit: 800000,
    minPercentage: 70,
    courses: ['Medical / MBBS', 'Science / B.Sc'],
    educationLevels: ['Undergraduate', 'Postgraduate'],
    lastDate: '2027-02-10',
    requiresExtraVerification: true,
    verificationNote:
      'Requires institutional verification & EWS/Income asset declaration check.',
    shortEligibility: 'EWS / General · Medical & Science · Min 70%',
    description:
      'Sample scholarship supporting high-achieving students from Economically Weaker Sections pursuing Medical or Life Science degrees.',
    benefits: [
      '₹75,000 yearly grant for clinical/laboratory books and tuition',
      'Priority support for first-year medical and science entrants',
    ],
    documents: [
      'EWS Certificate / Family Income & Asset Certificate',
      'Entrance or Qualifying Exam Scorecard (70%+)',
      'Medical / Science College Admission Proof',
      'Passport-size Photo & Bank Account Proof',
    ],
    demoLinkLabel: 'Demo Portal — EWS Healthcare Scholarship',
  },
  {
    id: 'sch-07',
    isDemo: true,
    name: 'State Rural Merit Bursary',
    provider: 'Gramin Shiksha Network',
    amount: 20000,
    amountDisplay: '₹20,000 / year',
    categories: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    incomeLimit: 200000,
    minPercentage: 65,
    courses: [
      'School (Class 9-12)',
      'Arts / Humanities',
      'Commerce / B.Com',
      'Science / B.Sc',
    ],
    educationLevels: ['Class 11-12', 'Undergraduate'],
    lastDate: '2026-12-15',
    requiresExtraVerification: true,
    verificationNote:
      'Requires state domicile & rural/semi-urban school verification.',
    shortEligibility: 'All Categories · Income ≤ ₹2L · Min 65%',
    description:
      'Sample bursary designed for meritorious students from low-income rural and semi-urban households continuing education beyond Class 10.',
    benefits: [
      '₹20,000 direct annual bursary for tuition and exam fees',
      'Book & transportation reimbursement component included',
    ],
    documents: [
      'State Domicile / Residence Certificate',
      'Income Certificate (Annual income ≤ ₹2,00,000)',
      'Previous Class Mark Sheet (65% or above)',
      'Head of Institution Verification Letter',
    ],
    demoLinkLabel: 'Demo Portal — State Rural Merit Bursary',
  },
  {
    id: 'sch-08',
    isDemo: true,
    name: 'Skill India Polytechnic & Diploma Stipend',
    provider: 'Vocational Progress Council',
    amount: 25000,
    amountDisplay: '₹25,000 / year',
    categories: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    incomeLimit: 500000,
    minPercentage: 50,
    courses: ['Polytechnic / Diploma', 'Other'],
    educationLevels: ['Diploma'],
    lastDate: '2027-02-28',
    requiresExtraVerification: false,
    verificationNote: 'Recognized polytechnic / ITI enrollment required.',
    shortEligibility: 'Diploma Students · Min 50% · All Categories',
    description:
      'Sample stipend supporting hands-on polytechnic and vocational diploma learners to cover workshop kits, exam fees, and tuition.',
    benefits: [
      '₹25,000 annual stipend paid in two semester installments',
      'Covers workshop safety gear and technical toolkit expenses',
    ],
    documents: [
      'Class 10 / 12 Mark Sheet',
      'Polytechnic / Diploma Admission Receipt',
      'Family Income Certificate',
      'Bank Account Details',
    ],
    demoLinkLabel: 'Demo Portal — Polytechnic Stipend',
  },
  {
    id: 'sch-09',
    isDemo: true,
    name: 'First-Gen STEM & Innovation Award',
    provider: 'Horizon Equal Opportunity Trust',
    amount: 60000,
    amountDisplay: '₹60,000 / year',
    categories: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    incomeLimit: 600000,
    minPercentage: 65,
    courses: ['Engineering / B.Tech', 'Science / B.Sc'],
    educationLevels: ['Undergraduate', 'Postgraduate'],
    lastDate: '2027-01-20',
    requiresExtraVerification: true,
    verificationNote:
      'Requires First-Generation College Learner self-declaration & mentor verification.',
    shortEligibility: 'Engineering / Science · Min 65% · Verification Needed',
    description:
      'Sample award created for first-generation college students pursuing STEM degrees from modest family income backgrounds.',
    benefits: [
      '₹60,000 annual scholarship towards tuition and project costs',
      'Certificate of recognition and career guidance resources',
    ],
    documents: [
      'First-Generation Learner Declaration Form',
      'Family Income Certificate (≤ ₹6,00,000)',
      'Academic Mark Sheets (65%+)',
      'College Bonafide & Fee Structure',
    ],
    demoLinkLabel: 'Demo Portal — First-Gen STEM Award',
  },
  {
    id: 'sch-10',
    isDemo: true,
    name: 'Postgraduate Research & Leadership Grant',
    provider: 'National PG Scholars Forum',
    amount: 80000,
    amountDisplay: '₹80,000 / year',
    categories: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    incomeLimit: 600000,
    minPercentage: 75,
    courses: [
      'Engineering / B.Tech',
      'Medical / MBBS',
      'Science / B.Sc',
      'Management / MBA',
      'Arts / Humanities',
      'Commerce / B.Com',
    ],
    educationLevels: ['Postgraduate'],
    lastDate: '2027-03-10',
    requiresExtraVerification: true,
    verificationNote:
      'Requires PG admission proof & Statement of Purpose verification.',
    shortEligibility: 'Postgraduate · Min 75% · Income ≤ ₹6L',
    description:
      'Sample merit-cum-means postgraduate scholarship enabling talented graduates from lower- and middle-income families to complete Master’s programs.',
    benefits: [
      '₹80,000 annual award for PG tuition, thesis work, and conference travel',
      'Open to all categories meeting academic and income criteria',
    ],
    documents: [
      'Undergraduate Degree Mark Sheet (75% or equivalent)',
      'Postgraduate Admission Confirmation',
      'Family Income Certificate',
      'Brief Statement of Purpose (500 words)',
    ],
    demoLinkLabel: 'Demo Portal — PG Research Grant',
  },
];
