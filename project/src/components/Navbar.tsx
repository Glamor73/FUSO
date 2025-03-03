import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Calendar, BookOpen, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!user) return null;

  return (
    <nav className="bg-black text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">FUSO</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/dashboard" 
            className={`flex items-center space-x-1 ${location.pathname === '/dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Calendar size={18} />
            <span>Calendar</span>
          </Link>
          <Link 
            to="/subjects" 
            className={`flex items-center space-x-1 ${location.pathname === '/subjects' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <BookOpen size={18} />
            <span>Subjects</span>
          </Link>
          <button 
            onClick={() => signOut()} 
            className="flex items-center space-x-1 text-gray-400 hover:text-white"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-black z-10 py-4 px-6 shadow-md">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-1 ${location.pathname === '/dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={toggleMenu}
              >
                <Calendar size={18} />
                <span>Calendar</span>
              </Link>
              <Link 
                to="/subjects" 
                className={`flex items-center space-x-1 ${location.pathname === '/subjects' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={toggleMenu}
              >
                <BookOpen size={18} />
                <span>Subjects</span>
              </Link>
              <button 
                onClick={() => signOut()} 
                className="flex items-center space-x-1 text-gray-400 hover:text-white"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;