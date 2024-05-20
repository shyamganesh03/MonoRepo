import AsyncStorage from "@react-native-async-storage/async-storage";

export function deleteItemAsync(key: string) {
  return AsyncStorage.removeItem(key);
}

export function getItemAsync(key: string) {
  return AsyncStorage.getItem(key);
}

export function setItemAsync(key: string, data: any) {
  return AsyncStorage.setItem(key, data);
}
