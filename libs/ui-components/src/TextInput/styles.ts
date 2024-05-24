import { StyleSheet } from 'react-native'
import { spacing } from '@libs/theme'
import { typography } from '@libs/theme'

export const styles = StyleSheet.create({
  inputStyle: {
    ...typography.body1,
    borderColor: 'transparent',
    borderWidth: 0.5,
    flex: 1,
    height: '100%',
    paddingHorizontal: spacing.spacing4,
  },
  inputLabelStyle: {
    marginBottom: spacing.spacing3,
  },
})
