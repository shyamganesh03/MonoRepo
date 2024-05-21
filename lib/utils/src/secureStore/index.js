"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setItemAsync = exports.getItemAsync = exports.deleteItemAsync = void 0;
var async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
function deleteItemAsync(key) {
    return async_storage_1.default.removeItem(key);
}
exports.deleteItemAsync = deleteItemAsync;
function getItemAsync(key) {
    return async_storage_1.default.getItem(key);
}
exports.getItemAsync = getItemAsync;
function setItemAsync(key, data) {
    return async_storage_1.default.setItem(key, data);
}
exports.setItemAsync = setItemAsync;
//# sourceMappingURL=index.tsx.map