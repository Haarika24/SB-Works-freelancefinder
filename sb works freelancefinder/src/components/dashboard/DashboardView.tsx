import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { ArrowRight, TrendingUp, Users, Briefcase, Award } from 'lucide-react';
import { User, SkillExchange, Project } from '../../types';
import Button from '../ui/Button';

interface DashboardViewProps {
  currentUser: User;
  recentExchanges: SkillExchange[];
  recentProjects: Project[];
  onNavItemClick: (view: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  recentExchanges,
  recentProjects,
  onNavItemClick,
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg shadow-md py-6 px-8 text-white animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {currentUser.username}!</h1>
            <p className="mt-1">Your current SkillScore is <span className="font-bold">{currentUser.skillScore}</span></p>
          </div>
          <div className="hidden md:block">
            <Avatar 
              src={currentUser.profileImage} 
              alt={currentUser.username} 
              size="xl"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-fadeIn" hoverable>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">SkillScore</p>
              <p className="text-2xl font-bold">{currentUser.skillScore}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn" hoverable>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-teal-100 text-teal-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Exchanges</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn" hoverable>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn" hoverable>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold">$850</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Skill Exchanges */}
        <Card className="animate-fadeIn">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Recent Skill Exchanges</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavItemClick('skill-exchange')}
            >
              View all <ArrowRight size={16} className="ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExchanges.map((exchange) => (
                <div key={exchange.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{exchange.skillOffered.name} ↔ {exchange.skillWanted.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{exchange.description.substring(0, 60)}...</p>
                    </div>
                    <Badge 
                      variant={
                        exchange.status === 'open' ? 'primary' : 
                        exchange.status === 'in-progress' ? 'warning' : 'success'
                      }
                    >
                      {exchange.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="animate-fadeIn">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Recent Freelance Projects</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavItemClick('freelance')}
            >
              View all <ArrowRight size={16} className="ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{project.description.substring(0, 60)}...</p>
                      <div className="mt-2">
                        {project.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill.id} variant="secondary" className="mr-2">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          project.status === 'open' ? 'primary' : 
                          project.status === 'in-progress' ? 'warning' : 'success'
                        }
                      >
                        {project.status}
                      </Badge>
                      <p className="text-sm font-medium text-gray-900 mt-2">
                        ${project.budget.min} - ${project.budget.max}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;