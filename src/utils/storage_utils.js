import { AsyncStorage } from 'react-native'
import { store } from '../../App'
import { setPair } from '../actions'

export const getSetOfflineVisitors = async currentVisitor => {
    let newVisitors = []
    let currentSavedVisitors = await getOfflineVisitor()

    if (currentSavedVisitors !== "") {

        let currentSavedVisitorsObj = JSON.parse(currentSavedVisitors)
        newVisitors = currentSavedVisitorsObj
        newVisitors.push(currentVisitor)
        newVisitors = JSON.stringify(newVisitors)
    } else {

        newVisitors.push(currentVisitor)
        newVisitors = JSON.stringify(newVisitors)
    }



    saveOfflineVisitor(newVisitors)
}

export const saveOfflineVisitor = async JsonData => {
    try {
        await AsyncStorage.setItem("noqnoqOfflineVisitor", JsonData);
    } catch (error) {
        console.log(error.message)
    }
}

export const getOfflineVisitor = async () => {
    let JsonData = ""
    try {
        JsonData = (await AsyncStorage.getItem("noqnoqOfflineVisitor")) || "";
    } catch (error) {
        console.log(error.message)
    }

    return JsonData
}

export const saveLanguageData = async JsonData => {
    try {
        await AsyncStorage.setItem("noqnoqLanguage", JsonData);
    } catch (error) {
        console.log(error.message)
    }
}

export const getLanguageData = async () => {
    let JsonData = ""
    try {
        JsonData = (await AsyncStorage.getItem("noqnoqLanguage")) || "";
    } catch (error) {
        console.log(error.message)
    }
    return JsonData
}


export const saveJsonData = async JsonData => {
    try {
        await AsyncStorage.setItem("noqnoqJsonData", JsonData);
    } catch (error) {
        console.log(error.message)
    }
}

export const getJsonData = async () => {
    let JsonData = ""
    try {
        JsonData = (await AsyncStorage.getItem("noqnoqJsonData")) || "";
    } catch (error) {
        console.log(error.message)
    }

    return JsonData
}

export const savePairCode = async pairCode => {
    try {
        await AsyncStorage.setItem("noqnoqPairCode", pairCode);
    } catch (error) {
        console.log(error.message);
    }
};

export const getPairCode = async () => {
    let pairCode = "";
    try {
        pairCode = (await AsyncStorage.getItem("noqnoqPairCode")) || "";
        store.dispatch(setPair(pairCode))
    } catch (error) {
        console.log(error.message);
    }
    return pairCode;
};

export const saveSelectedLanguage = async selectedLanguage => {
    try {
        await AsyncStorage.setItem("noqnoqSelectedLanguage", selectedLanguage);
    } catch (error) {
        console.log(error.message);
    }
};

export const getSelectedLanguage = async () => {
    let selectedLanguage = "";
    try {
        selectedLanguage = (await AsyncStorage.getItem("noqnoqSelectedLanguage")) || "";
    } catch (error) {
        console.log(error.message);
    }
    return selectedLanguage;
};



