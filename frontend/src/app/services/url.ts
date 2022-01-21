// export const URLServicio = 'http://www.tangocart-api.ml/servicio/';  

const getURL = () => {

    let grupo = JSON.parse(localStorage.getItem('grupo'));

    switch (Number(grupo)) {
        case 1:
            return "1";
            return "http://34.125.203.249";
        case 2:
            return "http://174.138.109.46";
        case 3:
            return "http://sa-g6.herokuapp.com";
        case 4:
            return "http://35.192.90.40:4000";
        case 5:
            return "http://34.125.95.83:4000";
        case 6:
            // return "http://localhost:3000";
            return "http://34.125.129.171:3000";
        case 7:
            return "http://34.125.197.251:3000";
        case 8:
            return "http://3.12.103.111:4000";
        default:
            return "http://34.125.129.171:3000";
    }

}


export const URLServicio = getURL();

