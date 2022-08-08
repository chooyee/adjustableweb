const context = require('../service/context.service');
const logger = require('../infrastructure/logger');
const Enum = require('../infrastructure/enum.util');
const FetchService = require('../service/fetch.service');

class TrackerHandler {

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

    

    GetTrackerConversion = async(req, res) =>{
        let endpoint = `${this.baseApiEndpoint}/GetConversionByTracker`
        let queryParams = this.QueryParser(req)
        endpoint +=queryParams;
        console.log(req.session)
        let session=req.session

        return await FetchService.FetchData(endpoint, session.accessToken)        
    }

    GetConversionByDevice = async(req, res) =>{
        let endpoint = `${this.baseApiEndpoint}/GetConversionByDevice`
        let queryParams = this.QueryParser(req)
        endpoint +=queryParams;
        console.log(req.session)
        let session=req.session

        return await FetchService.FetchData(endpoint, session.accessToken)        
    }

    GetConversionByCampaign = async(req, res) =>{
        let endpoint = `${this.baseApiEndpoint}/GetConversionByCampaign`
        let queryParams = this.QueryParser(req)
        endpoint +=queryParams;
        console.log(req.session)
        let session=req.session

        return await FetchService.FetchData(endpoint, session.accessToken)        
    }

    GetConversionByCity = async(req, res) =>{
        let endpoint = `${this.baseApiEndpoint}/GetConversionByCity`
        let queryParams = this.QueryParser(req)
        endpoint +=queryParams;
        console.log(req.session)
        let session=req.session

        return await FetchService.FetchData(endpoint, session.accessToken)        
    }
}

module.exports = new TrackerHandler();