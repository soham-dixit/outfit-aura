import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectLogin = ({ children }) => {
    const {user} = useSelector(state => state.user)
  return !user ? children : <Navigate to='/' />
}

export default ProtectLogin