import app from "../server";
import PhantomJSResource from "../factories/PhantomJSResource";
import IBaseFactory from "../factories/IBaseFactory";
import PhantomJSFactory from "../factories/PhantomJSFactory";
import GoogleTrendsParameters from "../requestparameters/GoogleTrendsParameters";
import GoogleTrendsParser from "../models/GoogleTrendsParser";
import IStrategy from "./IStrategy";
const googleTrends = require("google-trends-api");

export default class GoogleSearchStrategy implements IStrategy {
    private searchQuery: string;
    private googleTrendsParser: GoogleTrendsParser;
    constructor(queryStr: string) {
        this.searchQuery = queryStr;
        this.googleTrendsParser = new GoogleTrendsParser();
    }
    async executeStrategy() {
        /*const trendsParameters: GoogleTrendsParameters = new GoogleTrendsParameters(this.searchQuery);
        this.googleTrendsParser.parseContent(await (<PhantomJSFactory>app.get("phantomjsfactory") ).getResource().callUrl(trendsParameters.getUrl()));
        this.googleTrendsParser.printGoogleData();
        */
        const res = await googleTrends.relatedTopics({keyword: this.searchQuery});
        console.log(res);

    }
}