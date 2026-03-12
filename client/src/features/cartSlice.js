import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : {
    items: [],
    itemCount: 0,
    subtotal: 0
  };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCart(),
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.productId === product._id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.images[0],
          vendorId: product.vendorId?._id || product.vendorId,
          stock: product.stock
        });
      }
      
      // Recalculate
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      
      // Recalculate
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      
      if (item) {
        item.quantity = quantity;
        
        // Recalculate
        state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      state.subtotal = 0;
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;