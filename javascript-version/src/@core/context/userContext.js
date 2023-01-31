import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, userToken) => {
    localStorage.setItem('oculus_user', JSON.stringify(userData))
    localStorage.setItem('oculus_token', userToken)
    setUser(userData)
    setToken(userToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  useEffect(() => {
    if (!localStorage) return;
    setUser(JSON.parse(localStorage.getItem('oculus_user')))
    setToken(localStorage.getItem('oculus_token'))
  }, [])

  const value = {
    user,
    setUser,
    token,
    setToken,
    login,
    logout
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}