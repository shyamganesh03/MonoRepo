import React, { Suspense, useCallback, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import { isValidEmail } from '@libs/utils'
import Login from '../../components/auth/Login'
import LoginAndSignUp from '../../components/auth/LoginAndSignUp'
import Registration from '../../components/auth/Registration'

const Auth = (props: any) => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    username: '',
    surname: '',
    address: '',
    canon: '',
    agb: false,
    canSendOfferAndNews: false,
  })
  const [errorMessage, setErrorMessage] = useState<any>({
    email: '',
    password: '',
    username: '',
    surname: '',
    address: '',
    canon: '',
    agb: false,
    canSendOfferAndNews: false,
  })

  const currentRoute = props.route

  const handleValidation = (name: string, value: string) => {
    setUserDetails({ ...userDetails, [name]: value })

    if (name === 'email') {
      if (value !== '' && !isValidEmail(value)) {
        setErrorMessage({
          ...errorMessage,
          email: 'Enter a Valid E-Mail Address',
        })
      } else {
        setErrorMessage('')
      }
    } else if (name === 'password') {
      if (value.length < 8) {
        setErrorMessage({
          ...errorMessage,
          password: 'Password must be at least 8 characters long',
        })
      } else {
        setErrorMessage('')
      }
    } else if (name === 'confirmPassword') {
      if (value !== userDetails.password) {
        setErrorMessage({
          ...errorMessage,
          confirmPassword: 'Passwords do not match',
        })
      } else {
        setErrorMessage('')
      }
    }
  }
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )
  const routes = {
    loginAndSignUp: (
      <LoginAndSignUp
        handleValidation={handleValidation}
        userDetails={userDetails}
        errorMessage={errorMessage}
      />
    ),
    login: (
      <Login
        handleValidation={handleValidation}
        userDetails={userDetails}
        errorMessage={{ ...errorMessage }}
      />
    ),
    register: (
      <Registration
        handleValidation={handleValidation}
        userDetails={userDetails}
        errorMessage={{ ...errorMessage }}
      />
    ),
  }
  const viewProps = {
    userDetails,
    handleValidation,
    errorMessage,
    //@ts-ignore
    renderComponent: routes[currentRoute.name],
  }

  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Auth
