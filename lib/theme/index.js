"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var darkTheme_1 = require("./src/darkTheme");
var lightTheme_1 = require("./src/lightTheme");
var typography_1 = require("./src/typography");
var spacing_1 = require("./src/spacing");
var ThemeContext = react_1.default.createContext({
    theme: darkTheme_1.DarkTheme,
    setTheme: function () { },
});
exports.default = { ThemeContext: ThemeContext, LightTheme: lightTheme_1.LightTheme, DarkTheme: darkTheme_1.DarkTheme, typography: typography_1.typography, spacing: spacing_1.spacing };
//# sourceMappingURL=index.js.map