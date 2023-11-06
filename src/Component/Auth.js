
import { useState } from 'react'
import { auth, googleProvider } from '../Config/firebase-config'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // console.log(auth?.currentUser?.email)

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.log(err)
        }
    }

    const signIn = async () => {
                try{
            await createUserWithEmailAndPassword(auth, email, password)
                } catch(err) {
                    console.error(err)
                }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        
        <div>
            <input placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}> Sign in With Google</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}