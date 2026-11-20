import { useEffect, useState } from 'react';
import Navbar, { type PageId } from './components/Navbar';
import HomePage from './components/HomePage';
import StudentRegistration from './components/StudentRegistration';
import ScholarshipFinder from './components/ScholarshipFinder';
import ScholarshipDetails from './components/ScholarshipDetails';
import MyApplications from './components/MyApplications';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import type {
  ApplicationStatusType,
  SavedApplication,
  Scholarship,
  StudentProfile,
} from './data/scholarships';
import {
  clearStudentProfile,
  loadApplications,
  loadStudentProfile,
  saveApplications,
  saveStudentProfile,
} from './utils/storage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedScholarship, setSelectedScholarship] =
    useState<Scholarship | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(
    () => loadStudentProfile()
  );
  const [applications, setApplications] = useState<SavedApplication[]>(() =>
    loadApplications()
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedScholarship]);

  const handleNavigate = (page: PageId) => {
    setSelectedScholarship(null);
    setCurrentPage(page);
  };

  const handleSelectScholarship = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setCurrentPage('details');
  };

  const handleSaveProfile = (profile: StudentProfile) => {
    saveStudentProfile(profile);
    setStudentProfile(profile);
  };

  const handleClearProfile = () => {
    clearStudentProfile();
    setStudentProfile(null);
  };

  const updateAndPersistApps = (nextApps: SavedApplication[]) => {
    setApplications(nextApps);
    saveApplications(nextApps);
  };

  const handleToggleSave = (scholarshipId: string) => {
    const exists = applications.some(
      (app) => app.scholarshipId === scholarshipId
    );
    if (exists) {
      updateAndPersistApps(
        applications.filter((app) => app.scholarshipId !== scholarshipId)
      );
    } else {
      updateAndPersistApps([
        ...applications,
        {
          scholarshipId,
          status: 'Interested',
          notes: '',
          updatedAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleSaveStatus = (
    scholarshipId: string,
    status: ApplicationStatusType
  ) => {
    const exists = applications.some(
      (app) => app.scholarshipId === scholarshipId
    );
    if (exists) {
      updateAndPersistApps(
        applications.map((app) =>
          app.scholarshipId === scholarshipId
            ? { ...app, status, updatedAt: new Date().toISOString() }
            : app
        )
      );
    } else {
      updateAndPersistApps([
        ...applications,
        {
          scholarshipId,
          status,
          notes: '',
          updatedAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleUpdateNotes = (scholarshipId: string, notes: string) => {
    updateAndPersistApps(
      applications.map((app) =>
        app.scholarshipId === scholarshipId
          ? { ...app, notes, updatedAt: new Date().toISOString() }
          : app
      )
    );
  };

  const handleRemoveApplication = (scholarshipId: string) => {
    updateAndPersistApps(
      applications.filter((app) => app.scholarshipId !== scholarshipId)
    );
  };

  const selectedSavedApp = selectedScholarship
    ? applications.find((a) => a.scholarshipId === selectedScholarship.id) ||
      null
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FD] text-slate-900">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        studentProfile={studentProfile}
        savedCount={applications.length}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectScholarship={handleSelectScholarship}
            studentProfile={studentProfile}
          />
        )}

        {currentPage === 'register' && (
          <StudentRegistration
            studentProfile={studentProfile}
            onSaveProfile={handleSaveProfile}
            onClearProfile={handleClearProfile}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'finder' && (
          <ScholarshipFinder
            studentProfile={studentProfile}
            applications={applications}
            onSelectScholarship={handleSelectScholarship}
            onToggleSave={handleToggleSave}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'details' && selectedScholarship && (
          <ScholarshipDetails
            scholarship={selectedScholarship}
            studentProfile={studentProfile}
            savedApplication={selectedSavedApp}
            onSaveStatus={handleSaveStatus}
            onRemoveSaved={handleRemoveApplication}
            onBack={() => handleNavigate('finder')}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'applications' && (
          <MyApplications
            applications={applications}
            studentProfile={studentProfile}
            onUpdateStatus={handleSaveStatus}
            onUpdateNotes={handleUpdateNotes}
            onRemoveApplication={handleRemoveApplication}
            onSelectScholarship={handleSelectScholarship}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && <AboutUs onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
