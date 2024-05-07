'use client'
import React, { useRef } from 'react'
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks' // Du behöver importera useAppSelector och useAppDispatch från dina Redux hooks
import { initializeUser } from '@/lib/features/user/userSlice' // Du behöver importera initializeProduct från userSlice-filen

const SignUp = ({ count }) => {
  const store = useAppStore()
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(initializeUser({ value: count }))
    initialized.current = true
  }
  const name = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  return <div>page {`name: ${name}`}</div>
}

export default SignUp
