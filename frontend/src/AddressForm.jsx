import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddressForm = ({ onClose }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: '',
    landmark: '',
    pincode: '',
    addressType: 'Home',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [addressDocId, setAddressDocId] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const q = query(
          collection(db, 'addresses'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0];
          const data = docData.data();
          setForm({
            address: data.address || '',
            landmark: data.landmark || '',
            pincode: data.pincode || '',
            addressType: data.addressType || 'Home',
          });
          setIsEditMode(true);
          setAddressDocId(docData.id);
        }
      } catch (err) {
        console.error('❌ Error fetching address:', err);
      }
    };

    if (user?.uid) {
      fetchAddress();
    }
  }, [user?.uid]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const addressRef = collection(db, 'addresses');

      if (isEditMode && addressDocId) {
        const docRef = doc(db, 'addresses', addressDocId);
        await updateDoc(docRef, {
          ...form,
          phoneNumber: user.mobile || null,
          updatedAt: serverTimestamp(),
        });
        console.log('✅ Address updated');
      } else {
        await addDoc(addressRef, {
          ...form,
          userId: user.uid,
          phoneNumber: user.mobile || null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        console.log('✅ Address added');
      }

      onClose();  // Close the form after successful submission

    } catch (err) {
      console.error('❌ Error saving address:', err);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto py-10 px-6">
      <h2 className="text-xl font-bold mb-2">
        {isEditMode ? 'Edit Address' : 'Add Your Address'}
      </h2>

      <input
        type="text"
        name="address"
        placeholder="Full Address"
        value={form.address}
        onChange={handleChange}
        className="p-2 border rounded"
      />

      <input
        type="text"
        name="landmark"
        placeholder="Landmark"
        value={form.landmark}
        onChange={handleChange}
        className="p-2 border rounded"
      />

      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={form.pincode}
        onChange={handleChange}
        className="p-2 border rounded"
      />

      <select
        name="addressType"
        value={form.addressType}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="Home">Home</option>
        <option value="Work">Work</option>
        <option value="Other">Other</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {isEditMode ? 'Update Address' : 'Save Address'}
      </button>
    </div>
  );
};

export default AddressForm;
