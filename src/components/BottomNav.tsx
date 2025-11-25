'use client';

import { Button } from '@/components/ui/button';
import { LayoutDashboard, List, Bot } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
    { id: 'transactions', label: 'Транзакции', icon: List },
    { id: 'assistant', label: 'Ассистент', icon: Bot },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex-1 flex-col h-14 gap-1 rounded-none ${
              activeTab === item.id
                ? 'text-primary bg-primary/5'
                : 'text-muted-foreground'
            }`}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
