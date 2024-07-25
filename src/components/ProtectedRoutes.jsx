import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protected() {
    const user = localStorage.getItem("user")
    return (
        <div>
            {user ? <Outlet /> : <Navigate to='/login' />}
        </div>
    
  )
}
