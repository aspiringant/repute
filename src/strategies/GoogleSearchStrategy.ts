import app from "../server";
import PhantomJSResource from "../factories/PhantomJSResource";
import IBaseFactory from "../factories/IBaseFactory";
import PhantomJSFactory from "../factories/PhantomJSFactory";
import GoogleSearchParameters from "../requestparameters/GoogleSearchParameters";
import GoogleSearchParser from "../models/GoogleSearchParser";
import IStrategy from "./IStrategy";


export default class GoogleSearchStrategy implements IStrategy {
    private searchQuery: string;
    private googleParser: GoogleSearchParser;
    constructor(queryStr: string) {
        this.searchQuery = queryStr;
        this.googleParser = new GoogleSearchParser();
    }
    async executeStrategy() {
        const searchParameters: GoogleSearchParameters = new GoogleSearchParameters(this.searchQuery);
        this.googleParser.parseContent(await (<PhantomJSFactory>app.get("phantomjsfactory") ).getResource().callUrl(searchParameters.getUrl()));
        searchParameters.nextPage();
        this.googleParser.parseContent(await (<PhantomJSFactory>app.get("phantomjsfactory") ).getResource().callUrl(searchParameters.getUrl()));
        this.googleParser.printGoogleData();
    }

    executeStrategyCasper() {
        /*casperInstance.start("http://www.google.co.in", () => {
            casperInstance.waitForSelector('form[action="/search"]');
        });
        casperInstance.then(() => {
            casperInstance.fill('form[action="/search"]', { q: that.searchQuery }, true);
        });
        casperInstance.then(function() {
            that.links = that.links.concat(this.evaluate(that.getLinksFromSearchPage));
        });
        casperInstance.run(() => {
        });
        casperInstance.freeResource(undefined);
        return this.links;*/
    }
}