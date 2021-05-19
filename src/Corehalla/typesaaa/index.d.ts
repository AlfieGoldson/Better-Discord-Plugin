import { ColorConverter } from './modules';

export type PluginFactory = (Plugin: Plugin, Api: IApi) => void;

declare class Plugin {}

interface IApi {
    ColorConverter: ColorConverter;
    Components: Components;
    ContextMenu: ContextMenu;
    WebpackModules: WebpackModules;
    ReactTools: never;
    Patcher: never;
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
