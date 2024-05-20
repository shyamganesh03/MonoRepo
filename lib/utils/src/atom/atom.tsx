import { atomWithStorage } from "jotai/utils";

const appTheme = atomWithStorage("themeState", "light");

export default appTheme;
