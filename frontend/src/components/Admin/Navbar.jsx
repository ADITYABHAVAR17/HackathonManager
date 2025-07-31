import { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg">
      <div className="mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-xl hover:bg-slate-600/30 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-200">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>

          <div className="relative">
            <button 
              className="flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-600/30 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                A
              </div>
              <span className="font-medium text-slate-200">Admin</span>
              <svg 
                className={`w-4 h-4 text-slate-300 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <a 
                  href="#profile" 
                  className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-100/70 transition-colors duration-200"
                >
                  Profile
                </a>
                <a 
                  href="#settings" 
                  className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-100/70 transition-colors duration-200"
                >
                  Settings
                </a>
                <div className="border-t border-slate-200/80"></div>
                <a 
                  href="#logout" 
                  className="block px-4 py-3 text-sm text-red-600 hover:bg-slate-100/70 transition-colors duration-200"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;