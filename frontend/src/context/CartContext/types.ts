// export interface CartItem {
//   id: string;
//   type: 'domain' | 'hosting' | 'email' | 'software';
//   name: string;
//   price: number;
//   quantity: number;
//   details?: any;
//    period?: number;  // For domain registration period in years
// }

// export interface CartContextType {
//   items: CartItem[];
//   totalItems: number;
//   totalPrice: number;
//   addItem: (item: CartItem) => void;
//   removeItem: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
//   isCartOpen: boolean;
//   toggleCart: () => void;
//   closeCart: () => void;
// }

export interface CartItem {
  id: string;
  type: 'domain' | 'hosting' | 'email' | 'software';
  name: string;
  price: number;
  quantity: number;
  period?: number; // For domain registration period in years
  details?: any;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItemPeriod: (id: string, period: number) => void; // New function for domains
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
}