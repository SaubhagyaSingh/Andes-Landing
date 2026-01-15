// ProtectedOrderRoute.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const ProtectedOrderRoute = ({ children }) => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateOrder = async () => {
      try {
        const q = query(
          collection(db, 'cartdetails'),
          where('orderNumber', '==', orderNumber)
        );
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          navigate('/orders', { replace: true });
        } else {
          setIsValid(true);
        }
      } catch (error) {
        console.error('Error validating order:', error);
        navigate('/orders', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    validateOrder();
  }, [orderNumber, navigate]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return isValid ? children : null;
};

export default ProtectedOrderRoute;