import { Project } from "../../types/types";
import { ArrowLeft, CreditCard, Shield, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ProjectCheckoutProps {
  project: Project;
  selectedArea: number;
  onBack: () => void;
  onSuccess: () => void;
}

export function ProjectCheckout({ project, selectedArea, onBack, onSuccess }: ProjectCheckoutProps) {
  const { t } = useTranslation('reserve');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit' | 'paypal' | null>(null);
  
  // Ensure selectedArea is a number and handle edge cases
  const area = typeof selectedArea === 'number' ? selectedArea : 0;
  const totalAmount = area * (project?.pricePerM2 || 0);
  const formattedAmount = isNaN(totalAmount) ? '0' : (totalAmount % 1 === 0 ? totalAmount.toFixed(0) : totalAmount.toFixed(2));
  const formattedArea = area.toLocaleString();

  // Debug logging
  console.log('ProjectCheckout props:', { 
    project, 
    selectedArea, 
    area, 
    totalAmount, 
    formattedAmount, 
    formattedArea,
    projectPrice: project?.pricePerM2,
    projectType: typeof project,
    projectKeys: project ? Object.keys(project) : 'no project'
  });
  
  // Additional debug logging for area flow
  console.log('Area flow debug:', {
    selectedAreaProp: selectedArea,
    calculatedArea: area,
    totalAmount,
    projectPrice: project?.pricePerM2
  });

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={onBack} 
          className="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 hover:border-gray-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Project Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          <div className="relative h-48 bg-gradient-to-br from-green-400 to-emerald-500">
            <img 
              src={project?.image || ''} 
              alt={t(`projects.${project?.id}`)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-2xl font-bold">{t(`projects.${project?.id}`)}</h1>
              <p className="text-green-100 font-medium">{project?.country || t('common.country')}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-700">{formattedArea}</div>
                <div className="text-sm text-green-600">Square Meters</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl">
                <div className="text-2xl font-bold text-emerald-700">€{project?.pricePerM2 ? (project.pricePerM2 % 1 === 0 ? project.pricePerM2.toFixed(0) : project.pricePerM2.toFixed(2)) : '0'}</div>
                <div className="text-sm text-emerald-600">Per m²</div>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between items-center py-2">
                <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                <span className="text-2xl font-bold text-green-700">€{formattedAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
          <div className="space-y-3">
            <div 
              onClick={() => setSelectedPaymentMethod('credit')}
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                selectedPaymentMethod === 'credit' 
                  ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <CreditCard className={`w-6 h-6 mr-3 ${
                selectedPaymentMethod === 'credit' ? 'text-green-600' : 'text-gray-600'
              }`} />
              <div className="flex-1">
                <div className="font-medium text-gray-800">Credit Card</div>
                <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
              </div>
              {selectedPaymentMethod === 'credit' && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>
            
            <div 
              onClick={() => setSelectedPaymentMethod('paypal')}
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                selectedPaymentMethod === 'paypal' 
                  ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <img src="/components/ReserveApp/assets/logos/financial/paypal-logo.png" alt="PayPal" className="w-6 h-6 object-contain" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">PayPal</div>
                <div className="text-sm text-gray-600">Pay with your PayPal account</div>
              </div>
              {selectedPaymentMethod === 'paypal' && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>
          </div>
        </div>

        {/* Security & Trust */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Secure Payment</h2>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Your payment information is encrypted and secure</p>
            <p>• We use industry-standard SSL encryption</p>
            <p>• Your contribution directly supports conservation efforts</p>
          </div>
        </div>

        {/* Complete Payment Button */}
        <div>
          <button 
            onClick={onSuccess}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
                          <span>Complete payment</span>
            <span className="text-green-200">€{formattedAmount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
