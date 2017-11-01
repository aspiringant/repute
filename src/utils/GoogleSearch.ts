const querystring = require("querystring");

import HTTPRequest from "../factories/HTTPRequest";
import app from "../server";
export let callGoogleSearch = (keyword: string) => {
    const url = "www.googleapis.com";
    const api_key = process.env.GOOGLE_SEARCH_API_KEY;
    const search_engine_id = process.env.GOOGLE_SEARCH_ENGINE;

    const parameters = "/customsearch/v1?key=" + api_key + "&cx=" + search_engine_id + "&q=" + querystring.escape(keyword);
    console.log(url + parameters);
    const res = HTTPRequest.makeHTTPSGet(url, parameters);
    // const res = app.get("phantomjsfactory").getResource().callUrl(url + parameters);
};