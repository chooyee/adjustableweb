class Context { 

    constructor () {
        
        require('dotenv').config();       
        this.AWS = {};
        this.AWS.ACCESS_KEY = process.env.AWS_ACCESS_KEY;
        this.AWS.SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
        this.AWS.S3BUCKET = process.env.S3Bucket;
        this.BasePath = process.env.BasePath;
        this.ExpressPort = process.env.PORT;
        this.Environment = process.env.environment;
    }


}

module.exports = new Context();
