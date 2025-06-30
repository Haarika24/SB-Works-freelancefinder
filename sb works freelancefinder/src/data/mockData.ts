import { 
  User, 
  Skill, 
  SkillCategory, 
  ProficiencyLevel,
  SkillExchange,
  Project,
  Proposal,
  Review 
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'alexdesigner',
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    bio: 'UI/UX designer with a passion for creating intuitive interfaces',
    skillScore: 4.8,
    skills: [
      {
        id: '101',
        name: 'UI Design',
        category: SkillCategory.DESIGN,
        proficiencyLevel: ProficiencyLevel.EXPERT,
      },
      {
        id: '102',
        name: 'Figma',
        category: SkillCategory.DESIGN,
        proficiencyLevel: ProficiencyLevel.EXPERT,
      },
    ],
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    username: 'codingmaster',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    bio: 'Full-stack developer specializing in React and Node.js',
    skillScore: 4.5,
    skills: [
      {
        id: '201',
        name: 'React',
        category: SkillCategory.DEVELOPMENT,
        proficiencyLevel: ProficiencyLevel.EXPERT,
      },
      {
        id: '202',
        name: 'Node.js',
        category: SkillCategory.DEVELOPMENT,
        proficiencyLevel: ProficiencyLevel.ADVANCED,
      },
    ],
    location: 'New York, NY',
  },
  {
    id: '3',
    username: 'contentcreator',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    bio: 'Content writer and marketing specialist',
    skillScore: 4.2,
    skills: [
      {
        id: '301',
        name: 'Content Writing',
        category: SkillCategory.WRITING,
        proficiencyLevel: ProficiencyLevel.ADVANCED,
      },
      {
        id: '302',
        name: 'Social Media',
        category: SkillCategory.MARKETING,
        proficiencyLevel: ProficiencyLevel.INTERMEDIATE,
      },
    ],
    location: 'Chicago, IL',
  },
  {
    id: '4',
    username: 'musicproducer',
    profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
    bio: 'Music producer and sound engineer',
    skillScore: 4.7,
    skills: [
      {
        id: '401',
        name: 'Music Production',
        category: SkillCategory.MUSIC,
        proficiencyLevel: ProficiencyLevel.EXPERT,
      },
      {
        id: '402',
        name: 'Sound Engineering',
        category: SkillCategory.MUSIC,
        proficiencyLevel: ProficiencyLevel.ADVANCED,
      },
    ],
    location: 'Los Angeles, CA',
  },
];

