import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Settings, LogOut, Trash2, Crown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, resetData, logout } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  const isPremium = user.subscriptionStatus === 'active';
  const isTrial = user.subscriptionStatus === 'trial';
  
  const daysLeft = isTrial 
    ? Math.max(0, Math.ceil((user.trialEndDate - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
        <button onClick={logout} className="text-gray-400 hover:text-red-500">
          <LogOut size={24} />
        </button>
      </div>

      {/* User Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-2xl font-bold text-brand-600">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="font-bold text-xl text-gray-900">{user.name}</h2>
          <div className="flex items-center space-x-2 mt-1">
             {isPremium ? (
               <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-bold flex items-center">
                 <Crown size={12} className="mr-1" fill="currentColor" /> Premium
               </span>
             ) : (
               <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold flex items-center">
                 <Clock size={12} className="mr-1" /> Trial: {daysLeft} dias
               </span>
             )}
          </div>
        </div>
      </div>

      {/* Subscription Callout */}
      {!isPremium && (
        <div 
          onClick={() => navigate('/subscription')}
          className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-4 shadow-lg text-white cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-4 -mt-4"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="font-bold text-lg">Faça o Upgrade</p>
              <p className="text-brand-100 text-sm">Garanta seu acesso por R$ 29,90</p>
            </div>
            <div className="bg-white text-brand-600 p-2 rounded-lg font-bold text-sm">
              Assinar
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl text-center border border-gray-100">
          <p className="text-2xl font-bold text-gray-800">{user.currentWeight}</p>
          <p className="text-xs text-gray-400">Peso Atual</p>
        </div>
        <div className="bg-white p-4 rounded-xl text-center border border-gray-100">
           <p className="text-2xl font-bold text-gray-800">{user.goalWeight}</p>
           <p className="text-xs text-gray-400">Meta</p>
        </div>
        <div className="bg-white p-4 rounded-xl text-center border border-gray-100">
           <p className="text-2xl font-bold text-gray-800">{user.streak}</p>
           <p className="text-xs text-gray-400">Dias Seguidos</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div onClick={() => navigate('/subscription')} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
          <p className="font-medium">Gerenciar Assinatura</p>
          <span className="text-xs text-gray-400">{isPremium ? 'Ativo' : 'Teste Grátis'}</span>
        </div>
        <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
          <p className="font-medium">Notificações</p>
        </div>
        <div className="p-4 hover:bg-gray-50 cursor-pointer">
          <p className="font-medium">Alterar Metas</p>
        </div>
      </div>

      <button 
        onClick={() => {
          if(window.confirm('Tem certeza que deseja apagar todos os dados?')) {
            resetData();
            window.location.href = '/';
          }
        }}
        className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-medium flex items-center justify-center space-x-2"
      >
        <Trash2 size={20} />
        <span>Apagar Dados (Reset)</span>
      </button>
      
      <p className="text-center text-xs text-gray-300 pt-4">One Life Fit v1.2.0</p>
    </div>
  );
};

export default Profile;