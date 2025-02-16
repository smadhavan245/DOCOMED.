import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const medicines = [
  {
    id: '1',
    name: 'Amoxicillin',
    description: 'Antibiotic for bacterial infections',
    price: 15.99,
    category: 'Antibiotics',
  },
  {
    id: '2',
    name: 'Lisinopril',
    description: 'Blood pressure medication',
    price: 25.99,
    category: 'Cardiovascular',
  },
  {
    id: '3',
    name: 'Metformin',
    description: 'Diabetes medication',
    price: 12.99,
    category: 'Diabetes',
  },
  {
    id: '4',
    name: 'Omeprazole',
    description: 'Acid reflux medication',
    price: 18.99,
    category: 'Digestive Health',
  },
  {
    id: '5',
    name: 'Sertraline',
    description: 'Antidepressant medication',
    price: 30.99,
    category: 'Mental Health',
  },
];

export function Pharmacy() {
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (medicine: any) => {
    const existingItem = cart.find((item) => item.id === medicine.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId: string) => {
    setCart(cart.filter((item) => item.id !== medicineId));
  };

  const updateQuantity = (medicineId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(medicineId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === medicineId ? { ...item, quantity } : item
        )
      );
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated checkout
    alert('Order placed successfully!');
    setCart([]);
    setAddress('');
    setShowCheckout(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pharmacy</h1>
        <button
          onClick={() => setShowCheckout(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          disabled={cart.length === 0}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Cart ({cart.length})
        </button>
      </div>

      {showCheckout ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Checkout</h2>
          <form onSubmit={handleCheckout}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4">
                <h3 className="text-lg font-semibold">Total</h3>
                <p className="text-lg font-semibold">${total.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Back to Shopping
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map((medicine) => (
            <div
              key={medicine.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{medicine.name}</h2>
              <p className="text-gray-600 mb-4">{medicine.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">
                  ${medicine.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(medicine)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}