// Mock Skill Exchanges
export const mockSkillExchanges: SkillExchange[] = [
  {
    id: '1',
    userId: '1',
    skillOffered: {
      id: '101',
      name: 'UI Design',
      category: SkillCategory.DESIGN,
      proficiencyLevel: ProficiencyLevel.EXPERT,
    },
    skillWanted: {
      id: '201',
      name: 'React',
      category: SkillCategory.DEVELOPMENT,
      proficiencyLevel: ProficiencyLevel.INTERMEDIATE,
    },
    description: 'I can design beautiful UI interfaces in exchange for help with React development',
    duration: '5 hours per week for 1 month',
    status: 'open',
    createdAt: new Date('2023-10-15'),
  },
  {
    id: '2',
    userId: '2',
    skillOffered: {
      id: '201',
      name: 'React',
      category: SkillCategory.DEVELOPMENT,
      proficiencyLevel: ProficiencyLevel.EXPERT,
    },
    skillWanted: {
      id: '301',
      name: 'Content Writing',
      category: SkillCategory.WRITING,
      proficiencyLevel: ProficiencyLevel.BEGINNER,
    },
    description: 'I can help with React development in exchange for content writing for my portfolio',
    duration: '3 hours per week for 2 weeks',
    status: 'open',
    createdAt: new Date('2023-10-20'),
  },
  {
    id: '3',
    userId: '3',
    skillOffered: {
      id: '301',
      name: 'Content Writing',
      category: SkillCategory.WRITING,
      proficiencyLevel: ProficiencyLevel.ADVANCED,
    },
    skillWanted: {
      id: '401',
      name: 'Music Production',
      category: SkillCategory.MUSIC,
      proficiencyLevel: ProficiencyLevel.BEGINNER,
    },
    description: 'I can write content for your website in exchange for basic music production lessons',
    duration: '2 hours per week for 1 month',
    status: 'in-progress',
    createdAt: new Date('2023-10-10'),
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Website Redesign',
    clientId: '3',
    description: 'Looking for a UI/UX designer to redesign our e-commerce website. Need someone with experience in creating intuitive shopping experiences.',
    budget: {
      min: 500,
      max: 1000,
      currency: 'USD',
    },
    skills: [
      {
        id: '101',
        name: 'UI Design',
        category: SkillCategory.DESIGN,
        proficiencyLevel: ProficiencyLevel.ADVANCED,
      },
      {
        id: '102',
        name: 'Figma',
        category: SkillCategory.DESIGN,
        proficiencyLevel: ProficiencyLevel.INTERMEDIATE,
      },
    ],
    deadline: new Date('2023-11-30'),
    status: 'open',
    createdAt: new Date('2023-10-15'),
  },
  {
    id: '2',
    title: 'React Native Mobile App',
    clientId: '1',
    description: 'Need a React Native developer to build a simple mobile app for event management. The app should allow users to create, join, and manage events.',
    budget: {
      min: 1000,
      max: 2000,
      currency: 'USD',
    },
    skills: [
      {
        id: '201',
        name: 'React',
        category: SkillCategory.DEVELOPMENT,
        proficiencyLevel: ProficiencyLevel.ADVANCED,
      },
      {
        id: '203',
        name: 'React Native',
        category: SkillCategory.DEVELOPMENT,
        proficiencyLevel: ProficiencyLevel.INTERMEDIATE,
      },
    ],
    deadline: new Date('2023-12-15'),
    status: 'open',
    createdAt: new Date('2023-10-20'),
  },
  {
    id: '3',
    title: 'Content Writing for Tech Blog',
    clientId: '2',
    description: 'Looking for a content writer to create technical blog posts about web development and programming. Topics will include React, Node.js, and modern web development practices.',
    budget: {
      min: 200,
      max: 500,
      currency: 'USD',
    },
    skills: [
      {
        id: '301',
        name: 'Content Writing',
        category: SkillCategory.WRITING,
        proficiencyLevel: ProficiencyLevel.INTERMEDIATE,
      },
      {
        id: '304',
        name: 'Technical Writing',
        category: SkillCategory.WRITING,
        proficiencyLevel: ProficiencyLevel.INTERMEDIATE,
      },
    ],
    deadline: new Date('2023-11-15'),
    status: 'in-progress',
    createdAt: new Date('2023-10-05'),
  },
];

// Mock Proposals
export const mockProposals: Proposal[] = [
  {
    id: '1',
    projectId: '1',
    freelancerId: '1',
    coverLetter: "I'm interested in redesigning your e-commerce website. With my experience in UI/UX design, I can create an intuitive shopping experience that will increase conversions.",
    bid: {
      amount: 800,
      currency: 'USD',
    },
    estimatedDuration: '2 weeks',
    status: 'pending',
    createdAt: new Date('2023-10-16'),
  },
  {
    id: '2',
    projectId: '2',
    freelancerId: '2',
    coverLetter: "I have extensive experience with React Native and would love to build your event management app. I've built similar apps in the past and can deliver a high-quality product.",
    bid: {
      amount: 1500,
      currency: 'USD',
    },
    estimatedDuration: '3 weeks',
    status: 'accepted',
    createdAt: new Date('2023-10-21'),
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    reviewerId: '3',
    receiverId: '1',
    projectId: '1',
    rating: 5,
    comment: 'Alex did an amazing job redesigning our website. The new design is intuitive and has increased our conversions significantly.',
    createdAt: new Date('2023-10-30'),
  },
  {
    id: '2',
    reviewerId: '1',
    receiverId: '2',
    skillExchangeId: '1',
    rating: 4,
    comment: 'Great to work with. Helped me understand React concepts and was patient with my questions.',
    createdAt: new Date('2023-10-25'),
  },
];