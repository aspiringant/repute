import GoogleTrendTopic from "./GoogleTrendTopic";
const cheerio = require("cheerio");
const fs = require("fs");
export default class GoogleTrendsParser {
    private googleTrendTopics: Array<GoogleTrendTopic>;

    constructor() {
        this.googleTrendTopics = new Array();
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
        C("widget[type='fe_related_queries'] item").each((i: number, elem: any) => {
            const t = C(C(elem).find("span")[0]).text();
            const s = C(C(elem).find(".progress-value")[0]).text();
            const g: GoogleTrendTopic = new GoogleTrendTopic(t, s);
            g.toString();
            this.googleTrendTopics.push(g);
        });
    }
    printGoogleData() {
        console.log(this.googleTrendTopics);
    }
}