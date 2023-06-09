import React, { useEffect } from 'react';
import { useFirestore } from '@context/useFirestore';

export default function UserInfo() {
  const { firestoreData, firestoreFunctions } = useFirestore();

  useEffect(() => {
    firestoreFunctions.initializeFirestore();
    firestoreFunctions.getUserData('zombi');
    console.log(firestoreData?.userData?.userName);
  }, []);

  useEffect(() => {
    console.log(firestoreData);
  }, [firestoreData]);
  return <p>{firestoreData?.userData?.userName}</p>;
}
