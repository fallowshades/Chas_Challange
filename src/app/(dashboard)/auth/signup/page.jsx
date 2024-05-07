"use client"
import React, { useRef } from 'react';
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks'; // Du behöver importera useAppSelector och useAppDispatch från dina Redux hooks
import { initializeProduct } from '@/lib/features/user/userSlice'; // Du behöver importera initializeProduct från userSlice-filen


const page = () => {
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(initializeProduct(product));
    initialized.current = true;
  }
  const name = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  return (
    <div>page {name}
    </div>
  )
}

export default page