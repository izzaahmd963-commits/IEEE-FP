import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../../features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, itemCount, subtotal } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth/login');
    } else {
      // Will implement Stripe checkout later
      alert('Checkout functionality coming soon!');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/products" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({itemCount} items)</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 border-b py-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-1">
                <Link to={`/products/${item.productId}`}>
                  <h3 className="font-semibold hover:text-blue-600">{item.name}</h3>
                </Link>
                
                {/* Vendor in multi-vendor mode */}
                {import.meta.env.VITE_STORE_MODE === 'multi' && (
                  <p className="text-sm text-gray-500">Vendor ID: {item.vendorId}</p>
                )}
                
                <p className="text-gray-600">${item.price}</p>
                
                <div className="flex items-center gap-4 mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) => dispatch(updateQuantity({
                      productId: item.productId,
                      quantity: Number(e.target.value)
                    }))}
                    className="border rounded px-2 py-1"
                  >
                    {[...Array(Math.min(10, item.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => dispatch(removeFromCart(item.productId))}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => dispatch(clearCart())}
            className="mt-4 text-red-600 hover:text-red-800 text-sm"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            {import.meta.env.VITE_STORE_MODE === 'multi' && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Platform fee (10%)</span>
                <span>${(subtotal * 0.1).toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-xl">
                ${import.meta.env.VITE_STORE_MODE === 'multi' 
                  ? (subtotal * 1.1).toFixed(2) 
                  : subtotal.toFixed(2)}
              </span>
            </div>
          </div>
          
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
          
          <Link 
            to="/products"
            className="block text-center mt-4 text-blue-600 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;