export interface User {
  id: string;
  username: string;
  profileImage?: string;
  bio: string;
  skillScore: number;
  skills: Skill[];
  location?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiencyLevel: ProficiencyLevel;
}

export enum SkillCategory {
  DESIGN = 'Design',
  DEVELOPMENT = 'Development',
  MARKETING = 'Marketing',
  WRITING = 'Writing',
  VIDEO = 'Video',
  MUSIC = 'Music',
  BUSINESS = 'Business',
  OTHER = 'Other',
}

export enum ProficiencyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert',
}

export interface SkillExchange {
  id: string;
  userId: string;
  skillOffered: Skill;
  skillWanted: Skill;
  description: string;
  duration: string;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  description: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  skills: Skill[];
  deadline?: Date;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: Date;
}

export interface Proposal {
  id: string;
  projectId: string;
  freelancerId: string;
  coverLetter: string;
  bid: {
    amount: number;
    currency: string;
  };
  estimatedDuration: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Review {
  id: string;
  reviewerId: string;
  receiverId: string;
  projectId?: string;
  skillExchangeId?: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}