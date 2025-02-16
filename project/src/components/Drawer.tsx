import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Drawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/prescriptions', label: 'Prescriptions' },
    { path: '/pharmacy', label: 'Pharmacy' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform lg:transform-none lg:relative lg:w-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 flex justify-between items-center lg:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}