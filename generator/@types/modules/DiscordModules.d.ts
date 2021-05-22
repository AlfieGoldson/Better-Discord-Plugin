import type React from 'react';
import type ReactDOM from 'react';

//TODO: types;

export declare class DiscordModules {
    get React(): typeof React;
    get ReactDOM(): typeof ReactDOM;
    get Events(): any;

    /* Guild Info, Stores, and Utilities */
    get GuildStore(): any;
    get SortedGuildStore(): any;
    get SelectedGuildStore(): any;
    get GuildSync(): any;
    get GuildInfo(): any;
    get GuildChannelsStore(): any;
    get GuildMemberStore(): any;
    get MemberCountStore(): any;
    get GuildEmojiStore(): any;
    get GuildActions(): any; // apparently it's back
    get GuildPermissions(): any;

    /* Channel Store & Actions */
    get ChannelStore(): any;
    get SelectedChannelStore(): any;
    get ChannelActions(): any;
    get PrivateChannelActions(): any;
    // Absorbed into ChannelActions
    // get ChannelSelector(): any

    /* Current User Info, State and Settings */
    get UserInfoStore(): any;
    get UserSettingsStore(): any;
    get StreamerModeStore(): any;
    // Not really needed by plugins
    // get AccountManager(): any
    get UserSettingsUpdater(): any;
    get OnlineWatcher(): any;
    get CurrentUserIdle(): any;
    get RelationshipStore(): any;
    get RelationshipManager(): any;
    get MentionStore(): any;

    /* User Stores and Utils */
    get UserStore(): any;
    get UserStatusStore(): any;
    get UserTypingStore(): any;
    get UserActivityStore(): any;
    get UserNameResolver(): any;
    get UserNoteStore(): any;
    get UserNoteActions(): any;

    /* Emoji Store and Utils */
    get EmojiInfo(): any;
    get EmojiUtils(): any;
    get EmojiStore(): any;

    /* Invite Store and Utils */
    get InviteStore(): any;
    get InviteResolver(): any;
    get InviteActions(): any;

    /* Discord Objects & Utils */
    get DiscordConstants(): any;
    get DiscordPermissions(): any;
    get Permissions(): any;
    get ColorConverter(): any;
    get ColorShader(): any;
    get TinyColor(): any;
    get ClassResolver(): any;
    get ButtonData(): any;
    // They removed this
    // get IconNames(): any
    get NavigationUtils(): any;

    /* Discord Messages */
    get MessageStore(): any;
    get ReactionsStore(): any;
    get MessageActions(): any;
    get MessageQueue(): any;
    get MessageParser(): any;

    /* In-Game Overlay */
    // Plugins don't need these
    // get OverlayUserPopoutSettings(): any
    // get OverlayUserPopoutInfo(): any

    /* Experiments */
    get ExperimentStore(): any;
    get ExperimentsManager(): any;
    get CurrentExperiment(): any;

    /* Streams */
    get StreamStore(): any;
    get StreamPreviewStore(): any;

    /* Images, Avatars and Utils */
    get ImageResolver(): any;
    get ImageUtils(): any;
    get AvatarDefaults(): any;

    /* Drag & Drop */
    // No longer a part of their DND arch
    // get DNDActions(): any
    get DNDSources(): any;
    get DNDObjects(): any;

    /* Electron & Other Internals with Utils*/
    get ElectronModule(): any;
    get Flux(): any;
    get Dispatcher(): any;
    get PathUtils(): any;
    get NotificationModule(): any;
    get RouterModule(): any;
    get APIModule(): any;
    get AnalyticEvents(): any;
    get KeyGenerator(): any;
    get Buffers(): any;
    get DeviceStore(): any;
    get SoftwareInfo(): any;
    get i18n(): any;
    // Absorbed into Sentry
    // get CurrentContext(): any

    /* Media Stuff (Audio/Video) */
    get MediaDeviceInfo(): any;
    get MediaInfo(): any;
    get MediaEngineInfo(): any;
    get VoiceInfo(): any;
    // DNE with restructure
    // get VideoStream(): any
    get SoundModule(): any;

    /* Window, DOM, HTML */
    get WindowInfo(): any;
    // Was never needed anyway
    // get TagInfo(): any
    get DOMInfo(): any;

    /* Locale/Location and Time */
    get LocaleManager(): any;
    get Moment(): any;
    get LocationManager(): any;
    get Timestamps(): any;

    /* Strings and Utils */
    get Strings(): any;
    get StringFormats(): any;
    get StringUtils(): any;

    /* URLs and Utils */
    get URLParser(): any;
    get ExtraURLs(): any;

    /* Text Processing */
    get hljs(): any;
    get SimpleMarkdown(): any;

    /* DOM/React Components */
    /* ==================== */
    get LayerManager(): any;
    // Restructured away
    // get Tooltips(): any
    get UserSettingsWindow(): any;
    get ChannelSettingsWindow(): any;
    get GuildSettingsWindow(): any;

    /* Modals */
    get ModalActions(): any;
    get ModalStack(): any;
    get UserProfileModals(): any;
    get AlertModal(): any;
    get ConfirmationModal(): any;
    // Grab with react components or open with UserProfileModals
    // get UserProfileModal() {
    //     return WebpackModules.find(m => {
    //         try {return m.modalConfig && m.prototype.render().type.displayName == "FluxContainer(Component)";}
    //         catch (err) {return false;}
    //     });
    // },
    get ChangeNicknameModal(): any;
    get CreateChannelModal(): any;
    get PruneMembersModal(): any;
    get NotificationSettingsModal(): any;
    get PrivacySettingsModal(): any;
    // No longer available
    // get CreateInviteModal(): any
    get Changelog(): any;
    // Grab with react components
    // get Avatar() {
    //     return WebpackModules.find(m => {
    //         if (m.displayName != "FluxContainer(t)") return false;
    //         try {
    //             const temp = new m();
    //             return temp.state && temp.state.hasOwnProperty("isFocused");
    //         }
    //         catch (err) {return false;}
    //     });
    // },

    /* Popouts */
    get PopoutStack(): any;
    get PopoutOpener(): any;
    // Grab with react components
    // get EmojiPicker(): any
    get UserPopout(): any;

    /* Context Menus */
    get ContextMenuActions(): any;
    get ContextMenuItemsGroup(): any;
    get ContextMenuItem(): any;

    /* Misc */
    get ExternalLink(): any;
    get TextElement(): any;
    get Anchor(): any;
    get Flex(): any;
    get FlexChild(): any;
    get Clickable(): any;
    get Titles(): any;
    get HeaderBar(): any;
    get TabBar(): any;
    get Tooltip(): any;
    get Spinner(): any;

    /* Forms */
    get FormTitle(): any;
    get FormSection(): any;
    get FormNotice(): any;

    /* Scrollers */
    get ScrollerThin(): any;
    get ScrollerAuto(): any;
    get AdvancedScrollerThin(): any;
    get AdvancedScrollerAuto(): any;
    get AdvancedScrollerNone(): any;

    /* Settings */
    get SettingsWrapper(): any;
    get SettingsNote(): any;
    get SettingsDivider(): any;

    get ColorPicker(): any; // Loaded by Discord on demand
    get Dropdown(): any;
    get Keybind(): any;
    get RadioGroup(): any;
    get Slider(): any;
    get SwitchRow(): any;
    get Textbox(): any;
}
