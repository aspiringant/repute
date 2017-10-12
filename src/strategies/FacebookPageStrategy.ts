import IStrategy from "./IStrategy";
import HTTPRequest from "../factories/HTTPRequest";
const graph = require("fbgraph");

export default class FacebookPageStrategy implements IStrategy {
        fbLink: string;

        constructor(l: string) {
            this.fbLink = l;
        }
        async executeStrategy() {
            const linkArr: Array<string> = this.fbLink.split("/");
            const fbPageName: string = linkArr[linkArr.length - 1];
            /*graph.setVersion("2.10");
            graph.setAccessToken("EAAVPABxSyeMBAGRwNMb6elaVV2NudY1iGEvXrew8FenCpcShRpkoswYNmR9yUMxBh1JZAyU8tWyTNBZCZBMyASkZBdwt3mDZApYzo8PV4hgezkdEJAQ9r4NZAml7O6ZC1izybi2TJMuH428DLjJZCx5Pb2RwBVlWMT3tGztRtZBaeegScsVHZAsrkKCEyXUmVVPB8ZD");
            const res = await graph.get(fbPageName + "?fields=about,access_token,fan_count");*/
            const url = "https://graph.facebook.com/v2.10/" + fbPageName + "?fields=about,access_token,fan_count&access_token=EAAVPABxSyeMBAKceag0egfnDcQGrQK1KIouHfbuZB8xDIldzq50qrh2XsmFc8nxRGWXcNKdE1ytZBA5Br8ujnNytZC5mHm0NuwQCVCTkT5jDjzCR0QCzxp6K1sKX8LQ3IBohGZCcZCMTJFlZA0ifK427GubXv4whH4W7QurbmnYn9H3etoJYyR09cmmSNYtdgZD";
            const res = await HTTPRequest.makeSecureGetRequest({
                uri: url,
                json: true
            });
            console.log(res);
        }
}