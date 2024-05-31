import { atomWithStorage } from 'jotai/utils'

const themeSwitchAtom = atomWithStorage('appTheme', 'dark')

export { themeSwitchAtom }
