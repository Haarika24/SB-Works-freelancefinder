import React, { useState } from 'react';
import { Menu, X, User, Bell, MessageSquare, LogOut } from 'lucide-react';
import Avatar from '../ui/Avatar';

interface NavbarProps {
  onNavItemClick: (view: string) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavItemClick, currentView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: 'Dashboard', view: 'dashboard' },
    { name: 'Skill Exchange', view: 'skill-exchange' },
    { name: 'Freelance', view: 'freelance' },
    { name: 'Messages', view: 'messages' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-indigo-600 font-bold text-xl">SkillSwap</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => onNavItemClick(item.view)}
                  className={`
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16
                    ${currentView === item.view 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                  `}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none ml-2">
              <MessageSquare size={20} />
            </button>
            <div className="ml-3 relative">
              <div>
                <button className="flex items-center text-sm rounded-full focus:outline-none">
                  <Avatar src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200" alt="User" size="sm" />
                </button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden ml-4">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 animate-fadeIn">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  onNavItemClick(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`
                  block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left
                  ${currentView === item.view
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}
                `}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200" alt="User" size="md" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Alex Designer</div>
                  <div className="text-sm font-medium text-gray-500">alexdesigner</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left">
                  <div className="flex items-center">
                    <User size={20} className="mr-2" />
                    Profile
                  </div>
                </button>
                <button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left">
                  <div className="flex items-center">
                    <LogOut size={20} className="mr-2" />
                    Sign out
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;