const context = require('../service/context.service');
const logger = require('../infrastructure/logger');
const Enum = require('../infrastructure/enum.util');
const FetchService = require('../service/fetch.service');

class DashHandler {

    constructor() {
        this.basePath = context.BasePath
        this.baseApiEndpoint = `${this.basePath}/api/v1/SavePlus`
    }

    QueryParser = (req)=>{
        const d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth()+1;
        let dd = d.getDate();
        let dateFrom =`${yyyy}-${mm}-01`
        let dateTo =`${yyyy}-${mm}-${dd}`
        //console.log(req.query.dateFrom)
        if (req.query.dateFrom!==undefined) dateFrom = req.query.dateFrom
        if (req.query.dateTo!==undefined) dateTo = req.query.dateTo
        
        return `?env=${req.query.env}&dateFromStr=${dateFrom}&dateToStr=${dateTo}`
    }

    DropOffGroupByEvents = async(req, res) =>{
        let queryParams = this.QueryParser(req)       
        let session=req.session

        let dropOffEndpoint = `${this.baseApiEndpoint}/GetDropOffByEvents`+ queryParams   
        var dropOffDataSet = await FetchService.FetchData(dropOffEndpoint, session.accessToken)
        //console.log(`dropoff: ${dropOffDataSet.data.length}`)
        let allEventsEndpoint = `${this.baseApiEndpoint}/GetAllEvents` + queryParams       
        var allEventDataSet = await FetchService.FetchData(allEventsEndpoint, session.accessToken)
        //console.log(`dropoff: ${dropOffDataSet.data.length}`)
        let gateCrasherEndpoint = `${this.baseApiEndpoint}/GetGateCrasher` + queryParams       
        var gateCrasherDataSet = await FetchService.FetchData(gateCrasherEndpoint, session.accessToken)
        //console.log(`dropoff: ${gateCrasherDataSet.data.length}`)
        return {status:Enum.Status.Success,data:{dropOffDataSet:dropOffDataSet, allEventDataSet:allEventDataSet, gateCrasherDataSet:gateCrasherDataSet}}
        //return dropOffDataSet
    }

    AllEvents = async(req, res) =>{
        let endpoint = `${this.baseApiEndpoint}/GetAllEvents`
        let queryParams = this.QueryParser(req)
        endpoint +=queryParams;
        //console.log(endpoint)
        let session=req.session

        return await FetchService.FetchData(endpoint, session.accessToken)
    }

    GetGateCrasher = async(req, res) =>{
        let endpoint = `${this.baseApiEndpoint}/GetGateCrasher`
        let queryParams = this.QueryParser(req)
        endpoint +=queryParams;
        //console.log(endpoint)
        let session=req.session

        return await FetchService.FetchData(endpoint, session.accessToken)
        
    }
    GetConversions = async(req, res) =>{       
        let endpoint = `${this.baseApiEndpoint}/GetConversions`
       
        let queryParams = this.QueryParser(req)
        endpoint +=queryParams;
        //console.log(endpoint)
        let session=req.session

        return await FetchService.FetchData(endpoint, session.accessToken)
    }

    GetCarryForwardConversion = async(req, res) =>{        
        let endpoint = `${this.baseApiEndpoint}/GetCarryForwardConversion`
       
        let queryParams = this.QueryParser(req)
        endpoint +=queryParams;
        //console.log(endpoint)
        let session=req.session

        return await FetchService.FetchData(endpoint, session.accessToken)
    }

    GetFullJourneyConversion = async(req, res) =>{       
        let endpoint = `${this.baseApiEndpoint}/GetFullJourneyConversion`
       
        let queryParams = this.QueryParser(req)
        endpoint +=queryParams;
        //console.log(endpoint)
        let session=req.session

        return await FetchService.FetchData(endpoint, session.accessToken)
    }    
}

module.exports = new DashHandler();