import { HubConnectionBuilder, LogLevel, HttpTransportType, TimeoutError } from '@aspnet/signalr'
import { signalrUrl, URL } from '../constants/endpoints'
import { checkNetConnection } from './internet_utils'
import { store } from '../../App'
import { Actions } from 'react-native-router-flux'
import { setSignalrInfo, dispatchConnection, setPrinterGuest } from '../actions'
import { getPairCode, savePairCode } from './storage_utils'
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import { base64Badge, base64Noqnoq, base64QR } from '../constants'
import moment from 'moment'

export const createConnection = () => {
    console.log('signalr connection created.')
    return hubConnection = new HubConnectionBuilder()
        .withUrl(signalrUrl, {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
        })
        // .configureLogging(LogLevel.Debug)
        .build()


}

export const setConnectionIfNotExists = (connection) => {
    if (!connection) {
        connection = createConnection(connection)
    }
    startAndConnectMethod(connection)
}

const startMethod = (connection) => {
    console.log('start method', connection)
    //    console.log('FROMSTART', isNetConnected)
    if (connection.state === 0) {
        connection
            .start()
            .then(() => {
                console.log('Connection started. Start from util')
                store.dispatch(dispatchConnection(connection))

                flag = false;
            })
            .catch(err => {
                console.log('error connection', err)
                // startMethod(connection);
            })
    }
}

export const subscribeToPairingSignals = (pairingDoneHandler, pairingRemovedHandler) => {
    if (connection.state === 0) {
        connection.on('PairCode', pairingDoneHandler);
        connection.on('DeleteIpad', pairingRemovedHandler);
    }
}

