'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'
import { initializeUser } from '../lib/features/user/userSlice'

export default function StoreProvider({ count, children }) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    storeRef.current.dispatch(initializeUser({ value: count }))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
