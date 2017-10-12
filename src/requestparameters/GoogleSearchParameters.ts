const querystring = require("querystring");
import IRequestParameters from "./IRequestParameters";
export default class GoogleSearchParameters implements IRequestParameters {
    query: string;
    private start: number;

    constructor(searchQuery: string) {
        this.query = searchQuery;
        this.start = 0;
    }
    nextPage(): void {
        this.start += 10;
    }
    goToPage(i: number): void {
        if (i >= 0)
            this.start = i * 10;
        // raise error in case i is less than 0;
    }
    getUrl(): string {
        const url = "https://www.google.co.in/search?q=" + this.query + "&start=" + this.start;
        return url;
    }
    getExtraParameters(): any {
        return undefined;
    }
}