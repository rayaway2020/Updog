import React, { createContext, useState, useMemo } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
  })

  const login = ({ token, username }) => {
    setUser({ token, username })
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
  }

  const logout = () => {
    setUser({})
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  const value = useMemo(
    () => ({ isAuthenticated: user.token === undefined, user, login, logout }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthProvider
