import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext/CartProvider';
import { useAuth } from '../../context/AuthContext/useAuth';
import { apiClient } from '../../api/client';
import { 
  FiArrowLeft, 
  FiShoppingCart, 
  FiCreditCard, 
  FiSmartphone,
  FiCheckCircle,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiLoader,
  FiShield,
  FiLock,
  FiUser,
  FiLogIn,
  FiFileText,
  // FiDownload,
  FiPrinter,
  // FiAlertCircle,
  FiX,
  FiTrendingUp,
  FiCalendar,
  FiEye
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export const Checkout = () => {
  const { 
    items, 
    // totalItems, 
    // totalPrice, 
    clearCart, 
    removeItem, 
    updateQuantity,
    updateItemPeriod 
  } = useCart();
  
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'login' | 'cart' | 'details' | 'payment' | 'complete'>('login');
  const [orderNumber, setOrderNumber] = useState('');
  // const [paymentId, setPaymentId] = useState('');
  const [, setPaymentId] = useState('');
  const [isPolling, setIsPolling] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  
  // Tax rate (16% VAT)
  const TAX_RATE = 0.16;
  
  
  // Calculate item total with period discounts
  const calculateItemTotal = (item: any) => {
    if (item.type === 'domain') {
      const years = item.period || 1;
      const basePrice = item.price;
      let discount = 0;
      
      if (years >= 3) discount = 0.10;
      else if (years >= 2) discount = 0.05;
      
      const discountedPrice = basePrice * (1 - discount);
      return discountedPrice * years;
    }
    return item.price * item.quantity;
  };

  // Calculate tax and total
  const subtotal = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const taxAmount = subtotal * TAX_RATE;
  const grandTotal = subtotal + taxAmount;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Kenya',
    notes: ''
  });

  // Generate a proforma invoice number
  const proformaNumber = `PROF-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  // Check if user is logged in
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        setFormData({
          ...formData,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
        });
        setStep('cart');
      } else {
        setStep('login');
      }
    }
  }, [user, authLoading]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && step !== 'complete' && step !== 'login') {
      navigate('/services');
    }
  }, [items, navigate, step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setStep('details');
  };

  const handleProceedToPayment = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('payment');
  };

  const handlePayment = async () => {
    if (!mpesaPhone) {
      toast.error('Please enter your M-Pesa phone number');
      return;
    }

    setIsProcessing(true);
    
    try {
      const orderData = {
        items: items.map(item => ({
          type: item.type,
          name: item.name,
          price: item.type === 'domain' ? item.price : item.price,
          quantity: item.type === 'domain' ? 1 : item.quantity,
          period: item.type === 'domain' ? (item.period || 1) : undefined,
        })),
        subtotal: subtotal,
        taxAmount: taxAmount,
        totalAmount: grandTotal,
        billingDetails: formData,
      };

      console.log('📦 Creating order...', orderData);
      
      const orderResponse = await apiClient.post('/orders/create', orderData);
      const order = orderResponse.data.order;
      console.log('✅ Order created:', order);

      console.log('💰 Initiating M-Pesa payment...');
      const paymentResponse = await apiClient.post('/payments/initiate', {
        orderId: order.id,
        phoneNumber: mpesaPhone,
      });

      console.log('✅ Payment initiated:', paymentResponse.data);
      setPaymentId(paymentResponse.data.paymentId);

      toast.success('Payment initiated! Check your phone for the M-Pesa prompt.');

      setIsPolling(true);
      let attempts = 0;
      const maxAttempts = 30;

      const pollInterval = setInterval(async () => {
        attempts++;
        console.log(`⏳ Polling payment status (${attempts}/${maxAttempts})...`);

        try {
          const statusResponse = await apiClient.get(`/payments/status/${paymentResponse.data.paymentId}`);
          
          if (statusResponse.data.status === 'PAID') {
            clearInterval(pollInterval);
            setIsPolling(false);
            setIsProcessing(false);
            
            const orderNum = `EVT-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
            setOrderNumber(orderNum);
            
            setStep('complete');
            toast.success('Payment successful! 🎉');
            
            setTimeout(() => {
              clearCart();
            }, 1000);
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

  const handleLoginRedirect = () => {
    navigate('/login', { state: { from: '/checkout' } });
  };

  const handleRegisterRedirect = () => {
    navigate('/register', { state: { from: '/checkout' } });
  };

  const handleBackToCart = () => setStep('cart');
  const handleBackToDetails = () => setStep('details');

  // ========================================
  // PROFESSIONAL PRINT FUNCTION
  // ========================================
  const handlePrintInvoice = () => {
    const invoiceElement = document.getElementById('invoice-preview');
    
    if (!invoiceElement) {
      toast.error('Invoice not found. Please try again.');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      toast.error('Please allow popups to print the invoice.');
      return;
    }

    // Get the invoice content as HTML
    const contentHTML = invoiceElement.innerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Proforma Invoice - EvolTechs</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background: #f5f7fa;
            padding: 40px;
            color: #1a1a2e;
          }
          .invoice-wrapper {
            max-width: 850px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            padding: 50px 55px;
          }
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-bottom: 25px;
            border-bottom: 3px solid #1a237e;
            margin-bottom: 30px;
          }
          .brand h1 {
            font-size: 32px;
            font-weight: 800;
            color: #1a237e;
            margin: 0;
            letter-spacing: -1px;
          }
          .brand h1 span { color: #00bcd4; }
          .brand p {
            color: #6b7280;
            font-size: 13px;
            margin-top: 2px;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .brand .address {
            color: #9ca3af;
            font-size: 12px;
            margin-top: 4px;
            text-transform: none;
            letter-spacing: 0;
          }
          .invoice-title { text-align: right; }
          .invoice-title h2 {
            font-size: 26px;
            font-weight: 700;
            color: #1a237e;
            margin: 0;
            letter-spacing: 1px;
          }
          .invoice-title .invoice-number {
            font-size: 18px;
            font-weight: 600;
            color: #1a237e;
            background: #e8edf5;
            padding: 4px 16px;
            border-radius: 6px;
            display: inline-block;
            margin-top: 4px;
          }
          .invoice-title .date {
            color: #6b7280;
            font-size: 13px;
            margin-top: 6px;
          }
          .invoice-title .proforma-note {
            color: #f59e0b;
            font-size: 12px;
            font-weight: 600;
            margin-top: 8px;
            background: #fef3c7;
            padding: 4px 12px;
            border-radius: 4px;
            display: inline-block;
          }
          .customer-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            background: #f8fafc;
            border-radius: 10px;
            padding: 20px 25px;
            margin-bottom: 30px;
          }
          .customer-section .label {
            font-size: 11px;
            font-weight: 600;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          .customer-section .value {
            font-size: 15px;
            font-weight: 500;
            color: #1a1a2e;
          }
          .customer-section .value-small {
            font-size: 13px;
            color: #4b5563;
            margin-top: 2px;
          }
          .customer-section .payment-method { text-align: right; }
          .customer-section .payment-method .method-badge {
            background: #dbeafe;
            color: #1a237e;
            padding: 4px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            display: inline-block;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0 20px 0;
          }
          .items-table thead th {
            background: #f1f4f9;
            color: #1a1a2e;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 12px 16px;
            text-align: left;
            border-bottom: 2px solid #e5e7eb;
          }
          .items-table thead th:last-child,
          .items-table tbody td:last-child { text-align: right; }
          .items-table thead th:nth-child(2),
          .items-table tbody td:nth-child(2) { text-align: center; }
          .items-table thead th:nth-child(3),
          .items-table tbody td:nth-child(3) { text-align: right; }
          .items-table tbody td {
            padding: 14px 16px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 14px;
            color: #1a1a2e;
          }
          .items-table tbody tr:last-child td { border-bottom: none; }
          .items-table tbody .item-name { font-weight: 500; }
          .items-table tbody .item-detail {
            font-size: 12px;
            color: #9ca3af;
            font-weight: 400;
            display: block;
          }
          .totals-section {
            border-top: 2px solid #e5e7eb;
            padding-top: 20px;
            margin-top: 10px;
          }
          .totals-row {
            display: flex;
            justify-content: flex-end;
            padding: 6px 0;
          }
          .totals-row .label {
            width: 150px;
            font-size: 14px;
            color: #6b7280;
            text-align: right;
            padding-right: 20px;
          }
          .totals-row .value {
            width: 120px;
            font-size: 14px;
            font-weight: 500;
            color: #1a1a2e;
            text-align: right;
          }
          .totals-row.grand-total {
            border-top: 2px solid #1a237e;
            padding-top: 14px;
            margin-top: 6px;
          }
          .totals-row.grand-total .label {
            font-size: 18px;
            font-weight: 700;
            color: #1a1a2e;
          }
          .totals-row.grand-total .value {
            font-size: 22px;
            font-weight: 800;
            color: #1a237e;
          }
          .footer-section {
            margin-top: 40px;
            padding-top: 25px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          }
          .footer-section .thank-you {
            font-size: 16px;
            font-weight: 600;
            color: #1a1a2e;
            margin-bottom: 4px;
          }
          .footer-section .contact-info {
            font-size: 13px;
            color: #6b7280;
          }
          .footer-section .copyright {
            font-size: 11px;
            color: #9ca3af;
            margin-top: 6px;
          }
          @media print {
            body { background: white; padding: 20px; }
            .invoice-wrapper { box-shadow: none; padding: 30px; }
            .customer-section { background: #f8fafc; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .items-table thead th { background: #f1f4f9; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .invoice-title .proforma-note { background: #fef3c7; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .customer-section .payment-method .method-badge { background: #dbeafe; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
          @media (max-width: 640px) {
            .invoice-wrapper { padding: 20px; }
            .invoice-header { flex-direction: column; gap: 15px; }
            .invoice-title { text-align: left; }
            .customer-section { grid-template-columns: 1fr; }
            .customer-section .payment-method { text-align: left; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-wrapper">
          ${contentHTML}
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = function() {
      setTimeout(function() {
        printWindow.print();
      }, 500);
    };
  };

  const toggleInvoicePreview = () => {
    setShowInvoicePreview(!showInvoicePreview);
  };

  // ========================================
  // INVOICE CONTENT COMPONENT - Professional Design
  // ========================================
  const InvoiceContent = ({ isProforma = true, invoiceNumber = '' }) => {
    // const label = isProforma ? 'Proforma #' : 'Invoice #';
    
    return (
      <div>
        {/* Header */}
        <div className="invoice-header">
          <div className="brand">
            <h1>Evol<span>Tech</span></h1>
            <p>Digital Solutions</p>
            <p className="address">123 Tech Street, Nairobi, Kenya</p>
          </div>
          <div className="invoice-title">
            <h2>{isProforma ? 'PROFORMA' : 'INVOICE'}</h2>
            <div className="invoice-number">{invoiceNumber}</div>
            <div className="date">Date: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</div>
            {isProforma && (
              <div className="proforma-note">⚠️ Proforma Invoice - Payment Required</div>
            )}
          </div>
        </div>

        {/* Customer Section */}
        <div className="customer-section">
          <div>
            <div className="label">Bill To:</div>
            <div className="value">{formData.firstName} {formData.lastName}</div>
            <div className="value-small">{formData.email}</div>
            <div className="value-small">{formData.phone}</div>
            {formData.address && (
              <div className="value-small">{formData.address}</div>
            )}
          </div>
          <div className="payment-method">
            <div className="label">Payment Method</div>
            <div className="value">M-Pesa</div>
            <div className="method-badge">Paybill: 174379</div>
          </div>
        </div>

        {/* Items Table */}
        <table className="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className="item-name">{item.name}</span>
                  {item.type === 'domain' && (
                    <span className="item-detail">
                      {item.period || 1} year{item.period && item.period > 1 ? 's' : ''} registration
                      {item.period && item.period >= 3 ? ' (10% off)' : item.period && item.period >= 2 ? ' (5% off)' : ''}
                    </span>
                  )}
                </td>
                <td>{item.type === 'domain' ? 1 : item.quantity}</td>
                <td>KSH {item.type === 'domain' ? item.price : item.price}</td>
                <td>KSH {calculateItemTotal(item).toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="totals-section">
          <div className="totals-row">
            <span className="label">Subtotal</span>
            <span className="value">KSH {subtotal.toFixed(0)}</span>
          </div>
          <div className="totals-row">
            <span className="label">VAT (16%)</span>
            <span className="value">KSH {taxAmount.toFixed(0)}</span>
          </div>
          <div className="totals-row grand-total">
            <span className="label">Total</span>
            <span className="value">KSH {grandTotal.toFixed(0)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <div className="thank-you">Thank you for your business!</div>
          <div className="contact-info">
            For support, contact: support@evoltechs.com | +254 700 000 000
          </div>
          <div className="copyright">© {new Date().getFullYear()} EvolTechs. All rights reserved.</div>
        </div>
      </div>
    );
  };

  // ========================================
  // INVOICE PREVIEW MODAL
  // ========================================
  const InvoicePreviewModal = () => {
    if (!showInvoicePreview) return null;

    return (
      <>
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          onClick={toggleInvoicePreview}
        />
        <div className="fixed inset-4 md:inset-10 z-50 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <button
                onClick={toggleInvoicePreview}
                className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors print:hidden z-10"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>

              <div id="invoice-preview">
                <div className="flex items-center justify-between mb-6 print:hidden">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FiFileText className="w-5 h-5 text-blue-600" />
                      Proforma Invoice
                    </h3>
                    <p className="text-sm text-gray-500">Review and share this invoice with your client</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrintInvoice}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <FiPrinter className="w-4 h-4" />
                      Print
                    </button>
                    <button 
                      onClick={toggleInvoicePreview}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                    >
                      <FiX className="w-4 h-4" />
                      Close
                    </button>
                  </div>
                </div>

                <InvoiceContent isProforma={true} invoiceNumber={proformaNumber} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // ========================================
  // LOADING STATE
  // ========================================
  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // ========================================
  // LOGIN REQUIRED
  // ========================================
  if (step === 'login') {
    return (
      <div className="min-h-screen pt-20 bg-[#0a0a0a]">
        <div className="container-custom py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto glass-effect rounded-2xl p-8 md:p-10 text-center"
          >
            <div className="w-20 h-20 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiUser className="w-10 h-10 text-accent-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Login Required</h2>
            <p className="text-gray-400 mb-6">
              Please login or create an account to complete your purchase.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleLoginRedirect}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3"
              >
                <FiLogIn className="w-5 h-5" />
                Login to Your Account
              </button>
              <p className="text-gray-400 text-sm">Don't have an account?</p>
              <button
                onClick={handleRegisterRedirect}
                className="w-full btn-secondary flex items-center justify-center gap-2 py-3"
              >
                Create Account
              </button>
              <Link to="/services" className="block text-sm text-gray-500 hover:text-white transition-colors mt-4">
                ← Continue Shopping as Guest
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ========================================
  // CART EMPTY
  // ========================================
  if (items.length === 0 && step !== 'complete') {
    return (
      <div className="min-h-screen pt-20 bg-[#0a0a0a]">
        <div className="container-custom py-20 text-center">
          <div className="max-w-md mx-auto">
            <FiShoppingCart className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Browse our services and add items to get started</p>
            <Link to="/services" className="btn-primary inline-flex items-center gap-2">
              Browse Services
              <FiArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // ORDER COMPLETE
  // ========================================
  if (step === 'complete') {
    return (
      <div className="min-h-screen pt-20 bg-[#0a0a0a]">
        <div className="container-custom py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Payment Successful! 🎉</h2>
              <p className="text-gray-400">
                Thank you for your order. A confirmation has been sent to your email.
              </p>
            </div>

            <div id="invoice-print" className="bg-white rounded-2xl p-6 md:p-8 mb-6 border border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-6 print:hidden">
                <div className="flex items-center gap-2">
                  <FiFileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Invoice</h3>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrintInvoice}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FiPrinter className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>

              <InvoiceContent isProforma={false} invoiceNumber={orderNumber} />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
              <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2">
                View Dashboard
                <FiArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
              <Link to="/services" className="btn-secondary inline-flex items-center gap-2">
                Continue Shopping
                <FiArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ========================================
  // CHECKOUT FLOW
  // ========================================
  return (
    <div className="min-h-screen pt-20 bg-[#0a0a0a]">
      <InvoicePreviewModal />

      <div className="container-custom py-8">
        <div className="flex items-center justify-center gap-4 mb-8">
          {['Cart', 'Details', 'Payment'].map((label, index) => {
            const stepIndex = step === 'cart' ? 0 : step === 'details' ? 1 : 2;
            const isActive = stepIndex >= index;
            
            return (
              <div key={index} className="flex items-center">
                <div className={`flex items-center gap-2`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-accent-500/30'
                      : 'bg-white/5 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-sm font-medium hidden sm:inline ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    stepIndex > index ? 'bg-accent-500' : 'bg-white/10'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-effect rounded-2xl p-6 md:p-8"
            >
              {step === 'cart' && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <FiShoppingCart className="w-5 h-5 text-accent-400" />
                      Shopping Cart ({items.length} items)
                    </h2>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">Logged in as</span>
                      <span className="text-accent-400">{user?.email}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 bg-white/5 rounded-xl"
                      >
                        <div className="flex-1 w-full">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-xs text-gray-400 capitalize">{item.type}</p>
                          {item.type === 'domain' && (
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <FiCalendar className="w-4 h-4 text-accent-400" />
                              <span className="text-sm text-gray-300">Registration Period:</span>
                              <select
                                value={item.period || 1}
                                onChange={(e) => {
                                  const newPeriod = parseInt(e.target.value);
                                  updateItemPeriod(item.id, newPeriod);
                                }}
                                className="bg-white/10 border border-white/10 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-accent-400"
                              >
                                {[1, 2, 3, 4, 5].map((year) => {
                                  let discount = '';
                                  if (year >= 3) discount = ' (10% off)';
                                  else if (year >= 2) discount = ' (5% off)';
                                  return (
                                    <option key={year} value={year}>
                                      {year} year{year > 1 ? 's' : ''}{discount}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                          <div className="flex items-center gap-2">
                            {item.type !== 'domain' && (
                              <div className="flex items-center gap-1 bg-white/5 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                  <FiMinus className="w-3 h-3 text-gray-400" />
                                </button>
                                <span className="w-8 text-center text-white text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                  <FiPlus className="w-3 h-3 text-gray-400" />
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-accent-400 font-semibold min-w-[80px] text-right">
                              KSH {calculateItemTotal(item).toFixed(0)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <FiTrash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                    <Link to="/services" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                      <FiArrowLeft className="w-4 h-4" />
                      Continue Shopping
                    </Link>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={toggleInvoicePreview}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <FiEye className="w-4 h-4" />
                        View Proforma Invoice
                      </button>
                      <button onClick={handleProceedToCheckout} className="btn-primary flex items-center gap-2">
                        Proceed to Checkout
                        <FiArrowLeft className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {step === 'details' && (
                // ... (keep your existing details section - it's the same)
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Billing Details</h2>
                    <button onClick={handleBackToCart} className="text-gray-400 hover:text-white transition-colors text-sm">
                      ← Back to Cart
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm" placeholder="Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm" placeholder="+254 700 000 000" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-300 mb-1">Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm" placeholder="Street address" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm" placeholder="Nairobi" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Country</label>
                      <select name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-400 transition-colors text-sm">
                        <option value="Kenya">Kenya</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-300 mb-1">Order Notes (Optional)</label>
                      <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm resize-none" placeholder="Any special instructions..." />
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                    <button onClick={handleBackToCart} className="text-gray-400 hover:text-white transition-colors">← Back to Cart</button>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button onClick={toggleInvoicePreview} className="btn-secondary flex items-center gap-2"><FiEye className="w-4 h-4" /> View Proforma Invoice</button>
                      <button onClick={handleProceedToPayment} className="btn-primary flex items-center gap-2">Proceed to Payment <FiCreditCard className="w-4 h-4" /></button>
                    </div>
                  </div>
                </>
              )}

              {step === 'payment' && (
                // ... (keep your existing payment section - it's the same)
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Payment</h2>
                    <button onClick={handleBackToDetails} className="text-gray-400 hover:text-white transition-colors text-sm">← Back to Details</button>
                  </div>
                  <div className="space-y-6">
                    <div className="glass-effect rounded-xl p-6 border border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center"><FiSmartphone className="w-6 h-6 text-green-400" /></div>
                        <div><h3 className="text-white font-semibold">M-Pesa</h3><p className="text-xs text-gray-400">Pay securely via M-Pesa</p></div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">M-Pesa Phone Number *</label>
                          <input type="tel" value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)} placeholder="+254 700 000 000" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm" />
                        </div>
                        <p className="text-xs text-gray-500">You will receive a prompt on your phone to complete the payment</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400"><FiLock className="w-4 h-4" /><span>Your payment is secure and encrypted</span></div>
                    {isPolling && (
                      <div className="glass-effect rounded-xl p-4 border border-yellow-500/20 bg-yellow-500/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full border-2 border-yellow-400/30 border-t-yellow-400 animate-spin"></div>
                          <div><p className="text-sm text-yellow-400 font-medium">Waiting for payment confirmation...</p><p className="text-xs text-gray-400">Please check your phone for the M-Pesa prompt</p></div>
                        </div>
                      </div>
                    )}
                    <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                      <button onClick={handleBackToDetails} className="text-gray-400 hover:text-white transition-colors">← Back to Details</button>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={toggleInvoicePreview} className="btn-secondary flex items-center gap-2"><FiEye className="w-4 h-4" /> View Invoice</button>
                        <button onClick={handlePayment} disabled={isProcessing} className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                          {isProcessing ? <><FiLoader className="w-4 h-4 animate-spin" /> {isPolling ? 'Waiting for payment...' : 'Processing...'}</> : <><FiCheckCircle className="w-4 h-4" /> Pay Now - KSH {grandTotal.toFixed(0)}</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 sticky top-28">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FiTrendingUp className="w-5 h-5 text-accent-400" /> Order Summary</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.name} {item.type === 'domain' && `(${item.period || 1}yr)`}{item.type !== 'domain' && ` × ${item.quantity}`}</span>
                    <span className="text-white font-medium">KSH {calculateItemTotal(item).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Subtotal</span><span className="text-white">KSH {subtotal.toFixed(0)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">VAT (16%)</span><span className="text-white">KSH {taxAmount.toFixed(0)}</span></div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/5"><span className="text-white">Total</span><span className="text-accent-400">KSH {grandTotal.toFixed(0)}</span></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400"><FiShield className="w-4 h-4 text-accent-400" /><span>Secure checkout • VAT included</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

