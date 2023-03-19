import React from 'react'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({children}) => {
  const token = localStorage.getItem("token")
// console.log("token",token)

  if(token){
    return children
  }
  return (
    <Navigate to="/"/>
  )
}

export default RequireAuth