// src/couponUtils.js

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../server/firebase';
import { useState } from 'react';

// Function to fetch coupon details from Firestore
export const fetchCoupon = async (code) => {
  // const[applied,seApplied]=useState(false)
  const couponsRef = collection(db, 'coupons');
  const q = query(couponsRef, where('code', '==', code.toUpperCase()));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const coupon = querySnapshot.docs[0].data();
    return coupon;
  } else {
    throw new Error('Invalid coupon code');
  }
};

// Function to validate the coupon
export const validateCoupon = (coupon) => {
  const now = new Date();
  if (coupon.expiration.toDate() >= now) {
    alert("Coupon applied..!!")
    return true;
  } else {
    throw new Error('Coupon has expired');
  }
};

// Function to apply the discount
export const applyDiscount = (originalAmount, discountPercentage) => {
  return originalAmount - (originalAmount * discountPercentage / 100);
};
