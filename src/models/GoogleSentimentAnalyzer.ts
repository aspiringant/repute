require("@google-cloud/storage");
require("@google-cloud/language");

export default class GoogleSentimentAnalyzer {
    // Imports the Google Cloud client library.
    private readonly storage: any;
    private readonly language: any;
    constructor() {
        this.storage = new Storage();
        this.language = new Language();
        const text = "Upkar properties/estates are real fraud people. they had developed layouts which do not have proper conversion order. Upkar residency one of their first layouts is also fully fraud is is now getting acquired by BDA. Upkar medows has problem, Upkar ockland has full problem.";
        const document = {
          "content": text,
          type: "PLAIN_TEXT"
        };

        // Detects the sentiment of the text
        this.language.analyzeSentiment({"document": document})
          .then((results: any) => {
            const sentiment = results[0].documentSentiment;

            console.log(`Text: ${text}`);
            console.log(`Sentiment score: ${sentiment.score}`);
            console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
          })
          .catch((err: any ) => {
            console.error("ERROR:", err);
          });
    }


}