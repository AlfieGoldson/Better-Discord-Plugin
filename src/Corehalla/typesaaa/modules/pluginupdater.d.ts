/**
 * Function that gets the remote version from the file contents.
 * @param {string} fileContent - the content of the remote file
 * @returns {string} - remote version
 * @callback module:PluginUpdater~versioner
 */
/**
 * Comparator that takes the current version and the remote version,
 * then compares them returning `true` if there is an update and `false` otherwise.
 * @param {string} currentVersion - the current version of the plugin
 * @param {string} remoteVersion - the remote version of the plugin
 * @returns {boolean} - whether the plugin has an update or not
 * @callback module:PluginUpdater~comparator
 */
export default class PluginUpdater {
    static get CSS(): any;
    /**
     * Checks for updates for the specified plugin at the specified link. The final
     * parameter should link to the raw text of the plugin and will compare semantic
     * versions.
     * @param {string} pluginName - name of the plugin
     * @param {string} currentVersion - current version (semantic versioning only)
     * @param {string} updateURL - url to check for update
     * @param {module:PluginUpdater~versioner} [versioner] - versioner that finds the remote version. If not provided uses {@link module:PluginUpdater.defaultVersioner}.
     * @param {module:PluginUpdater~comparator} [comparator] - comparator that determines if there is an update. If not provided uses {@link module:PluginUpdater.defaultComparator}.
     */
    static checkForUpdate(pluginName: string, currentVersion: string, updateURL: string, versioner?: any, comparator?: any): void;
    /**
     * Will check for updates and automatically show or remove the update notice
     * bar based on the internal result. Better not to call this directly and to
     * instead use {@link module:PluginUpdater.checkForUpdate}.
     * @param {string} pluginName - name of the plugin to check
     * @param {string} updateLink - link to the raw text version of the plugin
     */
    static processUpdateCheck(pluginName: string, updateLink: string): Promise<any>;
    /**
     * The default versioner used as {@link module:PluginUpdater~versioner} for {@link module:PluginUpdater.checkForUpdate}.
     * This works on basic semantic versioning e.g. "1.0.0". You do not need to provide this as a versioner if your plugin adheres
     * to this style as this will be used as default.
     * @param {string} currentVersion
     * @param {string} content
     */
    static defaultVersioner(content: string): string;
    /**
     * The default comparator used as {@link module:PluginUpdater~comparator} for {@link module:PluginUpdater.checkForUpdate}.
     * This works on basic semantic versioning e.g. "1.0.0". You do not need to provide this as a comparator if your plugin adheres
     * to this style as this will be used as default.
     * @param {string} currentVersion
     * @param {string} content
     */
    static defaultComparator(currentVersion: string, remoteVersion: any): boolean;
    static patchPluginList(): void;
    /**
     * Creates the update button found in the plugins page of BetterDiscord
     * settings. Returned button will already have listeners to create the tooltip.
     * @returns {HTMLElement} check for update button
     */
    static createUpdateButton(): HTMLElement;
    /**
     * Will download the latest version and replace the the old plugin version.
     * Will also update the button in the update bar depending on if the user
     * is using RestartNoMore plugin by square {@link https://github.com/Inve1951/BetterDiscordStuff/blob/master/plugins/restartNoMore.plugin.js}
     * @param {string} pluginName - name of the plugin to download
     * @param {string} updateLink - link to the raw text version of the plugin
     */
    static downloadPlugin(pluginName: string, updateLink: string): void;
    /**
     * Will show the update notice top bar seen in Discord. Better not to call
     * this directly and to instead use {@link module:PluginUpdater.checkForUpdate}.
     * @param {string} pluginName - name of the plugin
     * @param {string} updateLink - link to the raw text version of the plugin
     */
    static showUpdateNotice(pluginName: string, updateLink: string): void;
    /**
     * Will remove the plugin from the update notice top bar seen in Discord.
     * Better not to call this directly and to instead use {@link module:PluginUpdater.checkForUpdate}.
     * @param {string} pluginName - name of the plugin
     */
    static removeUpdateNotice(pluginName: string): void;
}
/**
 * :PluginUpdater~versioner
 */
export type module = () => any;
