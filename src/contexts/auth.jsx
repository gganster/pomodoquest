/*
  Firebase Auth context anonymous or email login
  with Loading screen

  Usage:
  - Wrap your app with AuthProvider (router should be inside)
*/

import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { 
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  EmailAuthProvider,
  linkWithCredential
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

const AuthContext = createContext();

const DefaultState = {
  user: null,
}

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => { 
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(AuthReducer, DefaultState);

  const login = (mail, password) => {
    signInWithEmailAndPassword(auth, mail, password)
  }
  const loginAnonymous = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;
      await setDoc(doc(db, "users", uid), {
        createdAt: new Date(),
        email: "anonymous",
      })
      dispatch({ type: "LOGIN", payload: userCredential.user });
    } catch (e) {
      console.error(e);
    }

  }

  const register = async (email, password) => {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      linkWithCredential(getAuth().currentUser, credential);
      await setDoc(doc(db, "users", state.user.uid), {
        createdAt: new Date(),
        email: email,
      })
    } catch (e) {
      console.error(e);
    }
  }

  const logout = () => {
    setLoading(true);
    signOut(auth);
  }

  const isLogin = () => state?.user?.email && state.user.email !== "anonymous" ? true : false;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getDoc(doc(db, "users", user.uid));
        dispatch({ type: "LOGIN", payload: {
          ...userData.data(),
          ...user,
        }});
        setLoading(false);
      } else {
        loginAnonymous();
      }
    }, () => {
      logout();
      loginAnonymous();
    });
    return unsubscribe;
  }, [])

  return (
    <AuthContext.Provider value={{ auth: state, login, register, logout, isLogin }}>
      {loading ? 
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-slate-700"></div>
        </div>
      :
        children
      }
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthReducer, AuthProvider };
export default useAuth;