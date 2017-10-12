const cheerio = require("cheerio");

export default class GoogleReview {

    private rating: number;
    private reviewsCount: string;
    private desc: string;

    constructor(r: number , t: string, d: string) {
        this.rating = r;
        this.reviewsCount = t;
        this.desc = d;
    }
    parseGoogleReview(content: string) {

    }
    printGoogleReview(): void {
        console.log(this.rating + " -- " + this.reviewsCount + " -- " + this.desc);
    }
}