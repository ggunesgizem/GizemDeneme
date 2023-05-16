import { createConnection, startAndConnectMethod } from '../utils'
import { CONNECTION, PRINTER_GUEST } from '../constants/reducer_types'
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import { store } from '../../App'

export const dispatchConnection = (connection) => {
    if (connection) {
        return async dispatch => {
            console.log('dispatch içi')
            dispatch({
                type: CONNECTION,
                payload: connection
            })
        }
    }
}

export const setPrinterGuest = (data) => {


    let dataArray = []
    const storeFromRedux = store.getState()
    const printGuestFromRedux = storeFromRedux.signalr_connection.printerGuest

    if (printGuestFromRedux.length === 0) {
        printData(data)
    } else {
        let guestCheck = false
        if (printGuestFromRedux.length > 0) {
            printGuestFromRedux.forEach(element => {
                if (JSON.stringify(element) === JSON.stringify(data)) {
                    guestCheck = true
                }
            });
        }
        if (!guestCheck) {
            dataArray.push(data)
            return dispatch => {
                dispatch({
                    type: PRINTER_GUEST,
                    payload: dataArray
                })
            }
        }
    }
}

export const removePrinterGuest = (data) => {
    let dataArray = []
    const storeFromRedux = store.getState()
    dataArray = storeFromRedux.signalr_connection.printerGuest
    if (JSON.stringify(dataArray[0]) === JSON.stringify(data)) {
        dataArray.shift()
        console.log('DELETED.', dataArray)
    }
    return dispatch => {
        dispatch({
            type: PRINTER_GUEST,
            payload: dataArray
        })
    }
}

async function printData(data) {
    RNHTMLtoPDF.convert({

        html: `
        <head>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">                                
        <style>
        body{font-family: 'Quicksand', sans-serif;}
        span{font-size: 40px;}
        .badge{margin:0;padding:0;}
        @media print { 
            
            
            body {
                page-break-after: avoid;
                page-break-before: avoid;
               
                } 
            }

        .ust {  
            padding: 0px 20px 0px 20px;
            text-align:center;
            width:100%;
            display: block;}

        .ust span {display: block;}

        .ust img {display: inline-block;padding-bottom:0px;}
        
        .orta {  
            padding: 0px 0px 5px 0px;
            float: left;
            text-align: center;
            display: block;
            width:100%;
        }

        .orta img {display:block;padding-top:10px;}

        h1 {margin: 0;font-size:45px;text-align: center;}

        .orta span {display: block;text-align: center;}

        .ZiyaretLabel {

            background: black;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 20px;
            margin-top: 10px;
            font-size: 23px;
            font-weight:bold;
            width:60%;
            margin-left:16%;
        }

        .alt {  
            padding: 0px 20px 5px 20px;
            float: left;
            display: block;
            width:100%;
            }

        .alt span {display: block;}

        .KareKod {
            border: 2px solid #000000;
            border-radius: 10px;
            width: 360px;
            height: 360px;
            display:block;
            margin-left:24%;
            
        }

        .tarihSaat {display:block;margin-top:10px;margin-left:28%;}

        .noqnoqLogo {margin-top: 20px; display:block;margin-left:46%;}

        .customerLogo {max-width:250px;max-height:100px}

    </style>
        </head>
        <body>
        <div class="badge cevir">
        
        <header class="ust">
           <img class="customerLogo" src="${data.customerLogo}"/>
    
        </header>
    
        <content class="orta">
    
        <h1 style="margin-top: 10px; font-size:60px">${data.guestFullName}</h1>  <!-- GuestFullName -->
        <span>${data.GuestCompanyName}</span>  <!-- GuestCompanyName(Ziyaret Tipinden) -->
        <span id="isim">${data.HostFullName}<br>${data.HostCompany}</span>  <!--HostFullName / HostCompany -->
           
    
        </content>
    
        <footer class="alt">
       ${data.guestQRSvg}
        <span class="tarihSaat">${data.fullDate} - ${data.time}</span>  <!-- DateTimeNow -->
        <span class="ZiyaretLabel"><p>${data.visitorType}</p></span>  <!-- 32 Karakterden sonra ... -->
        <img class="noqnoqLogo" src="data:image/png;base64, ${data.base64Noqnoq}" >
        </footer>
        
                                </div>
        
        
        </body>

        
        
    `,
        fileName: 'test',
        base64: true
    }).then((result) => {
        RNPrint.print({ printerURL: data.printURL, filePath: result.filePath }).then((value) => {
            console.log('after print')
            removePrinterGuest(data)
            const storeFromRedux = store.getState()
            dataArray = storeFromRedux.signalr_connection.printerGuest
            if (dataArray.length > 0) {
                if(dataArray.length > 1){
                    if (JSON.stringify(dataArray[0]) !== JSON.stringify(data)) {
                        printData(dataArray[0])
                    }else{
                        printData(dataArray[1])
                    }
                }else{
                    if (JSON.stringify(dataArray[0]) !== JSON.stringify(data)) {
                        printData(dataArray[0])
                    }
                }
                
                printData(dataArray[0])
            }
        }).catch(() => {

        })
    })
}