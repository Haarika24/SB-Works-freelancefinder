import React, { useState } from 'react';
import Avatar from '../ui/Avatar';
import Card, { CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Send, Search } from 'lucide-react';
import { Message, User } from '../../types';
import Input from '../ui/Input';

interface MessagesViewProps {
  users: User[];
}

// Mock messages
const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    content: 'Hey, I saw your skill exchange post. I\'m interested in learning UI design from you. Can we discuss more?',
    read: true,
    createdAt: new Date('2023-10-21T10:30:00'),
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '2',
    content: 'Sure! I\'d be happy to teach you UI design. What specific areas are you interested in learning?',
    read: true,
    createdAt: new Date('2023-10-21T10:45:00'),
  },
  {
    id: '3',
    senderId: '2',
    receiverId: '1',
    content: 'I\'m primarily interested in learning about designing responsive interfaces and color theory. I\'m also curious about your workflow in Figma.',
    read: true,
    createdAt: new Date('2023-10-21T11:00:00'),
  },
  {
    id: '4',
    senderId: '1',
    receiverId: '2',
    content: 'That sounds great! I specialize in responsive design and I use Figma daily. I could definitely help you with those areas.',
    read: true,
    createdAt: new Date('2023-10-21T11:15:00'),
  },
  {
    id: '5',
    senderId: '3',
    receiverId: '1',
    content: 'Hi Alex, I\'m looking for someone to help design my portfolio website. Are you available for freelance work?',
    read: false,
    createdAt: new Date('2023-10-22T09:00:00'),
  },
];

const MessagesView: React.FC<MessagesViewProps> = ({ users }) => {
  const [activeContact, setActiveContact] = useState<string>(users[1].id);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Current user is assumed to be the first user in the array
  const currentUser = users[0];

  // Filter conversations
  const contacts = users.filter(user => user.id !== currentUser.id);
  const filteredContacts = contacts.filter(contact => 
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get messages for active conversation
  const conversationMessages = mockMessages.filter(
    message => 
      (message.senderId === currentUser.id && message.receiverId === activeContact) ||
      (message.receiverId === currentUser.id && message.senderId === activeContact)
  );

  // Get contact details
  const getContactDetails = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // For demo purposes, we're not actually sending messages
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-12rem)]">
      <div className="flex h-full">
        {/* Contacts sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 h-full overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search contacts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {filteredContacts.map(contact => {
              const lastMessage = mockMessages
                .filter(msg => 
                  (msg.senderId === contact.id && msg.receiverId === currentUser.id) ||
                  (msg.senderId === currentUser.id && msg.receiverId === contact.id)
                )
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
              
              const unreadCount = mockMessages.filter(
                msg => msg.senderId === contact.id && msg.receiverId === currentUser.id && !msg.read
              ).length;
              
              return (
                <div 
                  key={contact.id} 
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                    activeContact === contact.id ? 'bg-indigo-50' : ''
                  }`}
                  onClick={() => setActiveContact(contact.id)}
                >
                  <div className="flex items-center">
                    <Avatar src={contact.profileImage} alt={contact.username} size="md" />
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-900 truncate">{contact.username}</p>
                        {lastMessage && (
                          <p className="text-xs text-gray-500">
                            {new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        )}
                      </div>
                      {lastMessage && (
                        <p className="text-sm text-gray-500 truncate">
                          {lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                          {lastMessage.content}
                        </p>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <Badge variant="primary" size="sm" className="ml-2">
                        {unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Conversation area */}
        <div className="hidden md:flex md:w-2/3 lg:w-3/4 flex-col h-full">
          {activeContact ? (
            <>
              {/* Conversation header */}
              <div className="p-4 border-b border-gray-200 flex items-center">
                <Avatar 
                  src={getContactDetails(activeContact)?.profileImage} 
                  alt={getContactDetails(activeContact)?.username || ''} 
                  size="md" 
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">
                    {getContactDetails(activeContact)?.username}
                  </p>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-500">Online</span>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationMessages.map(message => {
                  const isCurrentUser = message.senderId === currentUser.id;
                  const sender = getContactDetails(message.senderId);
                  
                  return (
                    <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className="flex items-start max-w-[70%]">
                        {!isCurrentUser && (
                          <Avatar 
                            src={sender?.profileImage} 
                            alt={sender?.username || ''} 
                            size="sm" 
                            className="mt-1 mr-2"
                          />
                        )}
                        <div>
                          <Card className={`overflow-hidden ${isCurrentUser ? 'bg-indigo-500 text-white' : ''}`}>
                            <CardContent className="p-3">
                              <p className="text-sm">{message.content}</p>
                            </CardContent>
                          </Card>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(message.createdAt).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    className="ml-2 flex-shrink-0"
                    onClick={handleSendMessage}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center p-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500">
                  Choose a contact to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Empty state for mobile */}
        <div className="flex md:hidden w-full items-center justify-center">
          <div className="text-center p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select a conversation
            </h3>
            <p className="text-gray-500">
              Choose a contact to start messaging
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesView;