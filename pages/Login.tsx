import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      if (name.toLowerCase() === 'admin') {
        navigate('/admin');
      } else {
        // Pass name to onboarding via navigation state
        navigate('/onboarding', { state: { name } });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 animate-fade-in relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[60%] bg-brand-500 rounded-b-[50%] z-0"></div>
      
      <div className="z-10 w-full max-w-sm flex flex-col items-center">
        <div className="bg-white p-4 rounded-3xl shadow-xl mb-8">
          <Leaf size={48} className="text-brand-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2 text-center">One Life Fit</h1>
        <p className="text-brand-100 mb-12 text-center">Sua jornada saudável começa agora.</p>

        <div className="bg-white w-full rounded-3xl p-8 shadow-2xl">
           <h2 className="text-xl font-bold text-gray-800 mb-6">Bem-vindo(a)</h2>
           
           <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-500 mb-1">Como devemos te chamar?</label>
               <input 
                 type="text" 
                 required
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder="Seu nome" 
                 className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-brand-500 transition-colors font-medium text-lg"
               />
               <p className="text-[10px] text-gray-300 mt-2 text-right">Admin access: "admin"</p>
             </div>

             <button 
               type="submit"
               className="w-full bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-200 flex items-center justify-center space-x-2 transition-all active:scale-95"
             >
               <span>Começar Jornada</span>
               <ArrowRight size={20} />
             </button>
           </form>
           
           <p className="mt-6 text-center text-xs text-gray-400">
             Ao continuar, você aceita nossos Termos de Uso e Política de Privacidade.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Login;