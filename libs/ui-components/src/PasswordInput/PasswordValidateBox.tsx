import React from 'react'
import { View } from 'react-native'
import { Icon } from '../../../icons/output'
import { spacing } from '@libs/theme'
import Text from '../Text/Text'
import { useTheme } from '@react-navigation/native'

interface PasswordValidateBoxProps {
  errorLabel: string
  data: any
  isFocused: boolean
}

const PasswordValidateBox = ({
  errorLabel,
  data,
  isFocused,
}: PasswordValidateBoxProps) => {
  const theme: any = useTheme()

  return (
    <View
      style={[styles.validatorBox, { color: theme.colors.backgroundSurface2 }]}
    >
      {errorLabel.length > 0 && <ErrorLabelContainer errorLabel={errorLabel} />}
      {data?.map((v: any, index: number) => (
        <View
          style={[
            styles.validatorLabelContainer,
            {
              marginBottom: index + 1 !== v?.length ? 10 : 0,
            },
          ]}
          key={index.toString()}
        >
          <RenderIcon data={v} isFocused={isFocused} />
          <Text
            variant="body2"
            color={
              !v?.checkStatus && !isFocused
                ? theme.colors.onAlertContainer
                : theme.colors.textPrimary
            }
            style={{ marginLeft: spacing.spacing3 }}
          >
            {v.checkLabel}
          </Text>
        </View>
      ))}
    </View>
  )
}

const ErrorLabelContainer = ({ errorLabel }) => {
  const theme: any = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: spacing.spacing3,
      }}
    >
      <Icon
        color={theme.colors.onAlertContainer}
        height={13.33}
        name="ExclamationErrorIcon"
        width={13.33}
      />
      <Text
        color={theme.colors.onAlertContainer}
        style={{
          marginLeft: 3.33,
        }}
        variant="bodyCompactBold2"
      >
        {errorLabel}
      </Text>
    </View>
  )
}

const RenderIcon = (props: any) => {
  const { data, isFocused } = props
  const theme: any = useTheme()

  if (!data?.checkStatus && !isFocused) {
    return (
      <View
        style={[
          styles.validateErrorTickContainer,
          { backgroundColor: theme.colors.onAlertContainer },
        ]}
      >
        <Icon
          name="CloseIcon"
          color={theme.colors.backgroundSurface1}
          width={5.31}
          height={5.07}
        />
      </View>
    )
  }
  if (data?.checkStatus) {
    return (
      <View
        style={[
          styles.validateTickContainer,
          { backgroundColor: theme.colors.secondary1 },
        ]}
      >
        <Icon
          name="TickIcon"
          color={theme.colors.backgroundSurface1}
          width={6.76}
          height={5.07}
        />
      </View>
    )
  }
  return (
    <View
      style={[
        styles.inValidateTickContainer,
        { borderColor: theme.colors.border },
      ]}
    />
  )
}

const styles = {
  validatorBox: {
    paddingVertical: spacing.spacing4,
    paddingHorizontal: spacing.spacing5,
    width: '100%',
    borderRadius: 8,
    marginBottom: spacing.spacing3,
  },
  validatorLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  validateTickContainer: {
    width: 10,
    height: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  validateErrorTickContainer: {
    width: 10,
    height: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inValidateTickContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    width: 10,
    height: 10,
    borderRadius: 50,
  },
}

export default PasswordValidateBox
