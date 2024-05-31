/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { View, StyleSheet, Alert } from 'react-native'
import { spacing } from '@libs/theme'

const myErrorHandler = (error: any) => {
  // Sentry.captureException(error)
  Alert.alert('Something went wrong', error.toString())
}

const CustomFallback = () => <View style={styles.container} />

const ErrorHandler = ({ children }: any) => (
  <ErrorBoundary
    FallbackComponent={CustomFallback}
    onError={myErrorHandler}
    onReset={() => {}}
    resetKeys={['test']}
  >
    {children}
  </ErrorBoundary>
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: spacing.spacing4,
  },
})

export default ErrorHandler
