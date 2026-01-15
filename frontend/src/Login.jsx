import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider, db } from './firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from './components/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      toast.loading('Signing in...');
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('🔑 User signed in:', user);

      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || '',
        mobile: user.phoneNumber || '',
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.success('Welcome back! Redirecting to your cart...');
      } else {
        const newUserRef = doc(db, 'users', user.uid);
        await setDoc(newUserRef, {
          ...userData,
          role: 'user',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success('Account created! Redirecting to your cart...');
      }

      navigate('/cart');
    } catch (error) {
      console.error('❌ Error during sign-in:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      toast.dismiss(); // Close any lingering toasts
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button onClick={handleGoogleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
