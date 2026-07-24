// import { motion, AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext/CartProvider';
import { 
  FiX, 
  FiTrash2, 
  FiShoppingCart, 
  FiPlus, 
  FiMinus,
  FiArrowRight,
  FiCreditCard
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    removeItem, 
    updateQuantity,
    clearCart,
    isCartOpen,
    closeCart
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeCart}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed top-0 right-0 w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FiShoppingCart className="w-5 h-5 text-accent-400" />
            <h2 className="text-lg font-bold text-white">Your Cart</h2>
            <span className="text-xs bg-accent-400/20 text-accent-400 px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={closeCart}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <FiShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400">Your cart is empty</h3>
              <p className="text-gray-500 text-sm mt-2">Browse our services and add items to get started</p>
              <Link
                to="/services"
                onClick={closeCart}
                className="btn-primary inline-flex items-center gap-2 mt-4"
              >
                Browse Services
                <FiArrowRight />
              </Link>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-effect rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-400 capitalize">{item.type}</p>
                      <p className="text-accent-400 font-semibold text-sm mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
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
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-bold text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex gap-3">
              <Link
                to="/checkout"
                onClick={closeCart}
                className="flex-1 btn-primary py-3 text-center flex items-center justify-center gap-2"
              >
                <FiCreditCard className="w-4 h-4" />
                Checkout
              </Link>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Secure checkout powered by M-Pesa
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
};