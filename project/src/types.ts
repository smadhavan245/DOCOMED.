export interface User {
  id: string;
  email: string;
  name: string;
  role: 'doctor' | 'patient';
  specialization?: string;
  address?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  patientName: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  date: string;
  medicines: Medicine[];
  imageUrl?: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  price: number;
}