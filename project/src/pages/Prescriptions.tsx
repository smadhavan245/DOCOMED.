import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Upload } from 'lucide-react';

export function Prescriptions() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    patientName: '',
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
  });

  const handleAddMedicine = () => {
    setFormData({
      ...formData,
      medicines: [
        ...formData.medicines,
        { name: '', dosage: '', frequency: '', duration: '' },
      ],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrescription = {
      id: Date.now().toString(),
      doctorId: user?.id,
      doctorName: user?.name,
      date: new Date().toISOString().split('T')[0],
      ...formData,
    };
    setPrescriptions([...prescriptions, newPrescription]);
    setFormData({
      patientName: '',
      medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
    });
    setShowForm(false);
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      const newPrescription = {
        id: Date.now().toString(),
        patientId: user?.id,
        patientName: user?.name,
        date: new Date().toISOString().split('T')[0],
        fileName: selectedFile.name,
        status: 'pending',
      };
      setPrescriptions([...prescriptions, newPrescription]);
      setSelectedFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Prescriptions</h1>
        {user?.role === 'doctor' && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Prescription
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name
            </label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) =>
                setFormData({ ...formData, patientName: e.target.value })
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {formData.medicines.map((medicine, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium mb-4">Medicine {index + 1}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medicine Name
                  </label>
                  <input
                    type="text"
                    value={medicine.name}
                    onChange={(e) => {
                      const newMedicines = [...formData.medicines];
                      newMedicines[index].name = e.target.value;
                      setFormData({ ...formData, medicines: newMedicines });
                    }}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={medicine.dosage}
                    onChange={(e) => {
                      const newMedicines = [...formData.medicines];
                      newMedicines[index].dosage = e.target.value;
                      setFormData({ ...formData, medicines: newMedicines });
                    }}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <input
                    type="text"
                    value={medicine.frequency}
                    onChange={(e) => {
                      const newMedicines = [...formData.medicines];
                      newMedicines[index].frequency = e.target.value;
                      setFormData({ ...formData, medicines: newMedicines });
                    }}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={medicine.duration}
                    onChange={(e) => {
                      const newMedicines = [...formData.medicines];
                      newMedicines[index].duration = e.target.value;
                      setFormData({ ...formData, medicines: newMedicines });
                    }}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddMedicine}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Another Medicine
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Prescription
          </button>
        </form>
      )}

      {user?.role === 'patient' && (
        <form onSubmit={handleFileSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Prescription</h2>
          <div className="flex items-center justify-center w-full mb-6">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-50 transition-colors">
              <Upload className="w-8 h-8 text-blue-600" />
              <span className="mt-2 text-base leading-normal">
                {selectedFile ? selectedFile.name : 'Select a file'}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            disabled={!selectedFile}
          >
            Submit Prescription
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Prescription History</h2>
        <div className="space-y-6">
          {prescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  {prescription.doctorName ? (
                    <>
                      <h3 className="text-lg font-medium">
                        Dr. {prescription.doctorName}
                      </h3>
                      <p className="text-gray-600">
                        Patient: {prescription.patientName}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium">
                        Uploaded by: {prescription.patientName}
                      </h3>
                      <p className="text-gray-600">
                        File: {prescription.fileName}
                      </p>
                      {prescription.status && (
                        <p className={`text-sm ${
                          prescription.status === 'approved' 
                            ? 'text-green-600' 
                            : prescription.status === 'rejected' 
                            ? 'text-red-600' 
                            : 'text-yellow-600'
                        }`}>
                          Status: {prescription.status}
                        </p>
                      )}
                    </>
                  )}
                  <p className="text-gray-600">Date: {prescription.date}</p>
                </div>
                {user?.role === 'doctor' && prescription.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setPrescriptions(prescriptions.map(p => 
                          p.id === prescription.id 
                            ? {...p, status: 'approved'} 
                            : p
                        ));
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        setPrescriptions(prescriptions.map(p => 
                          p.id === prescription.id 
                            ? {...p, status: 'rejected'} 
                            : p
                        ));
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
              {prescription.medicines && (
                <div className="space-y-4">
                  {prescription.medicines.map((medicine: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium">{medicine.name}</h4>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <p className="text-sm text-gray-600">
                          Dosage: {medicine.dosage}
                        </p>
                        <p className="text-sm text-gray-600">
                          Frequency: {medicine.frequency}
                        </p>
                        <p className="text-sm text-gray-600">
                          Duration: {medicine.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}