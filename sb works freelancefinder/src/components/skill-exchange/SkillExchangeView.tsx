import React, { useState } from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { Search, Plus, Clock, Filter, ArrowRightLeft } from 'lucide-react';
import { SkillExchange, User, SkillCategory } from '../../types';
import Input from '../ui/Input';

interface SkillExchangeViewProps {
  exchanges: SkillExchange[];
  users: User[];
}

const SkillExchangeView: React.FC<SkillExchangeViewProps> = ({ exchanges, users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<SkillCategory | ''>('');

  const categories = Object.values(SkillCategory);

  // Filter exchanges based on search term and category
  const filteredExchanges = exchanges.filter((exchange) => {
    const matchesSearch = searchTerm === '' || 
      exchange.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exchange.skillOffered.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exchange.skillWanted.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory === '' || 
      exchange.skillOffered.category === filterCategory ||
      exchange.skillWanted.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get user data for each exchange
  const getUserForExchange = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Skill Exchange</h1>
            <p className="text-gray-600 mt-1">Share your skills and learn from others</p>
          </div>
          <Button className="mt-4 md:mt-0 flex items-center">
            <Plus size={18} className="mr-2" />
            Create Exchange
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
              placeholder="Search exchanges..."
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

      {/* Exchange List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExchanges.map((exchange) => {
          const user = getUserForExchange(exchange.userId);
          
          return (
            <Card key={exchange.id} className="animate-fadeIn h-full" hoverable>
              <CardHeader className="border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <Badge
                    variant={
                      exchange.status === 'open' ? 'primary' : 
                      exchange.status === 'in-progress' ? 'warning' : 'success'
                    }
                  >
                    {exchange.status}
                  </Badge>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-1">Posted:</span>
                    <span className="text-sm">
                      {new Date(exchange.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="py-5">
                <div className="flex items-center mb-4">
                  <ArrowRightLeft className="text-indigo-500 mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">
                    {exchange.skillOffered.name} ↔ {exchange.skillWanted.name}
                  </h2>
                </div>
                
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {exchange.skillOffered.category}
                    </Badge>
                    <Badge variant="secondary" className="mb-2">
                      {exchange.skillWanted.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Will Teach</span>
                    <span className="text-gray-600">Want to Learn</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{exchange.description}</p>
                
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Duration:</span> {exchange.duration}
                </div>
              </CardContent>
              
              <CardFooter className="border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  {user && (
                    <>
                      <Avatar src={user.profileImage} alt={user.username} size="sm" />
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">{user.username}</p>
                        <p className="text-xs text-gray-500">SkillScore: {user.skillScore}</p>
                      </div>
                    </>
                  )}
                </div>
                <Button size="sm">Apply</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SkillExchangeView;