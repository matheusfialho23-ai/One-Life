import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Utensils, Dumbbell, User, Lock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();

  const isActive = (path: string) => location.pathname === path;
  const isExpired = user?.subscriptionStatus === 'expired';

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Início', locked: isExpired },
    { path: '/food', icon: Utensils, label: 'Comer', locked: isExpired },
    { path: '/workout', icon: Dumbbell, label: 'Treino', locked: false },
    { path: '/profile', icon: User, label: 'Perfil', locked: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 safe-area-bottom shadow-lg max-w-md mx-auto">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center space-y-1 relative ${
            isActive(item.path) ? 'text-brand-500' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <div className="relative">
            <item.icon size={24} strokeWidth={isActive(item.path) ? 2.5 : 2} />
            {item.locked && (
              <div className="absolute -top-1 -right-2 bg-gray-100 rounded-full p-0.5 border border-white">
                <Lock size={10} className="text-gray-500" />
              </div>
            )}
          </div>
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;