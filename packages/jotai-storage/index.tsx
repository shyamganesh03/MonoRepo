import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const pendingUserAtom = atom({});
const appTheme = atomWithStorage('appTheme', 'light');

export { pendingUserAtom, appTheme };
