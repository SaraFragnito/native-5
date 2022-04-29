import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {}
})

function AuthContextProvider(props){
  const [authToken, setAuthToken] = useState()

  const authenticate = (token) => setAuthToken(token)
  const logout = () => setAuthToken(null)

  const value = {
    token: authToken,
    isAuthenticated: !!authToken, // converte il valore truthy o falsy in true o false
    authenticate: authenticate,
    logout: logout
  }

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export default AuthContextProvider