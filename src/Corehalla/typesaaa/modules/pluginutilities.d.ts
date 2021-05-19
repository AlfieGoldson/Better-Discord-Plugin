/**
 * A series of useful functions for BetterDiscord plugins.
 * @module PluginUtilities
 * @version 0.2.5
 */
export default class PluginUtilities {
    /**
     * Loads data through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {string} key - which key the data is saved under
     * @param {object} defaultData - default data to populate the object with
     * @returns {object} the combined saved and default data
    */
    static loadData(name: string, key: string, defaultData: object): object;
    /**
     * Saves data through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {string} key - which key the data should be saved under
     * @param {object} data - data to save
    */
    static saveData(name: string, key: string, data: object): void;
    /**
     * Loads settings through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {object} defaultData - default data to populate the object with
     * @returns {object} the combined saved and default settings
    */
    static loadSettings(name: string, defaultSettings: any): object;
    /**
     * Saves settings through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {object} data - settings to save
    */
    static saveSettings(name: string, data: object): void;
    /**
     * Get the full path to the BetterDiscord folder.
     * @returns {string} full path to the BetterDiscord folder
     */
    static getBDFolder(subtarget?: string): string;
    /**
     * Get the full path to the plugins folder.
     * @returns {string} full path to the plugins folder
     */
    static getPluginsFolder(): string;
    /**
     * Get the full path to the themes folder.
     * @returns {string} full path to the themes folder
     */
    static getThemesFolder(): string;
    /**
     * Adds a callback to a set of listeners for onSwitch.
     * @param {callable} callback - basic callback to happen on channel switch
     */
    static addOnSwitchListener(callback: any): void;
    /**
     * Removes the listener added by {@link InternalUtilities.addOnSwitchListener}.
     * @param {callable} callback - callback to remove from the listener list
     */
    static removeOnSwitchListener(callback: any): void;
    /**
     * Adds a style to the document.
     * @param {string} id - identifier to use as the element id
     * @param {string} css - css to add to the document
     */
    static addStyle(id: string, css: string): void;
    /**
     * Removes a style from the document.
     * @param {string} id - original identifier used
     */
    static removeStyle(id: string): void;
    /**
     * Adds/requires a remote script to be loaded
     * @param {string} id - identifier to use for this script
     * @param {string} url - url from which to load the script
     * @returns {Promise} promise that resolves when the script is loaded
     */
    static addScript(id: string, url: string): Promise<any>;
    /**
     * Removes a remote script from the document.
     * @param {string} id - original identifier used
     */
    static removeScript(id: string): void;
    static getContextMenu(type: any): Promise<any>;
    static forceUpdateContextMenus(): void;
}
