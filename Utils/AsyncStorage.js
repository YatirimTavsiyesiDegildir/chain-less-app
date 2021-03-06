import AsyncStorage from '@react-native-community/async-storage';

const StoreData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@' + key, jsonValue);
  } catch (e) {
    console.log('Saving error: ' + key);
  }
};

const GetData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem('@' + key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Reading error');
  }
};

export {StoreData, GetData};
