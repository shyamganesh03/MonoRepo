import { setItemAsync } from '@izzo/shared-async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const handleLogin = async (email: string, password: string) => {
  return await auth()
    .signInWithEmailAndPassword(email.toLowerCase(), password)
    .then(async () => {
      let users: any = await firestore()
        .collection('users')
        .doc(email.toLowerCase())
        .get()

      users = {
        email,
        ...users._data,
      }
      setItemAsync('userDetails', JSON.stringify(users))
      return true
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        return { errorMessage: 'ERROR_MESSAGE.EMAIL_ALREADY_IN_USE' }
      }

      if (error.code === 'auth/invalid-email') {
        return { errorMessage: 'ERROR_MESSAGE.INVALID_EMAIL_FORMAT' }
      }

      return { errorMessage: 'ERROR_MESSAGE.INVALID_PASSWORD_CREDENTIAL' }
    })
}

export const checkEmailExists = async (email: string) => {
  try {
    const users = await firestore()
      .collection('users')
      .doc(email.toLowerCase())
      .get()
    return users.exists
  } catch (error) {
    console.error('Error checking email existence: ', error)
    throw error
  }
}

export const handleCreateNewUser = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email.toLowerCase(),
      password,
    )

    return userCredential
  } catch (error) {
    return null
  }
}

export const handleCreateOrUpdateUserData = async (
  email: string,
  payload: any,
) => {
  try {
    await firestore().collection('users').doc(email).set(payload)
    const users = {
      email,
      ...payload,
    }
    setItemAsync('userDetails', JSON.stringify(users))
    return true
  } catch (error) {
    return null
  }
}

export const handleDeleteAccount = async (email: string) => {
  try {
    const user = auth().currentUser
    user?.delete()
    await firestore().collection('users').doc(email).delete()
  } catch (error) {}
}
