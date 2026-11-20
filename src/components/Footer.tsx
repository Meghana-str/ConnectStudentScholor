import type { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#081C36] text-slate-300 mt-16 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">ScholarConnect</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            Helping students from economically weaker backgrounds discover
            scholarships, check criteria eligibility, and track applications.
          </p>
          <p className="text-xs text-sky-300">
            Hackathon Prototype · Sample Scholarship Data
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-white hover:underline cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('finder')}
                className="hover:text-white hover:underline cursor-pointer"
              >
                Find Scholarships
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('applications')}
                className="hover:text-white hover:underline cursor-pointer"
              >
                My Applications
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="hover:text-white hover:underline cursor-pointer"
              >
                Student Registration
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="hover:text-white hover:underline cursor-pointer"
              >
                About Us
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-3">
            Contact Information (Placeholder)
          </h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Email: support@scholarconnect-demo.org</li>
            <li>Helpline: +91-0000-000-000 (Placeholder)</li>
            <li>Office: Student Support Desk, New Delhi, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400 px-5">
        © {new Date().getFullYear()} ScholarConnect. All scholarship entries are
        sample demo data for educational demonstration.
      </div>
    </footer>
  );
}
