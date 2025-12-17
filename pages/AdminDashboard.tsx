import React from 'react';
import { Users, TrendingUp, DollarSign, Activity, LogOut, Crown, User, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USERS } from '../constants';
import { useApp } from '../contexts/AppContext';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useApp();

  // Metrics Logic
  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter(u => u.status !== 'inactive').length;
  const premiumUsers = MOCK_USERS.filter(u => u.status === 'premium').length;
  const monthlyRevenue = premiumUsers * 29.90; // Exemplo de preço R$ 29,90

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-2xl font-bold flex items-center gap-2">
             <Activity className="text-brand-500" />
             Painel do Dono
           </h1>
           <p className="text-gray-400 text-sm">Visão geral do sistema One Life Fit</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
           <div className="flex items-center gap-2 text-gray-400 text-xs uppercase mb-2">
             <Users size={14} />
             <span>Total Clientes</span>
           </div>
           <p className="text-2xl font-bold">{totalUsers}</p>
           <p className="text-xs text-green-400 flex items-center mt-1">
             <TrendingUp size={12} className="mr-1" /> +12% este mês
           </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
           <div className="flex items-center gap-2 text-gray-400 text-xs uppercase mb-2">
             <Crown size={14} className="text-yellow-500" />
             <span>Assinantes</span>
           </div>
           <p className="text-2xl font-bold">{premiumUsers}</p>
           <p className="text-xs text-gray-500 mt-1">Taxa conv: {(premiumUsers/totalUsers*100).toFixed(0)}%</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 col-span-2">
           <div className="flex items-center justify-between">
              <div>
                 <div className="flex items-center gap-2 text-gray-400 text-xs uppercase mb-2">
                   <DollarSign size={14} className="text-green-500" />
                   <span>Receita Mensal Est.</span>
                 </div>
                 <p className="text-3xl font-bold text-white">R$ {monthlyRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-full">
                <DollarSign size={24} className="text-green-500" />
              </div>
           </div>
        </div>
      </div>

      {/* User List */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold">Usuários Recentes</h2>
          <span className="text-xs text-brand-500 font-medium cursor-pointer">Ver todos</span>
        </div>

        <div className="space-y-3">
          {MOCK_USERS.map((user) => (
            <div key={user.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                    ${user.status === 'premium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-gray-700 text-gray-400'}
                 `}>
                   {user.name.charAt(0)}
                 </div>
                 <div>
                   <p className="font-bold text-sm text-white">{user.name}</p>
                   <p className="text-xs text-gray-400 flex items-center gap-1">
                     <Calendar size={10} /> Entrou: {new Date(user.joinDate).toLocaleDateString()}
                   </p>
                 </div>
               </div>
               
               <div className="text-right">
                 <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase
                   ${user.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                     user.status === 'premium' ? 'bg-yellow-500/10 text-yellow-500' : 
                     'bg-red-500/10 text-red-500'}
                 `}>
                   {user.status}
                 </span>
                 <p className="text-[10px] text-gray-500 mt-1">{user.lastLogin}</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-blue-900/20 p-4 rounded-xl border border-blue-900/50">
        <p className="text-xs text-blue-200 text-center">
          Este painel é uma simulação administrativa. Em um aplicativo real, os dados viriam de um banco de dados centralizado.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;