const querystring = require("querystring");
import IRequestParameters from "./IRequestParameters";
export default class GoogleTrendsParameters implements IRequestParameters {
    query: string;
    constructor(searchQuery: string) {
        this.query = searchQuery;
    }
    getUrl(): string {
        const url = "https://trends.google.com/trends/explore?q=" + this.query;
        return url;
    }
    getExtraParameters(): any {
        return undefined;
    }
}