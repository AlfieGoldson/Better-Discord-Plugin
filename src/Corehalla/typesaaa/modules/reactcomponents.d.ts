export { Helpers as ReactHelpers };
/**
 * Methods for obtaining and interacting with react components.
 * @module ReactComponents
 * @version 0.0.1
 */
export default class ReactComponents {
    static get components(): Map<any, any>;
    static get unknownComponents(): Set<any>;
    static get listeners(): Map<any, any>;
    static get nameSetters(): Set<any>;
    static get ReactComponent(): typeof ReactComponent;
    static get Helpers(): typeof Helpers;
    static get AutoPatcher(): typeof ReactAutoPatcher;
    static push(component: any, selector: any, filter: any): any;
    /**
     * Finds a component from the components array or by waiting for it to be mounted.
     * @param {String} name The component's name
     * @param {Object} selector A selector to look for
     * @return {Promise<ReactComponent>}
     */
    static getComponentByName(name: string, selector: any): Promise<ReactComponent>;
    /**
     * Finds a component from the components array or by waiting for it to be mounted.
     * @param {String} name The component's name
     * @param {Object} selector A selector to look for
     * @param {Function} filter A function to filter components if a single element is rendered by multiple components
     * @return {Promise<ReactComponent>}
     */
    static getComponent(name: string, selector: any, filter: Function): Promise<ReactComponent>;
    static setName(name: any, filter: any): any;
    static processUnknown(component: any): any;
    static recursiveComponents(internalInstance?: any): any;
}
declare class Helpers {
    static get plannedActions(): Map<any, any>;
    static recursiveArray(parent: any, key: any, count?: number): any;
    static recursiveArrayCount(parent: any, key: any): any;
    static get recursiveChildren(): (parent: any, key: any, index?: number, count?: number) => Generator<any, void, any>;
    static returnFirst(iterator: any, process: any): any;
    static getFirstChild(rootParent: any, rootKey: any, selector: any): any;
    static parseSelector(selector: any): {
        className: any;
        id?: undefined;
    } | {
        id: any;
        className?: undefined;
    } | {
        className?: undefined;
        id?: undefined;
    };
    static findByProp(obj: any, what: any, value: any): any;
    static findProp(obj: any, what: any): any;
    static get React(): any;
    static get ReactDOM(): any;
}
declare class ReactComponent {
    constructor(id: any, component: any, selector: any, filter: any);
    id: any;
    component: any;
    selector: any;
    filter: any;
    forceUpdateAll(): void;
}
declare class ReactAutoPatcher {
    /**
     * Wait for React to be loaded and patch it's createElement to store all unknown components.
     * Also patches some known components.
     */
    static autoPatch(): Promise<void>;
    static autoUnpatch(): Promise<void>;
    /**
     * Finds and processes all currently available react components.
     */
    static processAll(): void;
}
