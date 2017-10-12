import IBaseResource from "./ibaseresource";

export default interface IBaseFactory {
    factoryResources: Array<IBaseResource>;
    getResource(): IBaseResource;
    addResource(resource: IBaseResource): void;
    freeResources(code: number): void;
}