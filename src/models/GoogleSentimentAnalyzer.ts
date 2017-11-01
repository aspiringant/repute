require("@google-cloud/storage");
const Language = require("@google-cloud/language");
import HTTPRequest from "../factories/HTTPRequest";

export default class GoogleSentimentAnalyzer {
    // Imports the Google Cloud client library.
    private language: any;
    public constructor() {
      this.language = new Language();
    }
    // tslint:disable-next-line:semicolon
     async callLanguageApiByPackage() {
        // this.storage = new Storage();
        // Detects the sentiment of the text
        const text = "Upkar properties/estates are real fraud people. they had developed layouts which do not have proper conversion order. Upkar residency one of their first layouts is also fully fraud is is now getting acquired by BDA. Upkar medows has problem, Upkar ockland has full problem.";
        const document = {
          "content": text,
          type: "PLAIN_TEXT"
        };
        const results: any = await this.language.analyzeSentiment({"document": document});
        console.log(results);
        const sentiment = results[0].documentSentiment;
        console.log(`Text: ${text}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    }

    async callLanguageApi() {
      const text = "Upkar properties/estates are real fraud people. they had developed layouts which do not have proper conversion order. Upkar residency one of their first layouts is also fully fraud is is now getting acquired by BDA. Upkar medows has problem, Upkar ockland has full problem.";
      const options: any = {
        method: "POST",
        uri: "https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyCM_CaTs25dhrqhkW8Bq5sxsHHS5yJUZ30",
        body: {
          "encodingType": "UTF8",
          "document": {
            "type": "PLAIN_TEXT",
            "content": text
          }
        },
        json: true // Automatically stringifies the body to JSON
      };
      const res = await HTTPRequest.makeSecurePostRequest(options);
      console.log(res);
    }
}