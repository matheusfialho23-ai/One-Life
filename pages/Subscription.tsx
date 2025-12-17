import React, { useState } from 'react';
import { Check, Star, Lock, Crown, Calendar, ShieldCheck, ArrowRight, Dumbbell, ExternalLink } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Subscription: React.FC = () => {
  const { user, upgradeSubscription } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const isExpired = user.subscriptionStatus === 'expired';
  
  // Calculate remaining trial days
  const now = Date.now();
  const daysLeft = Math.max(0, Math.ceil((user.trialEndDate - now) / (1000 * 60 * 60 * 24)));

  const handleSubscribe = () => {
    setLoading(true);
    
    // Open Kiwify Payment Link
    window.open('https://pay.kiwify.com.br/8TRjR9z', '_blank');

    // Simulate Payment Success Callback for the App Experience
    // In a real app, this would be handled by a webhook or a return URL
    setTimeout(() => {
      upgradeSubscription('monthly_2990');
      setLoading(false);
      navigate('/');
    }, 5000); // 5 seconds delay to simulate user paying and returning
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center animate-fade-in pb-12">
      
      {/* Header Info */}
      <div className="text-center mb-8 max-w-xs">
        {isExpired ? (
           <div className="bg-red-100 text-red-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
             <Lock size={32} />
           </div>
        ) : (
           <div className="bg-brand-100 text-brand-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
             <Crown size={32} />
           </div>
        )}
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isExpired ? 'Versão Gratuita' : 'Plano Premium'}
        </h1>
        <p className="text-gray-500 text-sm">
          {isExpired 
            ? 'Seu teste acabou. Você ainda tem acesso aos Treinos, mas para usar a IA e a Dieta, assine o plano.' 
            : `Você ainda tem ${daysLeft} dias de teste gratuito restantes.`}
        </p>
      </div>

      {/* Plan Card */}
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-xl border-2 border-brand-500 overflow-hidden relative mb-6">
        <div className="bg-brand-500 text-white text-center py-2 text-xs font-bold uppercase tracking-wider">
          Recomendado
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
               <h3 className="font-bold text-xl text-gray-900">Mensal Flex</h3>
               <p className="text-sm text-gray-500">Acesso Total Liberado</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-brand-600">R$ 29,90</span>
              <span className="text-gray-400 text-xs block">/mês</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-center space-x-3 text-sm text-gray-700 font-bold">
              <div className="bg-green-100 p-1 rounded-full text-green-600"><Check size={12} /></div>
              <span>IA Scanner de Alimentos</span>
            </li>
            <li className="flex items-center space-x-3 text-sm text-gray-700 font-bold">
              <div className="bg-green-100 p-1 rounded-full text-green-600"><Check size={12} /></div>
              <span>Cardápios e Economia</span>
            </li>
            <li className="flex items-center space-x-3 text-sm text-gray-700 font-bold">
              <div className="bg-green-100 p-1 rounded-full text-green-600"><Check size={12} /></div>
              <span>Dashboard Financeiro</span>
            </li>
            <li className="flex items-center space-x-3 text-sm text-gray-500">
              <div className="bg-gray-100 p-1 rounded-full text-gray-400"><Check size={12} /></div>
              <span>Treinos em casa (Já incluso no Grátis)</span>
            </li>
          </ul>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-brand-200 flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Aguardando Pagamento...</span>
            ) : (
              <>
                <span>Assinar via Kiwify</span>
                <ExternalLink size={20} />
              </>
            )}
          </button>
          
          <div className="flex items-center justify-center mt-4 text-xs text-gray-400 space-x-1">
            <ShieldCheck size={12} />
            <span>Pagamento seguro externo</span>
          </div>
        </div>
      </div>

      {/* Free Tier Action */}
      <button 
        onClick={() => navigate('/workout')} 
        className="text-gray-500 text-sm font-medium hover:text-gray-800 flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {isExpired ? (
          <>
            <span>Ir para Treinos (Grátis)</span>
            <Dumbbell size={16} />
          </>
        ) : (
          <span>Continuar com Trial Grátis</span>
        )}
      </button>
    </div>
  );
};

export default Subscription;