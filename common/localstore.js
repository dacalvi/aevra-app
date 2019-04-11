import React from 'react';
import { AsyncStorage } from 'react-native';
export default class LocalStore {
    
    storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('Error Saving AsyncStorage Kye/Value ' + key + ':' + value + ' ' + error);
        }
    };
      
    getData = async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.log("Error Retrieving AsyncStorage Data Key: " + key);
        }
    };

    getAllData = async () => {
        try{
            return await AsyncStorage.getAllKeys();
        } catch (error){
            console.log("Error Retrieving AsyncStorage Data");
        }
    }
}