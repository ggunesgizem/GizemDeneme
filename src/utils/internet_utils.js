import NetInfo from '@react-native-community/netinfo'

export const checkNetConnection = async () => {
    var checkNet;
    await NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        console.log('PROMISE',state.isConnected)
        checkNet = state.isConnected

    }).catch((err) => { console.log(err) });

    return checkNet
}