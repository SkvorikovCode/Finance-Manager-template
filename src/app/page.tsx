'use client';

import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { TransactionList } from '@/components/TransactionList';
import { TransactionForm } from '@/components/TransactionForm';
import { AIChat } from '@/components/AIChat';
import { BottomNav } from '@/components/BottomNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, LayoutDashboard, List, Bot } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">ФинМенеджер</h1>
          </div>
          <TransactionForm />
        </div>
      </header>

      {/* Desktop Layout */}
      <main className="container mx-auto px-4 py-4 pb-20 md:pb-4">
        {/* Desktop Tabs */}
        <div className="hidden md:block">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Дашборд
              </TabsTrigger>
              <TabsTrigger value="transactions" className="gap-2">
                <List className="h-4 w-4" />
                Транзакции
              </TabsTrigger>
              <TabsTrigger value="assistant" className="gap-2">
                <Bot className="h-4 w-4" />
                ИИ Ассистент
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>

            <TabsContent value="transactions">
              <TransactionList />
            </TabsContent>

            <TabsContent value="assistant">
              <div className="max-w-2xl mx-auto">
                <AIChat />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Content */}
        <div className="md:hidden">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'transactions' && <TransactionList />}
          {activeTab === 'assistant' && <AIChat />}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
