// import { ColorConverter } from './modules';

type Constructor<T> = new (...args: any[]) => T;

export type PluginFactory = (Plugin: Constructor<Plugin>, Api: IApi) => Constructor<Plugin>;

interface Settings {
    type: 'collection' | 'category' | 'switch' | 'dropdown';
    id: string;
    name: string;
    button: { title: string; onClick: () => void };
    settings?: Settings[];
    collapsible?: boolean;
    note?: string;
}

declare abstract class Plugin {
    _config: never;
    _enabled: never;
    defaultSettings: { hide: boolean }; //TODO: change

    getName(): string;
    getDescription(): string;
    getVersion(): string;
    getAuthor(): string;
    load(): string;
    stop(): string;
    get isEnabled(): string;
    get strings(): string[];
    set strings(strings: string[]);

    abstract onStart(): void;
    abstract onStop(): void;

    guildListPatch(): void;
    guildFolderExpandedPatch(): void;
    guildFolderIconPatch(): void;
    folderPatches: {};

    constructor(asd: string);
}

type PatchType = 'before' | 'after' | 'instead' | '';

/**
 * Object used to pass additional patch options.
 * @param displayName You can provide meaningful name for class/object provided in `what` param for logging purposes. By default, this function will try to determine name automatically.
 * @param forcePatch Set to `true` to patch even if the function doesnt exist. (Adds noop function in place).
 */
interface PatchFnOptions<Type extends PatchType = PatchType> {
    displayName?: string;
    forcePatch?: boolean;
    type?: Type;
}

/**
 * Patch Function
 * @param moduleToPatch - Object with the function to be patched. Can also patch an object's prototype.
 * @param functionName - Name of the method to be patched
 * @param callback - Function to run instead of the original method
 * @param options - Object used to pass additional options.
 * @return Function with no arguments and no return value that should be called to cancel (unpatch) this patch. You should save and run it when your plugin is stopped.
 */
type PatchFn<Type extends PatchType = PatchType> = (
    moduleToPatch: object,
    functionName: string,
    callback: () => void,
    options?: PatchFnOptions<Type>,
) => () => void;

interface IApi {
    ColorConverter: ColorConverter;
    Components: Components;
    ContextMenu: ContextMenu;
    WebpackModules: WebpackModules;
    ReactTools: never;
    Patcher: {
        getPatchesByCaller: () => never;
        unpatchAll: () => never;
        before: PatchFn<'before'>;
        after: PatchFn<'after'>;
        instead: PatchFn<'instead'>;
    };
    DiscordModules: never;
    Utilities: never;
    DCM: never;
}

declare class Components {
    ErrorBoundary: ErrorBoundary;
}

declare class ErrorBoundary {}

/**
 * @deprecated
 */
declare class ContextMenu {
    ImageItem: ImageItem;
    ItemGroup: ItemGroup;
    Menu: Menu;
    SubMenuItem: SubMenuItem;
    TextItem: TextItem;
    ToggleItem: ToggleItem;
    udpateDiscordMenu: (menu: any) => any;
}

declare class ImageItem {}

declare class ItemGroup {}

declare class Menu {}

declare class SubMenuItem {}

declare class TextItem {}

declare class ToggleItem {}

declare class DCM {
    buildMenu: (setup: any) => any;
    buildMenuChildren: (setup: any) => any;
    buildMenuItem: (props: any) => any;
    forceUpdateMenus: () => any;
    getDiscordMenu: () => any;
    openContextMenu: (event, menuComponent, config) => any;
    patchComponents: () => any;
    patchMenuItem: () => any;
    patchToggleItem: () => any;
}

declare class DOMTools {}

declare class WebpackModules {
    getByProps: (...props: string[]) => any;
}