export const startAndConnectMethod = async (connection) => {
    console.log('startandconnect method')
    if (connection.state === 0) {
        startMethod(connection);
        connection.onclose(function () {
            console.log('connection closed.')
            // startMethod(connection);
            store.dispatch(dispatchConnection(connection))

        });

        connection.on('ChangeInLocation', (message) => {
            console.log('ChangeInLocation method.')
        })

        connection.on('DeleteIpad', async function (settings) {
            const currentPair = await getPairCode()
            if (settings.device.pairCode === currentPair) {
                await savePairCode("").then(() => {
                    Actions.pairPage()
                })
            }
        })

        connection.on("GetAllSettings", function (settings) {
            if (store !== undefined) {
                const storeFromRedux = store.getState()
                const currentLocationId = storeFromRedux.json_code.jsonData.Settings.LocationAccountSetting.Id

                if (currentLocationId === settings.devices[0].entrance.locationId) {
                    const currentPage = storeFromRedux.page.currentPage

                    if (currentPage === "homePage") {

                        Actions.loadingPage();

                    } else {
                        store.dispatch(setSignalrInfo(true))
                    }
                }
            }
        });
        connection.on("PrintBadge", function (data) {
            console.log(data)
            if (data.printIP !== undefined && data.printIP !== null) {

                let myPairCode = store.getState().createIpad.pairCode

                if (myPairCode === data.pairCode) {
                    fetch(URL + "api/GetToken?pairCode=" + data.pairCode, {
                        headers: {
                            Accept: "application/json"
                        }
                    }).then(response => response.json()).then((responseJson) => {
                        if (!responseJson.Status && responseJson.Message === 'Could not verify pairCode.') {
                            Actions.pairPage();
                            return;
                        }
                        fetch(URL + "api/GetVisitorInfoForBadgePrint?guestId=" + data.guestId, {
                            headers: new Headers({
                                Authorization: "Bearer " + responseJson.Token,
                                "Content-Type": "application/json"
                            }),
                            method: 'POST',
                            body: JSON.stringify({ guestId: data.guestId })
                        }).then((response) => response.json().then(responseJsonLast => {
                            let jsonData = store.getState().json_code.jsonData
                            let guestFullName = responseJsonLast.FullName === null || responseJsonLast.FullName === undefined ? "" : responseJsonLast.FullName
                            guestFullName = guestFullName.split(' ')
                            guestFullName = guestFullName[0] + " " + guestFullName[guestFullName.length - 1]

                            let customerLogo = responseJsonLast.CustomerLogo
                            let HostFullName = responseJsonLast.HostName === null || responseJsonLast.HostName === undefined ? "" : responseJsonLast.HostName
                            let HostCompany = responseJsonLast.HostCompanyName === null || responseJsonLast.HostCompanyName === undefined ? "" : responseJsonLast.HostCompanyName
                            let qrCode = responseJsonLast.QRCode === null || responseJsonLast.QRCode === undefined ? "ERROR" : responseJsonLast.QRCode
                            let GuestCompanyName = responseJsonLast.GuestCompanyName === null || responseJsonLast.GuestCompanyName === undefined ? "" : responseJsonLast.GuestCompanyName
                            let visitorType = null
                            let date = new Date()
                            let currentDay = date.getDate()
                            currentDay < 10 ? currentDay = '0' + currentDay : null
                            let currentMonth = date.getMonth() + 1
                            currentMonth < 10 ? currentMonth = '0' + currentMonth : null
                            let fullDate = currentDay + '.' + currentMonth + '.' + date.getFullYear()

                            jsonData.Settings.VisitorTypes.forEach(element => {
                                if (element.Id === responseJsonLast.VisitorTypeId) {
                                    if (element.Name.length > 32) {
                                        visitorType = element.Name.substring(0, 32) + '...'
                                    } else {
                                        visitorType = element.Name
                                    }
                                }
                            });

                            var QRCode = require('qrcode')
                            var guestQRSvg = null

                            QRCode.toString(qrCode, { type: 'svg' }, function (err, url) {
                                let svgSplit = "<svg class='KareKod' " + url.split('<svg ')[1]
                                guestQRSvg = svgSplit
                            })

                            // let printURL = `ipp://${data.printIP}.:631/ipp/print`
                            let printURL = `http://${data.printIP}/`

                            let time = moment().format()
                            time = time.split('T')[1]
                            time = time.split('+')[0]
                            time = time.split(':')[0] + ':' + time.split(':')[1]


                            let lastData = {
                                customerLogo,
                                GuestCompanyName,
                                guestFullName,
                                HostFullName,
                                HostCompany,
                                guestQRSvg,
                                fullDate,
                                time,
                                visitorType,
                                base64Noqnoq,
                                printURL,

                            }

                            store.dispatch(setPrinterGuest(lastData))

                            // RNHTMLtoPDF.convert({

                            //     html: `
                            //     <head>
                            //     <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">                                
                            //     <style>
                            //     body{font-family: 'Quicksand', sans-serif;}
                            //     span{font-size: 35px;}
                            //     .badge{margin:0;padding:0;}
                            //     @media print { 


                            //         body {
                            //             page-break-after: avoid;
                            //             page-break-before: avoid;

                            //             } 
                            //         }

                            //     .ust {  
                            //         padding: 20px;


                            //         display: block;}

                            //     .ust span {display: block;}

                            //     .ust img {display: inline-block;padding-bottom:10px;}

                            //     .orta {  
                            //         padding: 20px 0;
                            //         float: left;
                            //         text-align: center;
                            //         display: block;
                            //         width:100%;
                            //     }

                            //     .orta img {display:block;padding-top:10px;}

                            //     h1 {margin: 0;font-size:45px;text-align: center;}

                            //     .orta span {display: block;text-align: center;}

                            //     .ZiyaretLabel {

                            //         background: black;
                            //         color: white;
                            //         padding: 10px;
                            //         text-align: center;
                            //         border-radius: 20px;
                            //         margin-top: 10px;
                            //         font-size: 23px;
                            //         font-weight:bold;
                            //         width:60%;
                            //         margin-left:16%;
                            //     }

                            //     .alt {  
                            //         padding: 0px 20px 20px 20px;
                            //         float: left;
                            //         display: block;
                            //         width:100%;
                            //         }

                            //     .alt span {display: block;}

                            //     .KareKod {
                            //         border: 1px solid #707070;
                            //         border-radius: 10px;
                            //         width: 360px;
                            //         height: 360px;
                            //         display:block;
                            //         margin-left:24%;

                            //     }

                            //     .tarihSaat {display:block;margin-top:20px;margin-left:28%;}

                            //     .noqnoqLogo {margin-top: 20px; display:block;margin-left:46%;}

                            //     .customerLogo {max-width:130px;max-height:45px;margin-left:40%}

                            // </style>
                            //     </head>
                            //     <body>
                            //     <div class="badge cevir">

                            //     <header class="ust">
                            //        <img class="customerLogo" src="${customerLogo}"/>

                            //     </header>

                            //     <content class="orta">

                            //         <h1 style="margin-top: 20px;">${guestFullName}</h1>  <!-- GuestFullName -->
                            //         <span>${GuestCompanyName}</span>  <!-- GuestCompanyName(Ziyaret Tipinden) -->
                            //         <hr>
                            //         <span id="isim">${HostFullName}<br>${HostCompany}</span>  <!--HostFullName / HostCompany -->


                            //     </content>

                            //     <footer class="alt">
                            //     <!-- <img class="KareKod" src="data:image/png;base64, ${base64QR}" > E-postasına gönderilen KareKod ile aynı -->
                            //    ${guestQRSvg}
                            //     <span class="tarihSaat">${fullDate} - ${time}</span>  <!-- DateTimeNow -->
                            //     <span class="ZiyaretLabel"><p>${visitorType}</p></span>  <!-- 32 Karakterden sonra ... -->
                            //     <img class="noqnoqLogo" src="data:image/png;base64, ${base64Noqnoq}" >
                            //     </footer>

                            //                             </div>


                            //     </body>



                            // `,
                            //     fileName: 'test',
                            //     base64: true
                            // }).then((result) => {
                            //     RNPrint.print({ printerURL: printURL, filePath: result.filePath }).then((value) => {

                            //     }).catch(() => {

                            //     })
                            // })
                        }))
                    })
                }
            }
        });

    }


}
// export const printBadge = async () => {
//     let myPairCode = store.getState().createIpad.pairCode
//     let connection = store.getState().signalr_connection.signalrConnection

//     connection.invoke('PrintBadge', myPairCode, "2007", "1234");


// }