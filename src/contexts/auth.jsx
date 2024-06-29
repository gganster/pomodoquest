import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const DefaultState = {
  user: null,
}

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => { 
  const [state, dispatch] = useReducer(AuthReducer, DefaultState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthReducer, AuthProvider };
export default useAuth;