import React, { Suspense, useCallback, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import {isValidEmail} from '@libs/utils'

const Auth = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    username: '',
    surname:'',
    address:'',
    canon:''
  });
  const [errorMessage, setErrorMessage] = useState<any>({
    email:'',
    password:'',
    confirmPassword:'',
    
  });

  const handleValidation = (name: string, value: string) => {
    setUserDetails({...userDetails, [name]: value});
    
    if (name === 'email') {
      if (value !== '' && !isValidEmail(value)) {
        setErrorMessage({...errorMessage,email:'Enter a Valid E-Mail Address'});
      } else {
        setErrorMessage('');
      }
    } else if (name === 'password') {
      if (value.length < 8) {
        setErrorMessage({...errorMessage,password:'Password must be at least 8 characters long'});
      } else {
        setErrorMessage('');
      }
    } else if (name === 'confirmPassword') {
      if (value !== userDetails.password) {
        setErrorMessage({...errorMessage, confirmPassword: 'Passwords do not match'});
      } else {
        setErrorMessage('');
      }
    }
    
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )
  const viewProps = { userDetails, handleValidation, errorMessage }

  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Auth
