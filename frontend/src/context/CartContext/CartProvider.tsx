import React, { createContext, useState, useContext, useEffect } from 'react';
import { CartItem, CartContextType } from './types';
import toast from 'react-hot-toast';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart);
        // Ensure all items have a period property (for domains)
        const itemsWithPeriod = parsedItems.map((item: CartItem) => ({
          ...item,
          period: item.type === 'domain' ? (item.period || 1) : undefined,
        }));
        setItems(itemsWithPeriod);
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Calculate total items (for domains, each counts as 1)
  const totalItems = items.reduce((sum, item) => {
    if (item.type === 'domain') {
      return sum + 1; // Each domain is 1 item regardless of period
    }
    return sum + item.quantity;
  }, 0);

  // Calculate total price with domain period discounts
  const totalPrice = items.reduce((sum, item) => {
    if (item.type === 'domain') {
      const years = item.period || 1;
      const basePrice = item.price;
      let discount = 0;
      
      if (years >= 3) discount = 0.10; // 10% off for 3+ years
      else if (years >= 2) discount = 0.05; // 5% off for 2+ years
      
      const discountedPrice = basePrice * (1 - discount);
      return sum + (discountedPrice * years);
    }
    return sum + (item.price * item.quantity);
  }, 0);

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      // Check if item already exists (by id and type)
      const existingItem = prevItems.find(i => i.id === item.id && i.type === item.type);
      
      if (existingItem) {
        // If it's a domain, update the period instead of quantity
        if (item.type === 'domain') {
          toast.success(`Updated ${item.name} registration period`);
          return prevItems.map(i =>
            i.id === item.id && i.type === item.type
              ? { ...i, period: item.period || i.period || 1 }
              : i
          );
        }
        // For other items, update quantity
        toast.success(`Updated ${item.name} quantity`);
        return prevItems.map(i =>
          i.id === item.id && i.type === item.type
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      // Add new item with default period for domains
      const newItem = {
        ...item,
        quantity: item.type === 'domain' ? 1 : (item.quantity || 1),
        period: item.type === 'domain' ? (item.period || 1) : undefined,
      };
      
      toast.success(`Added ${item.name} to cart`);
      return [...prevItems, newItem];
    });
    // Open cart when adding items
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.id === id);
      if (item) {
        toast.success(`Removed ${item.name} from cart`);
      }
      return prevItems.filter(i => i.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateItemPeriod = (id: string, period: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.type === 'domain' 
          ? { ...item, period } 
          : item
      )
    );
    toast.success('Registration period updated');
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    updateItemPeriod,
    clearCart,
    isCartOpen,
    toggleCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};