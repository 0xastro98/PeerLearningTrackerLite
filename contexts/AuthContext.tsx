import React, {useState, useEffect, useContext, createContext} from 'react'
import {useRouter} from 'next/router'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, updateProfile, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from 'firebase/auth'
import {User as FirebaseUser} from 'firebase/auth'
import {auth, database} from '../utils/firebaseConfig'

const AuthContext = createContext<any | null>('');

export function useAuth(){
   return useContext(AuthContext)
}

export function AuthProvider({children}:any){
   const router = useRouter()
   const [currentUser, setCurrentUser] = useState<FirebaseUser | null>()
   const [page, setPage] = useState()
   const [isUserSignedIn, setIsUserSignedIn] = useState(false)
   const [isUserVerified, setIsUserVerified] = useState(false)
   const [uid, setUID] = useState('')
   const [userEmail, setUserEmail] = useState<string | null>('')
   const [errorMessage, setErrorMessage] = useState('')
   const [displayName, setDisplayName] = useState<string | null>('')

  function generalsignup(fname: string, lname: string, email: string, pwd: string){
    return createUserWithEmailAndPassword(auth, email, pwd).then((userCredentials) => {
      const fullName = fname + " " + lname
      updateProfile(userCredentials.user, {
        displayName: fullName
      }).then(() => 
         sendEmailVerification(userCredentials.user)
      ).catch(Error);
      const userID = userCredentials.user.uid;
      set(ref(database, `users/${userID}`), {
          firstname: fname,
          lastname: lname,
          email: email
      })
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessafe = error.message;
      setErrorMessage(errorMessage)
    });
  }

  function signin(email: string, pwd: string){
    return signInWithEmailAndPassword(auth, email, pwd);
  }

  function redirectTo(page: any){
    return setPage(page)
  }

  function sendVerification(user: any){
     return sendEmailVerification(user)
  }

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUser(user)
        setUID(user.uid)
        setUserEmail(user.email)
        setIsUserVerified(user.emailVerified)
        setDisplayName(user.displayName)
      }
      else{
        console.log('user does not exist')
      }
    })

    return subscribe;
  }, [])

  const value: any = {
    generalsignup,
    currentUser,
    uid,
    displayName,
    userEmail,
    signin,
    sendVerification,
    isUserVerified,
    errorMessage,
    redirectTo,
    page
  }
  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}