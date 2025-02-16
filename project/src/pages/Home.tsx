import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Pill, FileText, ShoppingBag } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calendar className="h-12 w-12 text-blue-500" />,
      title: 'Book Appointments',
      description: 'Schedule appointments with our expert doctors',
      link: '/appointments',
    },
    {
      icon: <FileText className="h-12 w-12 text-green-500" />,
      title: 'Manage Prescriptions',
      description: 'View and manage your medical prescriptions',
      link: '/prescriptions',
    },
    {
      icon: <ShoppingBag className="h-12 w-12 text-purple-500" />,
      title: 'Order Medicines',
      description: 'Order prescribed medicines online',
      link: '/pharmacy',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Comprehensive healthcare management at your fingertips
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => navigate(feature.link)}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
              <p className="text-gray-600">
                Access to qualified healthcare professionals
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple and quick appointment scheduling
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Online Pharmacy</h3>
              <p className="text-gray-600">
                Order medicines from the comfort of your home
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}