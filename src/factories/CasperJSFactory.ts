import IBaseFactory from "./ibasefactory";
import CasperJSResource from "./casperjsresource";
import app from "../server";


export default class CasperJSFactory implements IBaseFactory {
    factoryResources: Array<CasperJSResource>;
    constructor(numResource: number) {
        this.factoryResources = new Array<CasperJSResource>();
        let i: number = 0;
        for (i = 0; i < numResource; i = i + 1) {
           // this.factoryResources.push(new CasperJSResource(this));
        }
    }
    getResource(): CasperJSResource {
        if (this.factoryResources.length > 0)
            return this.factoryResources.pop();
        else
            throw new Error("All resources exhausted");
    }
    addResource(resource: CasperJSResource) {
        this.factoryResources.push(resource);
    }
    freeResources(code: number): void {

        if (code == undefined)
            code = 0;
        this.factoryResources.forEach(element => {
            element.freeResource(code);
        });
    }
}