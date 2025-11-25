import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, Category, ChatMessage } from '@/types';

interface FinanceStore {
  transactions: Transaction[];
  categories: Category[];
  chatMessages: ChatMessage[];
  
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Зарплата', icon: 'Wallet', color: '#22c55e', type: 'income' },
  { id: '2', name: 'Фриланс', icon: 'Laptop', color: '#3b82f6', type: 'income' },
  { id: '3', name: 'Инвестиции', icon: 'TrendingUp', color: '#8b5cf6', type: 'income' },
  { id: '4', name: 'Продукты', icon: 'ShoppingCart', color: '#f97316', type: 'expense' },
  { id: '5', name: 'Транспорт', icon: 'Car', color: '#ef4444', type: 'expense' },
  { id: '6', name: 'Развлечения', icon: 'Gamepad2', color: '#ec4899', type: 'expense' },
  { id: '7', name: 'Коммуналка', icon: 'Home', color: '#14b8a6', type: 'expense' },
  { id: '8', name: 'Здоровье', icon: 'Heart', color: '#f43f5e', type: 'expense' },
  { id: '9', name: 'Одежда', icon: 'Shirt', color: '#a855f7', type: 'expense' },
  { id: '10', name: 'Рестораны', icon: 'UtensilsCrossed', color: '#eab308', type: 'expense' },
];

export const useStore = create<FinanceStore>()(
  persist(
    (set) => ({
      transactions: [],
      categories: defaultCategories,
      chatMessages: [],

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { ...category, id: crypto.randomUUID() },
          ],
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      addChatMessage: (message) =>
        set((state) => ({
          chatMessages: [
            ...state.chatMessages,
            {
              ...message,
              id: crypto.randomUUID(),
              timestamp: new Date().toISOString(),
            },
          ],
        })),

      clearChat: () => set({ chatMessages: [] }),
    }),
    {
      name: 'finance-storage',
    }
  )
);
