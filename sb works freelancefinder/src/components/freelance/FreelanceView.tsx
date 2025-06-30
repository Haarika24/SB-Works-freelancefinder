import React, { useState } from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { Search, Plus, Filter, Briefcase, Clock, DollarSign } from 'lucide-react';
import { Project, User, SkillCategory } from '../../types';
import Input from '../ui/Input';

interface FreelanceViewProps {
  projects: Project[];
  users: User[];
}

const FreelanceView: React.FC<FreelanceViewProps> = ({ projects, users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<SkillCategory | ''>('');

  const categories = Object.values(SkillCategory);

  // Filter projects based on search term and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory === '' || 
      project.skills.some(skill => skill.category === filterCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Get user data for each project
  const getUserForProject = (userId: string) => {
    return users.find(user => user.id === userId);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Freelance Projects</h1>
            <p className="text-gray-600 mt-1">Find projects and opportunities to showcase your skills</p>
          </div>
          <Button className="mt-4 md:mt-0 flex items-center">
            <Plus size={18} className="mr-2" />
            Post a Project
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as SkillCategory | '')}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center">
              <Filter size={18} className="mr-2" />
              More Filters
            </Button>
            
            <Button variant="outline" className="flex items-center">
              <Clock size={18} className="mr-2" />
              Recent
            </Button>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const client = getUserForProject(project.clientId);
          
          return (
            <Card key={project.id} className="animate-fadeIn h-full" hoverable>
              <CardHeader className="border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <Badge
                    variant={
                      project.status === 'open' ? 'primary' : 
                      project.status === 'in-progress' ? 'warning' : 'success'
                    }
                  >
                    {project.status}
                  </Badge>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-1">Posted:</span>
                    <span className="text-sm">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="py-5">
                <div className="flex items-center mb-4">
                  <Briefcase className="text-indigo-500 mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h2>
                </div>
                
                <p className="text-gray-700 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="text-green-500 mr-1" size={16} />
                    <span className="font-medium text-gray-900">
                      ${project.budget.min} - ${project.budget.max} {project.budget.currency}
                    </span>
                  </div>
                  
                  {project.deadline && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1" size={14} />
                      <span>
                        Due by: {new Date(project.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.skills.map((skill) => (
                    <Badge key={skill.id} variant="secondary">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  {client && (
                    <>
                      <Avatar src={client.profileImage} alt={client.username} size="sm" />
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">{client.username}</p>
                        <p className="text-xs text-gray-500">SkillScore: {client.skillScore}</p>
                      </div>
                    </>
                  )}
                </div>
                <Button size="sm">Submit Proposal</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FreelanceView;