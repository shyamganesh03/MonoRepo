"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useDebounce = function (fn, delay) {
    var timer = (0, react_1.useRef)(null);
    var debouncedFn = (0, react_1.useCallback)(fn, [fn, delay]);
    var execute = (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timer.current);
        timer.current = setTimeout(function () { return debouncedFn.apply(void 0, args); }, delay);
    }, [debouncedFn, delay]);
    return execute;
};
exports.default = useDebounce;
//# sourceMappingURL=useDebounce.js.map