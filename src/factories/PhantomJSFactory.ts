import IBaseFactory from "./ibasefactory";
import PhantomJSResource from "./PhantomJSResource";

export default class PhantomJSFactory implements IBaseFactory {
    factoryResources: Array<PhantomJSResource>;
     constructor(numResource: number) {
        this.factoryResources = new Array<PhantomJSResource>();
        let i: number = 0;
        for (i = 0; i < numResource; i = i + 1) {
            const res: PhantomJSResource = new PhantomJSResource(this);
            this.factoryResources.push(res);
        }
    }
    async activateResources() {
        let i: number = 0;
        for (i = 0; i < this.factoryResources.length; i = i + 1) {
            this.factoryResources[i].createInstance(i);
        }
    }
    getResource(): PhantomJSResource {
        if (this.factoryResources.length > 0)
            return this.factoryResources.pop();
        else
            throw new Error("All resources exhausted");
    }
    addResource(resource: PhantomJSResource) {
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