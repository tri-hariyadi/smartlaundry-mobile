import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return e;
  }
};

export const getData = async (key: any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    return e;
  }
};

export const removeData = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    return e;
  }
};
