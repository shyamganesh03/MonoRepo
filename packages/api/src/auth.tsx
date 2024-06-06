import { setItemAsync } from '@izzo/shared-async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const handleLogin = async (email: string, password: string) => {
  // Call the function to fix package conflicts before performing Firebase authentication operations
  //  fixPackageConflicts();

  // Now you can perform Firebase authentication operations
  return  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async() => {
    let users:any = await firestore().collection('users').doc(email).get()
  
   users = {
    ...users._data,
    email
   }
    setItemAsync('userDetails',JSON.stringify(users))
    return true;
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!')
      }

      console.error(error)
    })
}

export const checkEmailExists = async (email: string) => {
  try {
    const users = await firestore().collection('users').doc(email).get()
    return users.exists
  } catch (error) {
    console.error('Error checking email existence: ', error)
    throw error
  }
}
