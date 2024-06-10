import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import { isValidEmail } from '@libs/utils'
import Login from '../../components/auth/Login'
import LoginAndSignUp from '../../components/auth/LoginAndSignUp'
import Registration from '../../components/auth/Registration'
import {
  checkEmailExists,
  handleCreateNewUser,
  handleCreateOrUpdateUserData,
  handleLogin,
} from '@izzo/api/src/auth'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { getItemAsync } from '@izzo/shared-async-storage'
import { useQuery } from '@tanstack/react-query'
import { getRegions } from '@izzo/api'

const Auth = (props: any) => {
  const [userDetails, setUserDetails] = useState({
    email: props.route?.params?.email || '',
    password: '',
    name: '',
    surname: '',
    address: '',
    canon: '',
    agb: false,
    canSendOfferAndNews: false,
  })
  const [errorMessage, setErrorMessage] = useState<any>({
    email: '',
    password: '',
    name: '',
    surname: '',
    address: '',
    canon: '',
    agb: false,
    canSendOfferAndNews: false,
  })
  const navigation: any = useNavigation()
  const { t } = useTranslation()

  const currentRoute = props.route

  useEffect(() => {
    ;(async () => {
      const userData: any = await getItemAsync('userDetails')
      const finalUserData = JSON.parse(userData || '{}')
      if (Object.keys(finalUserData).length > 0) {
        navigation.navigate('home')
      } else if(currentRoute.name === 'loginAndSignUp') {
        navigation.navigate('loginAndSignUp')
      }
    })()
  }, [])

  const handleValidation = (name: string, value: string) => {
    
    setUserDetails({ ...userDetails, [name]: value })

    if (name === 'email') {
      if (value !== '' && !isValidEmail(value)) {
        setErrorMessage({
          ...errorMessage,
          email: t('ERROR_MESSAGE.INVALID_EMAIL'),
        })
      } else {
        setErrorMessage('')
      }
    } else if (name === 'password') {
      
      if (value.length < 8) {
        setErrorMessage({
          ...errorMessage,
          password: t('ERROR_MESSAGE.INVALID_PASSWORD'),
        })
      } else {
        setErrorMessage('')
      }
    } else if (name === 'confirmPassword') {
      if (value !== userDetails.password) {
        setErrorMessage({
          ...errorMessage,
          confirmPassword: t('ERROR_MESSAGE.PASSWORD_NOT_MATCH'),
        })
      } else {
        setErrorMessage('')
      }
    }
  }

  const handleSubmit = async ({ type }: { type: string }) => {
    switch (type) {
      case 'login':
        try {
          const response: any = await handleLogin(
            userDetails.email,
            userDetails.password,
          )
          if (response.errorMessage) {
            //@ts-ignore
            toast.hideAll()
            //@ts-ignore
            toast.show(t(response.errorMessage), {
              type: 'danger',
            })
          } else {
            navigation.navigate('home')
          }
        } catch (error) {
          console.log('=> ', { error })
          //@ts-ignore
          toast.hideAll()
          //@ts-ignore
          toast.show(t('ERROR_MESSAGE.INVALID_PASSWORD_CREDENTIAL'), {
            type: 'danger',
          })
          console.error('Error during login:', error)
        }
        break
      case 'loginAndSignup':
        const isExists = await checkEmailExists(userDetails.email)
        if (isExists) {
          navigation.navigate('login', { email: userDetails.email })
        } else {
          navigation.navigate('register', { email: userDetails.email })
        }
        break
      case 'register':
        try {
          const { email, password, name, surname, address, canon } = userDetails
          const userCredential: any = await handleCreateNewUser(email, password)

          if (userCredential?.user) {
            const payload = {
              name,
              surname,
              address,
              canon,
            }
            await handleCreateOrUpdateUserData(email, payload)
          }
          navigation.navigate('home')
        } catch (error) {
          console.error(error)
        }
        break

      default:
        break
    }
  }

  const { data: regionsData } = useQuery({
    queryKey: ['getRegions'],
    queryFn: () => getRegions(),
  })

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )
  const routes = {
    loginAndSignUp: (
      <LoginAndSignUp
        handleValidation={handleValidation}
        handleSubmit={handleSubmit}
        userDetails={userDetails}
        errorMessage={errorMessage}
      />
    ),
    login: (
      <Login
        handleValidation={handleValidation}
        handleSubmit={handleSubmit}
        userDetails={userDetails}
        errorMessage={{ ...errorMessage }}
      />
    ),
    register: (
      <Registration
        handleValidation={handleValidation}
        handleSubmit={handleSubmit}
        userDetails={userDetails}
        errorMessage={{ ...errorMessage }}
        regionsData={regionsData}
      />
    ),
  }
  const viewProps = {
    userDetails,
    handleValidation,
    errorMessage,
    //@ts-ignore
    renderComponent: routes[currentRoute.name],
    regionsData
  }

  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Auth
