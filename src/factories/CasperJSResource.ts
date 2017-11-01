import IBaseResource from "./IBaseResource";
import { Casper } from "casperjs";
import IBaseFactory from "./IBaseFactory";


export default class CasperJSResource extends Casper implements IBaseResource {
    factoryInstance: IBaseFactory;
    constructor(factoryResource: IBaseFactory) {
        super({
            pageSettings: {
                loadImages:  false,        // The WebPage instance used by Casper will
                loadPlugins: false         // use these settings
            },
            logLevel: "info",              // Only "info" level messages will be logged
            verbose: true
        });
        this.factoryInstance = factoryResource;
    }
    execute(url: string): void {
        this.start(url, () => {});
        this.run(() => {});
    }
    freeResource(code: number): void {
        if (code === 0) {
            this.exit();
        } else {
            this.exit();
        }
    }
}
