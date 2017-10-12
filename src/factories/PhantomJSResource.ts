import IBaseResource from "./ibaseresource";
import IBaseFactory from "./ibasefactory";

const phantom = require("phantom");


export default class PhantomJSResource {
    nativeInstance: any;
    nativePage: any;
    factoryInstance: IBaseFactory;
    constructor(factoryResource: IBaseFactory) {
        this.factoryInstance = factoryResource;
    }
    async createInstance(i: number) {
        this.nativeInstance = await phantom.create();
        this.nativePage = await this.nativeInstance.createPage();
        console.log("created instance" + i);
    }
    async callUrl(url: string) {
        await this.nativePage.on("onResourceRequested", function(requestData: any ) {
            console.info("Requesting", requestData.url);
        });
        const status = await this.nativePage.open(url, {
            loadImages: false,
            userAgent: "'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'"
        });
        const content = await this.nativePage.property("content");
        this.factoryInstance.addResource(this);
        return content;
    }
    freeResource(code: number): void {
        if (code == 0) {
            this.nativeInstance.exit();
        } else {
            this.nativeInstance.kill();
        }
    }
}
