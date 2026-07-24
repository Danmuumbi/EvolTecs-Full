import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth';
import { apiClient } from '../../api/client';
import { 
  FiGlobe, 
  // FiClock, 
  FiCheckCircle, 
  FiAlertCircle,
  FiLoader,
  FiArrowLeft,
  FiSmartphone,
  FiLock,
  FiDollarSign
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export const DomainRenewal = () => {
  const { domainId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [domain, setDomain] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState('');
  // const [paymentId, setPaymentId] = useState('');
  const [, setPaymentId] = useState('');
  const [isPolling, setIsPolling] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'complete'>('details');
  
  // ✅ Get real prices from the domain
  // The original price is stored in the domain or we calculate it
  const getRenewalPrice = () => {
    // Get base price from domain or use default
    const basePrice = domain?.price || 1100; // Default if not set
    // ✅ Add 10% for renewal (no first-time discount)
    const renewalPrice = basePrice * 1.10;
    const taxAmount = renewalPrice * 0.16;
    const totalAmount = renewalPrice + taxAmount;
    return {
      basePrice,
      renewalPrice,
      taxAmount,
      totalAmount,
    };
  };

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: `/renew/${domainId}` } });
      return;
    }
    fetchDomainDetails();
  }, [domainId, user]);

  const fetchDomainDetails = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/domains/${domainId}`);
      setDomain(response.data.domain);
    } catch (error) {
      console.error('Failed to fetch domain:', error);
      toast.error('Failed to load domain details');
      navigate('/my-domains');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRenewal = async () => {
    try {
      setIsProcessing(true);
      const response = await apiClient.post('/domain-renewal/create', {
        domainId,
      });
      
      setOrder(response.data.order);
      setStep('payment');
      toast.success('Renewal order created!');
    } catch (error: any) {
      console.error('Failed to create renewal:', error);
      toast.error(error.response?.data?.message || 'Failed to create renewal');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!mpesaPhone) {
      toast.error('Please enter your M-Pesa phone number');
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await apiClient.post('/domain-renewal/payment', {
        orderId: order.id,
        phoneNumber: mpesaPhone,
      });

      setPaymentId(response.data.paymentId);
      toast.success('Payment initiated! Check your phone for the M-Pesa prompt.');

      setIsPolling(true);
      let attempts = 0;
      const maxAttempts = 30;

      const pollInterval = setInterval(async () => {
        attempts++;
        
        try {
          const statusResponse = await apiClient.get(`/payments/status/${response.data.paymentId}`);
          
          if (statusResponse.data.status === 'PAID') {
            clearInterval(pollInterval);
            setIsPolling(false);
            setIsProcessing(false);
            setStep('complete');
            toast.success('✅ Payment successful! Domain renewed.');
            setTimeout(() => {
              navigate('/my-domains');
            }, 3000);
          } else if (statusResponse.data.status === 'CANCELLED' || statusResponse.data.status === 'FAILED') {
            clearInterval(pollInterval);
            setIsPolling(false);
            setIsProcessing(false);
            toast.error('Payment was cancelled or failed. Please try again.');
          }
        } catch (error) {
          console.error('❌ Status check error:', error);
        }

        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          setIsPolling(false);
          setIsProcessing(false);
          toast('Payment is taking longer than expected. Please check your M-Pesa app.', {
            icon: '⚠️',
          });
        }
      }, 2000);

    } catch (error: any) {
      console.error('❌ Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading domain details...</p>
        </div>
      </div>
    );
  }

  if (!domain) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-400">Domain not found</p>
          <button
            onClick={() => navigate('/my-domains')}
            className="mt-4 btn-primary inline-flex items-center gap-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Domains
          </button>
        </div>
      </div>
    );
  }

  // ✅ Calculate real prices
  const prices = getRenewalPrice();
  const isExpired = domain.status === 'EXPIRED';
  const daysUntilExpiry = domain.expiryDate ? 
    Math.ceil((new Date(domain.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 
    0;

  return (
    <div className="min-h-screen pt-20 bg-[#0a0a0a]">
      <div className="container-custom py-8">
        <button
          onClick={() => navigate('/my-domains')}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 mb-6"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Domains
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 border border-white/5">
            {step === 'details' && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiGlobe className="w-10 h-10 text-accent-400" />
                  </div>
                  <h1 className="text-3xl font-bold text-white">
                    {isExpired ? 'Renew Expired Domain' : 'Renew Domain'}
                  </h1>
                  <p className="text-gray-400 mt-2">
                    {isExpired 
                      ? 'Your domain has expired. Renew now to keep it!'
                      : 'Extend your domain registration for another year'}
                  </p>
                </div>

                <div className="glass-effect rounded-xl p-6 border border-white/5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Domain</span>
                    <span className="text-white font-medium">{domain.domainName}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Current Expiry</span>
                    <span className="text-white">{new Date(domain.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isExpired 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {domain.status}
                    </span>
                  </div>
                  {!isExpired && (
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400">Days Until Expiry</span>
                      <span className={`font-medium ${daysUntilExpiry <= 7 ? 'text-red-400' : 'text-white'}`}>
                        {daysUntilExpiry} days
                      </span>
                    </div>
                  )}
                  {isExpired && (
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400">Grace Period</span>
                      <span className="text-yellow-400 font-medium">5 days remaining</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Original Price</span>
                      <span className="text-white line-through opacity-50">KSH {prices.basePrice.toFixed(0)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-400">Renewal Price</span>
                      <span className="text-accent-400 font-medium">KSH {prices.renewalPrice.toFixed(0)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-400">VAT (16%)</span>
                      <span className="text-gray-300">KSH {prices.taxAmount.toFixed(0)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold text-accent-400">KSH {prices.totalAmount.toFixed(0)}</span>
                    </div>
                    {isExpired && (
                      <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-xs text-red-400 flex items-center gap-2">
                          <FiAlertCircle className="w-4 h-4" />
                          ⚠️ Your domain has expired. Renew now to avoid losing it!
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleCreateRenewal}
                  disabled={isProcessing}
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Creating Order...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="w-5 h-5" />
                      Proceed to Payment - KSH {prices.totalAmount.toFixed(0)}
                    </>
                  )}
                </button>
              </>
            )}

            {step === 'payment' && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiSmartphone className="w-10 h-10 text-green-400" />
                  </div>
                  <h1 className="text-3xl font-bold text-white">Complete Payment</h1>
                  <p className="text-gray-400 mt-2">Pay via M-Pesa to renew your domain</p>
                </div>

                <div className="glass-effect rounded-xl p-6 border border-white/5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Domain</span>
                    <span className="text-white font-medium">{domain.domainName}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Renewal Price</span>
                    <span className="text-white">KSH {prices.renewalPrice.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">VAT (16%)</span>
                    <span className="text-white">KSH {prices.taxAmount.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-gray-400">Total Amount</span>
                    <span className="text-2xl font-bold text-accent-400">KSH {prices.totalAmount.toFixed(0)}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    M-Pesa Phone Number *
                  </label>
                  <div className="relative">
                    <FiSmartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="tel"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="+254 700 000 000"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    You will receive a prompt on your phone to complete the payment
                  </p>
                </div>

                {isPolling && (
                  <div className="glass-effect rounded-xl p-4 border border-yellow-500/20 bg-yellow-500/5 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-yellow-400/30 border-t-yellow-400 animate-spin"></div>
                      <div>
                        <p className="text-sm text-yellow-400 font-medium">Waiting for payment confirmation...</p>
                        <p className="text-xs text-gray-400">Please check your phone for the M-Pesa prompt</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      {isPolling ? 'Waiting for payment...' : 'Processing...'}
                    </>
                  ) : (
                    <>
                      <FiLock className="w-5 h-5" />
                      Pay Now - KSH {prices.totalAmount.toFixed(0)}
                    </>
                  )}
                </button>
              </>
            )}

            {step === 'complete' && (
              <div className="text-center">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Renewal Complete! 🎉</h1>
                <p className="text-gray-400 mb-2">
                  Your domain <strong className="text-white">{domain.domainName}</strong> has been renewed successfully.
                </p>
                <p className="text-sm text-gray-500">
                  New expiry date: <span className="text-white">
                    {new Date(new Date(domain.expiryDate).getTime() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/my-domains')}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <FiGlobe className="w-4 h-4" />
                    View My Domains
                  </button>
                  <button
                    onClick={() => navigate('/invoices')}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <FiDollarSign className="w-4 h-4" />
                    View Invoice
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};