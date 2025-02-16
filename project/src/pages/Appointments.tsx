import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const doctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    availability: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    availability: ['9:30 AM', '10:30 AM', '11:30 AM', '2:30 PM', '3:30 PM'],
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    specialization: 'Pediatrician',
    availability: ['9:15 AM', '10:15 AM', '11:15 AM', '2:15 PM', '3:15 PM'],
  },
];

export function Appointments() {
  const { user } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = doctors.find((d) => d.id === selectedDoctor);
    if (doctor) {
      const newAppointment = {
        id: Date.now().toString(),
        doctorId: doctor.id,
        doctorName: doctor.name,
        patientId: user?.id,
        patientName: user?.name,
        date: selectedDate,
        time: selectedTime,
        status: 'pending',
      };
      setAppointments([...appointments, newAppointment]);
      setSelectedDoctor('');
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const handleAppointmentAction = (appointmentId: string, action: 'accept' | 'reject') => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: action === 'accept' ? 'accepted' : 'rejected' } : apt
      )
    );
  };

  const filteredAppointments = appointments.filter(apt => 
    user?.role === 'doctor' ? apt.doctorId === user.id : apt.patientId === user.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {user?.role === 'doctor' ? 'Manage Appointments' : 'Book Appointment'}
      </h1>

      {user?.role === 'patient' && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor
              </label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Choose a time</option>
                {selectedDoctor &&
                  doctors
                    .find((d) => d.id === selectedDoctor)
                    ?.availability.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {user?.role === 'doctor' ? 'Upcoming Appointments' : 'Your Appointments'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {user?.role === 'doctor' ? 'Patient' : 'Doctor'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {user?.role === 'doctor' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user?.role === 'doctor' ? appointment.patientName : appointment.doctorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  {user?.role === 'doctor' && appointment.status === 'pending' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleAppointmentAction(appointment.id, 'accept')}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAppointmentAction(appointment.id, 'reject')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}