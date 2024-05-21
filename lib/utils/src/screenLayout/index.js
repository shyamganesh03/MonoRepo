"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withLayoutView = exports.isWeb = exports.getScreenType = exports.ScreenTypes = exports.getScreenTypeLayout = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var desktopWidth = 768;
var tabletWidth = 375;
var getScreenTypeLayout = function (_a) {
    var width = _a.width, Desktop = _a.desktopComponent, Tablet = _a.tabletComponent, Mobile = _a.mobileComponent;
    if (width >= desktopWidth) {
        return Desktop;
    }
    if (width >= tabletWidth) {
        return Tablet;
    }
    return Mobile;
};
exports.getScreenTypeLayout = getScreenTypeLayout;
exports.ScreenTypes = {
    desktop: 'desktop',
    tablet: 'tablet',
    mobile: 'mobile',
};
var getScreenType = function (width) {
    if (width >= desktopWidth) {
        return exports.ScreenTypes.desktop;
    }
    if (width >= tabletWidth) {
        return exports.ScreenTypes.tablet;
    }
    return exports.ScreenTypes.mobile;
};
exports.getScreenType = getScreenType;
var isWeb = function (width) { return (0, exports.getScreenType)(width) === exports.ScreenTypes.desktop; };
exports.isWeb = isWeb;
var withLayoutView = function (DesktopComponent, TabletComponent, MobileComponent) {
    function LayoutView(props) {
        var width = (0, react_native_1.useWindowDimensions)().width;
        var ScreenComponent = (0, exports.getScreenTypeLayout)({
            width: width,
            desktopComponent: DesktopComponent,
            tabletComponent: TabletComponent,
            mobileComponent: MobileComponent,
        });
        if (ScreenComponent) {
            return react_1.default.createElement(ScreenComponent, __assign({}, props));
        }
        return null;
    }
    return LayoutView;
};
exports.withLayoutView = withLayoutView;
//# sourceMappingURL=index.tsx.map