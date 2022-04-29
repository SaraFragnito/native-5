import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {}
})

function AuthContextProvider(props){
  const [authToken, setAuthToken] = useState()

  const authenticate = (token) => {
    setAuthToken(token)
    AsyncStorage.setItem("token", token) // key, value - salva il token nel telefono, così chiudendo e riaprendo l'app risultiamo ancora autenticati
  }
  const logout = () => {
    setAuthToken(null)
    AsyncStorage.removeItem("token")
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken, // converte il valore truthy o falsy in true o false
    authenticate: authenticate,
    logout: logout
  }

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export default AuthContextProvider