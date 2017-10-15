import * as https from "https";
import * as http from "http";
import IBaseResource from "./ibaseresource";
const rp = require("request-promise");

export default class HTTPRequest implements IBaseResource {
    static async makeHTTPSGet(hostStr: string, pathStr: string) {
        const options = {
            host: hostStr,
            path: pathStr,
            method: "GET"
        };
        const res = await https.get(options);
        return res;
    }

    static async makeSecureGetRequest(options: any) {
        return await rp(options);
    }

    static async makeSecurePostRequest(options: any) {
        return await rp(options);
    }
    static makeGetRequest(url: string): any {
        http.get(url, (res) => {
            console.log("STATUS: " + res.statusCode);
            res.setEncoding("utf8");
            let rawData = "";
            res.on("data", (chunk: string) => {
                rawData += chunk;
            });
            res.on("end", () => {
                try {
                  const parsedData = JSON.parse(rawData);
                  console.log(parsedData);
                  return parsedData;
                } catch (e) {
                  console.error(e.message);
                }
              });
        }).end();
    }

    freeResource(code: number): void {}
}
