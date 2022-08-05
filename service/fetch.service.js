const https = require('https');
const axios = require('axios');
const logger = require('../infrastructure/logger');
const Enum = require('../infrastructure/enum.util');
class FetchService
{
    constructor() {
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false, // (NOTE: this will disable client verification)
            // cert: fs.readFileSync("./usercert.pem"),
            // key: fs.readFileSync("./key.pem"),
            // passphrase: "YYY"
        })
        this.axiosInstance = axios.create({ httpsAgent })
    }

    FetchData = async(endpoint, token)=>{       
        logger.log.error(`endpoint : ${endpoint}`);  

        const headers = {
            'Authorization': 'Bearer ' + token
        }
        console.log(headers)
        return this.axiosInstance.get(endpoint,{headers:headers})
        .then(response => { 
            //console.log(response.data)
            return {status:Enum.Status.Success, data:response.data};            
        })
        .catch(error => {       
            console.log(error.message)    
            logger.log.error('FetchService :' + error.message);  
            return {status:Enum.Status.Fail, message:error.message};
        });
    }
}

module.exports = new FetchService();