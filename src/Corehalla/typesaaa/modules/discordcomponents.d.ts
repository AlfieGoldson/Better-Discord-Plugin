declare var _default: {
    readonly named: {};
    readonly unknown: Set<any>;
    readonly listeners: Set<any>;
    initialize(): void;
    get(name: any, filter: any): Promise<any>;
    addNamedComponent(component: any): void;
    addUnknownComponent(component: any): void;
    addComponent(component: any): void;
    walkRenderTree(tree: any): void;
    walkReactTree(tree: any): void;
};
export default _default;
