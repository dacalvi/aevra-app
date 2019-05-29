import { AsyncStorage } from "react-native";
// react-native's version of local storage
export const KEY = "token";

export const onSignIn = () => AsyncStorage.setItem(KEY, "true");
// set storage to hold key as TRUE
export const setStorage = (data) => AsyncStorage.setItem('data', JSON.stringify(data));
// set storage to hold user data
export const onSignOut = () => AsyncStorage.removeItem(KEY);
//if user signs out, remove TRUE key

export const getStorageData = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('data')
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(KEY)
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};