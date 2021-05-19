export default class DiscordAPI {
    static get InsufficientPermissions(): any;
    static get List(): any;
    static get User(): any;
    static get Channel(): any;
    static get Guild(): any;
    static get Message(): any;
    static get UserSettings(): any;
    /**
     * A list of loaded guilds.
     */
    static get guilds(): any;
    /**
     * A list of loaded channels.
     */
    static get channels(): any;
    /**
     * A list of loaded users.
     */
    static get users(): any;
    /**
     * An object mapping guild IDs to their member counts.
     */
    static get memberCounts(): any;
    /**
     * A list of guilds in the order they appear in the server list.
     */
    static get sortedGuilds(): any;
    /**
     * An array of guild IDs in the order they appear in the server list.
     */
    static get guildPositions(): any;
    /**
     * The currently selected guild.
     */
    static get currentGuild(): any;
    /**
     * The currently selected channel.
     */
    static get currentChannel(): any;
    /**
     * The current user.
     */
    static get currentUser(): any;
    /**
     * A list of the current user's friends.
     */
    static get friends(): any;
}
