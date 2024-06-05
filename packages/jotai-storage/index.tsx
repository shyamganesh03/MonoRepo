import { atomWithStorage } from 'jotai/utils'

const themeSwitchAtom = atomWithStorage('appTheme', 'dark')

const preferredLanguageAtom = atomWithStorage('preferredLanguage', 'en')

export { themeSwitchAtom, preferredLanguageAtom }
