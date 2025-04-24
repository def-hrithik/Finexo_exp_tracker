
import React, { useState } from 'react';
import { Bell, Calendar, Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DashboardHeader: React.FC = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  
  return (
    <header className="py-4 px-6 flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Finance</h1>
        <div className={`relative transition-all duration-300 ${searchFocused ? 'w-80' : 'w-60'}`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-10 transition-all duration-300 bg-secondary/60 focus:bg-white border-0 focus:ring-2 ring-primary/10"
            placeholder="Search expenses..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative transition-opacity duration-300 hover:bg-secondary">
          <Calendar className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="relative transition-opacity duration-300 hover:bg-secondary">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-expense-high rounded-full animate-pulse-subtle"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full overflow-hidden">
              <Avatar className="h-8 w-8 transition-transform duration-300 hover:scale-105">
                <AvatarImage src="https://i.pravatar.cc/150?img=13" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 animate-fade-in">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Menu className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
