import React from 'react';
import ReactDOM from 'react-dom';

interface Settings {
    type: 'collection' | 'category' | 'switch' | 'dropdown';
    id: string;
    name: string;
    button: { title: string; onClick: () => void };
    settings?: Settings[];
    collapsible?: boolean;
    note?: string;
}

/**
 * options to modify the modal
 * @param danger - whether the main button should be red or not. Default=**false**
 * @param confirmText - text for the confirmation/submit button. Default=**"Okay"**
 * @param cancelText - text for the cancel button. Default=**"Cancel"**
 * @param onConfirm - callback to occur when clicking the submit button. Default=**NOOP**
 * @param onCancel - callback to occur when clicking the cancel button. Default=**NOOP**
 */
interface ConfirmationModalOptions {
    danger?: boolean;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

/**
 *
 * @param type - Changes the type of the toast stylistically and semantically. Default=**""**
 * @param icon - Determines whether the icon should show corresponding to the type. A toast without type will always have no icon. Default=**true**
 * @param timeout - Adjusts the time (in ms) the toast should be shown for before disappearing automatically. Default=**3000**
 * @param forceShow - Whether to force showing the toast and ignore the bd setting. Default=**false**
 */
interface ToastOptions {
    type?: '' | 'info' | 'success' | 'danger' | 'error' | 'warning' | 'warn';
    icon?: boolean;
    timeout?: number;
    forceShow?: boolean;
}

interface Addon {}

interface AddonAPI {
    folder: string;
    isEnabled?: (idOrFile: string) => boolean;
    enable?: (idOrAddon: string | Addon) => void;
    disable?: (idOrAddon: string | Addon) => void;
    toggle?: (idOrAddon: string | Addon) => void;
    reload?: (idOrFileOrAddon: string | Addon) => void;
    get?: (idOrFile: string) => Addon;
    getAll?: () => Addon[];
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
 * @param caller - Name of the caller of the patch function. Using this you can undo all patches with the same name using {@link Patcher.unpatchAll}. Use `""` if you don't care.
 * @param moduleToPatch - Object with the function to be patched. Can also patch an object's prototype.
 * @param functionName - Name of the method to be patched
 * @param callback - Function to run instead of the original method
 * @param options - Object used to pass additional options.
 * @return Function with no arguments and no return value that should be called to cancel (unpatch) this patch. You should save and run it when your plugin is stopped.
 */
type PatchFn<Type extends PatchType = PatchType> = (
    caller: string,
    moduleToPatch: object,
    functionName: string,
    callback: () => void,
    options: PatchFnOptions<Type>,
) => () => void;

export interface BdApi {
    React: typeof React;
    ReactDOM: typeof ReactDOM;
    WindowConfigFile: '';
    settings: Settings[];

    Emotes: typeof Proxy; // TODO: type
    version: string;

    getAllWindowPreferences: () => void;
    /**
     * @deprecated
     */
    getWindowPreference: () => null;
    setWindowPreference: () => void;

    /**
     * Inject CSS to document head
     * @param id id of element
     * @param css custom css
     */
    injectCSS: (id: string, css: any) => void;

    /**
     * Clear css/remove any element
     * @param id id of element
     */
    clearCSS: (id: string) => void;

    /**
     * Inject JS to specific element
     * @param id id of element
     * @param url script url
     */
    linkJS: (id: string, url: string) => Promise<void>;

    /**
     * Remove JS script from element
     * @param id id of element
     */
    unlinkJS: (id: string) => void;

    /**
     * Shows a generic but very customizable modal.
     * @param title - title of the modal.
     * @param content - a string of text to display in the modal.
     */
    alert: (title: string, content: JSX.Element) => void;

    /**
     * Shows a generic but very customizable confirmation modal with optional confirm and cancel callbacks.
     * @param title - title of the modal
     * @param content - a single or mixed array of react elements and strings. Everything is wrapped in Discord's `TextElement` component so strings will show and render properly.
     * @param options - options to modify the modal {@link ConfirmationModalOptions}
     */
    showConfirmationModal: (title: string, content: JSX.Element, options: ConfirmationModalOptions) => void;

    /**
     * This shows a toast similar to android towards the bottom of the screen.
     * @param content The string to show in the toast.
     * @param options Options object. Optional parameter.
     */

    showToast: (content: string, options: ToastOptions) => void;

    /**
     * Finds a single module
     * @param filter Function used to filter modules
     */
    findModule: (filter: (module: any) => boolean) => any; //FIXME: Module type

    /**
     * Finds all modules
     * @param filter Function used to filter modules
     */
    findAllModules: (filter: (module: any) => boolean) => any[]; //FIXME: Module type

    /**
     * Finds a single module
     * @param props Module Props
     */
    findModuleByProps: (...props: string[]) => any; //FIXME: Module type

    /**
     * Finds all modules
     * @param props Module Props
     */
    findModuleByPrototypes: (...props: string[]) => any[]; //FIXME: Module type

    /**
     * Finds a single module
     * @param name Module name
     */
    findModuleByDisplayName: (name: string) => any; //FIXME: Module type

    /**
     * Gets react instance
     * @param node DOM Element
     */
    getInternalInstance: (node: Node) => any; //FIXME: React instance type

    /**
     * Gets plugin data
     * @param pluginName Plugin name
     * @param key
     */
    loadData: (pluginName: string, key: string) => object; //FIXME: plugin data type

    /**
     * Gets plugin data
     * @param pluginName Plugin name
     * @param key
     */
    getData: (pluginName: string, key: string) => object; //FIXME: plugin data type;

    /**
     * Sets plugin data
     * @param pluginName Plugin name
     * @param key
     * @param data data
     */
    saveData: (pluginName: string, key: string, data: object) => void; //FIXME: plugin data type;

    /**
     * Sets plugin data
     * @param pluginName Plugin name
     * @param key
     * @param data data
     */
    setData: (pluginName: string, key: string, data: object) => void; //FIXME: plugin data type;

    /**
     * Deletes plugin data
     * @param pluginName Plugin name
     * @param key
     */
    deleteData: (pluginName: string, key: string) => void;

    /**
     * Patches other functions
     * @param what
     * @param methodName Name of method to patch
     * @param options
     * @returns
     */
    monkeyPatch: (
        what: never,
        methodName: string,
        options: { before?: never; after?: never; instead?: never; once: boolean; callerId: string }, //FIXME: types
    ) => () => void;

    /**
     * Event when element is removed
     * @param node DOM Element
     * @param callback Function called when element is removed
     */
    onRemoved: (node: Node, callback: () => void) => Node;

    /**
     * Wraps function in try..catch
     * @param method Method to be wrapped
     * @param callback Function called when element is removed
     * @param message Error Message
     */
    suppressErrors: <Fn extends (...params: unknown[]) => unknown>(method: Fn, message: string) => Fn;

    /**
     * Tests for valid JSON
     * @param data JSON Data
     */
    testJSON: (data: string) => object | false;

    isSettingEnabled: (collection: string, category: string, id: string) => Settings;

    enableSetting: (collection: string, category: string, id: string) => void;

    disableSetting: (collection: string, category: string, id: string) => void;

    toggleSetting: (collection: string, category: string, id: string) => void;

    // Gets data
    getBDData: (key: string) => object;

    // Sets data
    setBDData: (key: string, data: object) => void;

    Plugin: AddonAPI;
    Themes: AddonAPI;

    Patcher: {
        patch: PatchFn;
        before: PatchFn<'before'>;
        instead: PatchFn<'instead'>;
        after: PatchFn<'after'>;
        unpatchAll: (caller: string) => void;
    };
}
