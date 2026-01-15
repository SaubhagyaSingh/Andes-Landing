// LinkGoogle.jsx
import React from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, linkWithCredential } from 'firebase/auth';

const LinkGoogle = () => {
  const handleLinkGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      const currentUser = auth.currentUser;

      if (currentUser) {
        const linkResult = await linkWithCredential(currentUser, credential);
        console.log("✅ Google account linked:", linkResult.user);
        alert("Google account successfully linked to your phone-auth profile.");
      } else {
        console.warn("❌ No user currently signed in to link with.");
      }

    } catch (error) {
      if (error.code === 'auth/credential-already-in-use') {
        console.error("❌ This Google account is already used by another user.");
        alert("This Google account is already linked to a different profile.");
        // Optional: merge Firestore data or redirect user
      } else {
        console.error("❌ Error linking account:", error);
        alert("Something went wrong while linking the account.");
      }
    }
  };

  return (
    <div className="mt-4">
      <button onClick={handleLinkGoogle} className="bg-blue-500 text-white px-4 py-2 rounded">
        Link Google Account
      </button>
    </div>
  );
};

export default LinkGoogle;
