import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Code, 
  Clock, 
  Users, 
  Trophy, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronRight,
  X,
  Star,
  Calendar,
  Award,
  Sparkles
} from "lucide-react";

// Enhanced Navbar Component
function Navbar({ onFilterClick, searchQuery, onSearchChange }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-2xl border-b border-purple-500/30 shadow-2xl shadow-purple-500/10' 
        : 'bg-white/5 backdrop-blur-xl border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                HACKATHON
              </span>
              <div className="text-xs text-purple-300 -mt-1 font-medium">Platform</div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 group-focus-within:text-purple-300 transition-colors" />
              <input
                type="text"
                placeholder="Search for exciting problems..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-6 py-3 border border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 bg-white/10 backdrop-blur-lg text-white placeholder-purple-300/70 font-medium transition-all duration-300 hover:bg-white/15 focus:bg-white/20"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Enhanced Right Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onFilterClick}
              className="group flex items-center space-x-2 px-5 py-2.5 rounded-xl text-white/90 hover:text-white bg-white/10 hover:bg-purple-500/20 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <Filter className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium">Filters</span>
            </button>
            
            {/* Enhanced User Avatar */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 cursor-pointer border-2 border-white/20">
                <span className="text-white text-sm font-bold">U</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black/50"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Enhanced Filter Sidebar Component
function FilterSidebar({ isOpen, onClose, filters, onFilterChange }) {
  const [expandedSections, setExpandedSections] = useState({
    difficulty: true,
    domain: true,
    type: true,
    tags: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ title, items, filterKey, isExpanded, onToggle, icon }) => (
    <div className="border-b border-white/10 pb-6 mb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left text-base font-bold text-white hover:text-purple-300 transition-all duration-300 group mb-4"
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </div>
        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-purple-400" />
        </div>
      </button>
      {isExpanded && (
        <div className="space-y-3 animate-fadeIn">
          {items.map((item) => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
              <input
                type="checkbox"
                checked={filters[filterKey].includes(item)}
                onChange={(e) => {
                  const newFilters = { ...filters };
                  if (e.target.checked) {
                    newFilters[filterKey] = [...newFilters[filterKey], item];
                  } else {
                    newFilters[filterKey] = newFilters[filterKey].filter(f => f !== item);
                  }
                  onFilterChange(newFilters);
                }}
                className="w-5 h-5 rounded border-2 border-purple-400/50 bg-white/10 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
              />
              <span className="text-white/90 group-hover:text-white font-medium">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Enhanced Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Enhanced Sidebar */}
      <div className={`
        fixed top-0 right-0 h-screen w-96 bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-blue-900/95 backdrop-blur-2xl border-l border-purple-500/30 z-50
        transform transition-all duration-500 ease-out overflow-y-auto shadow-2xl shadow-purple-500/20
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-8">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Smart Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Enhanced Clear Filters */}
          <button
            onClick={() => onFilterChange({
              difficulty: [],
              domain: [],
              type: [],
              tags: []
            })}
            className="w-full mb-8 px-6 py-3 text-purple-300 border-2 border-purple-300/40 rounded-xl hover:bg-purple-500/20 hover:border-purple-300/60 transition-all duration-300 font-semibold backdrop-blur-sm"
          >
            ✨ Clear All Filters
          </button>

          {/* Enhanced Filter Sections */}
          <FilterSection
            title="Difficulty Level"
            items={["Easy", "Medium", "Hard"]}
            filterKey="difficulty"
            isExpanded={expandedSections.difficulty}
            onToggle={() => toggleSection('difficulty')}
            icon={<Award className="w-5 h-5 text-emerald-400" />}
          />

          <FilterSection
            title="Domain"
            items={["Fintech", "Healthcare", "Sustainability", "Blockchain", "Education"]}
            filterKey="domain"
            isExpanded={expandedSections.domain}
            onToggle={() => toggleSection('domain')}
            icon={<Star className="w-5 h-5 text-blue-400" />}
          />

          <FilterSection
            title="Problem Type"
            items={["Coding", "Idea Submission", "Prototype", "Presentation"]}
            filterKey="type"
            isExpanded={expandedSections.type}
            onToggle={() => toggleSection('type')}
            icon={<Trophy className="w-5 h-5 text-amber-400" />}
          />

          <FilterSection
            title="Tags"
            items={["ai", "machine-learning", "finance", "nlp", "iot", "healthcare", "real-time", "data-analytics"]}
            filterKey="tags"
            isExpanded={expandedSections.tags}
            onToggle={() => toggleSection('tags')}
            icon={<Sparkles className="w-5 h-5 text-pink-400" />}
          />
        </div>
      </div>
    </>
  );
}

// Enhanced Problem Card Component  
function ProblemCard({ problem, onClick }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-emerald-500/30 text-emerald-200 border-emerald-400/50 shadow-emerald-500/20';
      case 'medium': return 'bg-amber-500/30 text-amber-200 border-amber-400/50 shadow-amber-500/20';
      case 'hard': return 'bg-rose-500/30 text-rose-200 border-rose-400/50 shadow-rose-500/20';
      default: return 'bg-gray-500/30 text-gray-200 border-gray-400/50 shadow-gray-500/20';
    }
  };

  const getDomainColor = (domain) => {
    const colors = [
      'bg-purple-500/30 text-purple-200 border-purple-400/50 shadow-purple-500/20',
      'bg-blue-500/30 text-blue-200 border-blue-400/50 shadow-blue-500/20',
      'bg-indigo-500/30 text-indigo-200 border-indigo-400/50 shadow-indigo-500/20',
      'bg-pink-500/30 text-pink-200 border-pink-400/50 shadow-pink-500/20',
      'bg-cyan-500/30 text-cyan-200 border-cyan-400/50 shadow-cyan-500/20'
    ];
    const hash = domain?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0;
    return colors[hash % colors.length];
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Coding': return <Code className="w-4 h-4 text-blue-300" />;
      case 'Prototype': return <Users className="w-4 h-4 text-indigo-300" />;
      case 'Presentation': return <Trophy className="w-4 h-4 text-amber-300" />;
      default: return <Clock className="w-4 h-4 text-purple-300" />;
    }
  };

  const formatPrize = (rewards) => {
    if (!rewards || rewards.length === 0) return null;
    const topPrize = Math.max(...rewards.map(r => r.prizeAmount || 0));
    return topPrize > 0 ? `$${topPrize.toLocaleString()}` : null;
  };

  const getRandomImage = (domain) => {
    const domainImages = {
      'Fintech': 'https://albusi.com/wp-content/uploads/2023/07/Sponsorship-Pitch-Deck-template-1-scaled.webp',
      'Healthcare': 'https://images.wondershare.com/mockitt/hackathon/hackathon-scrum-tips.jpg',
      'Sustainability': 'https://technoresult.com/wp-content/uploads/2024/08/Basic-Linux-Commands.jpg',
      'Blockchain': 'https://adrosi.com/wp-content/uploads/2023/01/Top-Hackathon-Project-Ideas.jpg',
      'Education': 'https://tse1.mm.bing.net/th/id/OIP.9P3cGXGKbYQSuit8MSAY7AHaE7?r=0&w=680&h=453&rs=1&pid=ImgDetMain&o=7&rm=3',
      'default': 'https://www.shutterstock.com/image-vector/hackathon-icon-vector-illustration-brainstorm-260nw-2214617255.jpg'
    };
    return domainImages[domain] || domainImages['default'];
  };

  return (
    <div
      onClick={() => onClick(problem)}
      className="group relative bg-gradient-to-br from-purple-900/60 via-indigo-900/50 to-blue-900/60 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 cursor-pointer border border-white/20 hover:border-purple-400/60 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden"
    >
      {/* Enhanced Card Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getRandomImage(problem.domain)} 
          alt={problem.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        
        {/* Floating Prize Badge */}
        {formatPrize(problem.rewards) && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20">
            {formatPrize(problem.rewards)}
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Enhanced Card Content */}
      <div className="p-7">
        {/* Title and Type Icon */}
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300 line-clamp-2 flex-1 leading-tight">
            {problem.title}
          </h2>
          <div className="flex items-center space-x-2 ml-4">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              {getTypeIcon(problem.problemType)}
            </div>
          </div>
        </div>
        
        <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-3">
          {problem.description}
        </p>

        {/* Enhanced Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className={`px-4 py-2 rounded-full text-xs font-bold border shadow-lg transition-all duration-300 hover:scale-105 ${getDomainColor(problem.domain)}`}>
            {problem.domain}
          </span>
          <span className={`px-4 py-2 rounded-full text-xs font-bold border shadow-lg transition-all duration-300 hover:scale-105 ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
          <span className="px-4 py-2 rounded-full text-xs font-bold border bg-blue-500/30 text-blue-200 border-blue-400/50 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105">
            {problem.problemType}
          </span>
        </div>

        {/* Enhanced Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {problem.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white/10 text-white/90 rounded-lg text-xs font-semibold hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10"
              >
                #{tag}
              </span>
            ))}
            {problem.tags?.length > 3 && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 rounded-lg text-xs font-semibold border border-purple-400/30">
                +{problem.tags.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Stats and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-xs text-white/70">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="font-medium">{problem.totalSubmissions || 0} submissions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">Active</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50">
              <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-3xl"></div>
      <div className="absolute inset-0 rounded-3xl ring-2 ring-purple-500/0 group-hover:ring-purple-500/30 transition-all duration-500"></div>
    </div>
  );
}

// Enhanced Applied Filters Bar Component
function AppliedFiltersBar({ filters, setFilters }) {
  const hasFilters = filters.difficulty.length > 0 || filters.domain.length > 0 || filters.type.length > 0 || filters.tags.length > 0;
  
  if (!hasFilters) return null;

  return (
    <div className="bg-black/40 backdrop-blur-xl border-b border-purple-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-3">
          <span className="text-purple-300 font-semibold text-sm flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Active Filters:
          </span>
          {filters.difficulty.map(f => (
            <FilterTag key={f} label={`Difficulty: ${f}`} color="purple" onRemove={() => {
              const newFilters = { ...filters };
              newFilters.difficulty = newFilters.difficulty.filter(d => d !== f);
              setFilters(newFilters);
            }} />
          ))}
          {filters.domain.map(f => (
            <FilterTag key={f} label={`Domain: ${f}`} color="blue" onRemove={() => {
              const newFilters = { ...filters };
              newFilters.domain = newFilters.domain.filter(d => d !== f);
              setFilters(newFilters);
            }} />
          ))}
          {filters.type.map(f => (
            <FilterTag key={f} label={`Type: ${f}`} color="emerald" onRemove={() => {
              const newFilters = { ...filters };
              newFilters.type = newFilters.type.filter(d => d !== f);
              setFilters(newFilters);
            }} />
          ))}
          {filters.tags.map(f => (
            <FilterTag key={f} label={`#${f}`} color="pink" onRemove={() => {
              const newFilters = { ...filters };
              newFilters.tags = newFilters.tags.filter(d => d !== f);
              setFilters(newFilters);
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Filter Tag Component
function FilterTag({ label, color, onRemove }) {
  const colorClasses = {
    purple: 'bg-purple-500/20 text-purple-200 border-purple-400/50 hover:bg-purple-500/30',
    blue: 'bg-blue-500/20 text-blue-200 border-blue-400/50 hover:bg-blue-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/50 hover:bg-emerald-500/30',
    pink: 'bg-pink-500/20 text-pink-200 border-pink-400/50 hover:bg-pink-500/30'
  };

  return (
    <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center border transition-all duration-200 ${colorClasses[color]}`}>
      {label}
      <button 
        onClick={onRemove}
        className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

// Enhanced Hero Section Component
function HeroSection() {
  return (
    <div className="relative w-full h-[32rem] overflow-hidden">
      <img 
        src="https://wallpapercave.com/wp/wp10006729.jpg" 
        alt="Hackathon Background"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/95 via-indigo-900/50 to-blue-900/30"></div>
      
      {/* Hero Content Overlay */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-8">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Discover Amazing
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Hackathon Problems
            </span>
          </h1>
          <p className="text-xl text-purple-200 font-medium max-w-2xl mx-auto leading-relaxed">
            Challenge yourself with cutting-edge problems across domains. 
            Build solutions that matter and compete with the best minds globally.
          </p>
        </div>
      </div> */}
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </div>
  );
}

// Main Home Component
function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    difficulty: [],
    domain: [],
    type: [],
    tags: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/problems");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProblems(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClick = (problem) => {
    navigate(`/problems/${problem._id}`);
  };

  // Filter problems based on search and filters
  const filteredProblems = problems.filter(problem => {
    if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !problem.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }

    if (filters.difficulty.length > 0 && !filters.difficulty.includes(problem.difficulty)) {
      return false;
    }

    if (filters.domain.length > 0 && !filters.domain.includes(problem.domain)) {
      return false;
    }

    if (filters.type.length > 0 && !filters.type.includes(problem.problemType)) {
      return false;
    }

    if (filters.tags.length > 0 && !filters.tags.some(tag => problem.tags.includes(tag))) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/40 via-indigo-800/30 to-blue-800/40"></div>
        <div className="absolute top-20 left-20 w-[32rem] h-[32rem] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full animate-float opacity-60"
          style={{
            width: `${Math.random() * 12 + 4}px`,
            height: `${Math.random() * 12 + 4}px`,
            background: i % 5 === 0 ? 'rgba(147, 51, 234, 0.4)' : 
                       i % 5 === 1 ? 'rgba(56, 189, 248, 0.4)' :
                       i % 5 === 2 ? 'rgba(236, 72, 153, 0.4)' : 
                       i % 5 === 3 ? 'rgba(34, 197, 94, 0.4)' : 'rgba(251, 191, 36, 0.4)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 15}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
            filter: 'blur(1px)',
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)'
          }}
        ></div>
      ))}

      {/* Fixed Navbar */}
      <Navbar 
        onFilterClick={() => setSidebarOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Applied Filters Bar */}
      <div className="pt-16">
        <AppliedFiltersBar filters={filters} setFilters={setFilters} />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Filter Sidebar */}
      <FilterSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
      
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Enhanced Stats Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-8 bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 shadow-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{filteredProblems.length}</div>
                <div className="text-purple-300 text-sm font-medium">Problems Found</div>
              </div>
              <div className="h-8 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-300">Live</div>
                <div className="text-purple-300 text-sm font-medium">Competition</div>
              </div>
              <div className="h-8 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">24/7</div>
                <div className="text-purple-300 text-sm font-medium">Support</div>
              </div>
            </div>
          </div>

          {/* Enhanced Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative mb-8">
                <div className="w-20 h-20 border-4 border-purple-200/30 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animation-delay-150"></div>
                <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-l-pink-500 rounded-full animate-spin animation-delay-300"></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Loading Amazing Problems</h3>
                <p className="text-purple-200 animate-pulse">Discovering the best challenges for you...</p>
              </div>
            </div>
          )}

          {/* Enhanced Error State */}
          {error && (
            <div className="max-w-lg mx-auto">
              <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-l-4 border-red-500 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">Something went wrong!</h3>
                    <p className="text-red-100 mt-2 font-medium">{error.message}</p>
                    <button className="mt-4 px-4 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-colors duration-200 font-semibold">
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Content */}
          {!loading && !error && (
            <>
              {/* Enhanced Problems Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {filteredProblems.map((problem) => (
                  <ProblemCard
                    key={problem._id}
                    problem={problem}
                    onClick={handleClick}
                  />
                ))}
              </div>

              {/* Enhanced Empty State */}
              {filteredProblems.length === 0 && !loading && (
                <div className="text-center py-32">
                  <div className="relative mx-auto mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center mx-auto backdrop-blur-xl border border-white/20 shadow-2xl">
                      <Search className="w-16 h-16 text-purple-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                      <X className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">No Problems Found</h3>
                  <p className="text-purple-200 text-lg mb-8 max-w-md mx-auto">
                    We couldn't find any problems matching your criteria. Try adjusting your search or filters!
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({ difficulty: [], domain: [], type: [], tags: [] });
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 transform hover:scale-105"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Enhanced Global Styles */}
      <style jsx global>{`
        /* Enhanced scrollbar styles */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, rgba(147, 51, 234, 0.6), rgba(59, 130, 246, 0.6));
          border-radius: 6px;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, rgba(147, 51, 234, 0.8), rgba(59, 130, 246, 0.8));
        }

        ::-webkit-scrollbar-corner {
          background: rgba(0, 0, 0, 0.1);
        }

        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(147, 51, 234, 0.6) rgba(0, 0, 0, 0.1);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;