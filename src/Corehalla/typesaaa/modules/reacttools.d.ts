export default class ReactTools {
    /**
     * Performs reflection on a specific node.
     * @param {(HTMLElement|jQuery|Selector)} node - node or selector to reflect on.
     */
    static Reflect(node: (HTMLElement | any | any)): {
        node: any;
        readonly el: any;
        readonly element: any;
        readonly reactInternalInstance: any;
        readonly props: any;
        readonly state: any;
        readonly stateNode: any;
        readonly stateNodes: any[];
        getComponentStateNode(component: any): any;
        findStateNode(filter: any): any;
        readonly component: any;
        readonly components: any[];
        getComponentByProps(props: any, selector: any): any;
        getComponentByPrototypes(props: any, selector: any): any;
        getComponentByRegex(regex: any, selector: any): any;
        getComponentByDisplayName(name: any): any;
        forceUpdate(filter: any): void;
        prop(propName: any): any;
    };
    static get rootInstance(): any;
    /**
     * Grabs the react internal instance of a specific node.
     * @param {(HTMLElement|jQuery)} node - node to obtain react instance of
     * @return {object} the internal react instance
     */
    static getReactInstance(node: (HTMLElement | any)): object;
    /**
     * Grabs a value from the react internal instance. Allows you to grab
     * long depth values safely without accessing no longer valid properties.
     * @param {(HTMLElement|jQuery)} node - node to obtain react instance of
     * @param {string} path - path to the requested value
     * @return {(*|undefined)} the value requested or undefined if not found.
     */
    static getReactProperty(node: (HTMLElement | any), path: string): (any | undefined);
    /**
     * Grabs a value from the react internal instance. Allows you to grab
     * long depth values safely without accessing no longer valid properties.
     * @param {(HTMLElement|jQuery)} node - node to obtain react instance of
     * @param {object} options - options for the search
     * @param {array} [options.include] - list of items to include from the search
     * @param {array} [options.exclude=["Popout", "Tooltip", "Scroller", "BackgroundFlash"]] - list of items to exclude from the search
     * @param {callable} [options.filter=_=>_] - filter to check the current instance with (should return a boolean)
     * @return {(*|null)} the owner instance or undefined if not found.
     */
    static getOwnerInstance(node: (HTMLElement | any), { include, exclude, filter }?: {
        include?: any[];
        exclude?: any[];
        filter?: any;
    }): (any | null);
    /**
     * Creates and renders a react element that wraps dom elements.
     * @param {(HTMLElement|Array<HTMLElement>)} element - element or array of elements to wrap into a react element
     * @returns {object} - rendered react element
     */
    static createWrappedElement(element: (HTMLElement | Array<HTMLElement>)): object;
    /**
     * Creates an unrendered react component that wraps dom elements.
     * @param {(HTMLElement|Array<HTMLElement>)} element - element or array of elements to wrap into a react component
     * @returns {object} - unrendered react component
     */
    static wrapElement(element: (HTMLElement | Array<HTMLElement>)): object;
}
