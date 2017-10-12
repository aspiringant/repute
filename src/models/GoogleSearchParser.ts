import GoogleLink from "./GoogleLink";
import GoogleReview from "./GoogleReview";
const cheerio = require("cheerio");
const fs = require("fs");
export default class GoogleSearchParser {
    private googleLinks: Array<GoogleLink>;
    private googleReview: GoogleReview;

    constructor() {
        this.googleLinks = new Array();
    }
    parseContent(content: string) {
        const contentArray: Array<string> = content.split("<!DOCTYPE html>");
        // fs.writeFile("/tmp/test", contentArray[1]);
        const C = cheerio.load(contentArray[1], {
            xmlMode: false,
            decodeEntities: true,
            recognizeCDATA: false
        });
        // console.log(C("body").html());
        C("div.g").each((i: number, elem: any) => {
            let r = undefined;
            if (C(C(elem).children()[1]).children().length > 3) {
                r = C(C(C(elem).children()[1]).children()[1]).text();
            }
            const l = C(C(elem).find("a")[0]).attr("href");
            const t = C(C(elem).find(".st")[0]).text();
            const c = C(C(elem).find("cite")[0]).text();
            const g: GoogleLink = new GoogleLink(l, t, c, r);
            g.toString();
            this.googleLinks.push(g);
        });
        if (C("#rhs_block span").length > 0) {
            const r = C(C("#rhs_block span")[0]).text();
            const c = C(C("#rhs_block span")[1]).text();
            const d = C(C("#rhs_block span")[2]).text();
            this.googleReview = new GoogleReview(r, c, d);
        }
    }
    printGoogleData() {
        console.log(this.googleLinks);
        this.googleReview.printGoogleReview();
    }
}