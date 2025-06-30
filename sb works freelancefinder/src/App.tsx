import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import DashboardView from './components/dashboard/DashboardView';
import SkillExchangeView from './components/skill-exchange/SkillExchangeView';
import FreelanceView from './components/freelance/FreelanceView';
import MessagesView from './components/messages/MessagesView';
import { mockUsers, mockSkillExchanges, mockProjects } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Set the current user to the first user in the mock data
  const currentUser = mockUsers[0];

  const handleNavItemClick = (view: string) => {
    setCurrentView(view);
  };
  
  // Render the appropriate view based on the current view state
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView 
            currentUser={currentUser} 
            recentExchanges={mockSkillExchanges}
            recentProjects={mockProjects}
            onNavItemClick={handleNavItemClick}
          />
        );
      case 'skill-exchange':
        return <SkillExchangeView exchanges={mockSkillExchanges} users={mockUsers} />;
      case 'freelance':
        return <FreelanceView projects={mockProjects} users={mockUsers} />;
      case 'messages':
        return <MessagesView users={mockUsers} />;
      default:
        return <DashboardView 
          currentUser={currentUser}
          recentExchanges={mockSkillExchanges}
          recentProjects={mockProjects}
          onNavItemClick={handleNavItemClick}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavItemClick={handleNavItemClick} currentView={currentView} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderView()}
      </main>
    </div>
  );
}

export default App;