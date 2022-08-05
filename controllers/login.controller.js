const axios = require('axios');
const context = require('../service/context.service');
const logger = require('../infrastructure/logger');
const Enum = require('../infrastructure/enum.util');
const https = require('https');

class LoginHandler {

    constructor() {
        this.basePath = context.BasePath
        this.endpoints = this.basePath + "/api/Token/login"
    }

    Login = async(req, res) =>{
        let email = req.body.txtemail
        let password = req.body.txtpwd
        console.log('LoginHandler:Login');
        const loginData = {
            "email": email,
            "password": password          
        }
        const agent = new https.Agent({  
            rejectUnauthorized: false
        });

        axios.post(this.endpoints, loginData,{ httpsAgent: agent })
        .then(response => { 
            console.log(response.data);
            let session=req.session;
            session.accessToken = response.data.accessToken
            session.refreshToken = response.data.refreshToken
            session.email = email
            session.displayName = response.data.displayName
            res.redirect(`/dashboard`)
            
        })
        .catch(error => {
            console.log(error);
            logger.log.error('LoginHandler:Login :' + error); 
            res.redirect(`/?error=${error}`)   
        });
    }

}

module.exports = new LoginHandler();