import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const pendingUserAtom = atom({})
const themeSwitchAtom = atomWithStorage('appTheme', 'light')

export { pendingUserAtom, themeSwitchAtom }
