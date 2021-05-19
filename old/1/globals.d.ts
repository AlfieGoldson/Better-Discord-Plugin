declare global {
    interface Window {
        BDFDB_Global: BDFDB_Global;
    }
    let BdApi: BdApi;
    type PluginLoader = (plugin: [Plugin, BDFDB]) => Plugin;
    class DiscordPlugin extends Plugin {}
}

interface PluginConfig {}

declare class BDFDB_Global {
    loaded: boolean;
    started: boolean;
    PluginUtils: {
        cleanUp: (bdfdb: BDFDB_Global) => void;
        buildPlugin: (config: PluginConfig) => [Plugin, BDFDB];
    };
    pluginQueue: any[];
    downloadModal: boolean;
}

declare class BDFDB {
    LibraryModules: never;
    LibraryComponents: {
        Anchor: { name: 'Anchor' };
        Animations: { props: ['Controller', 'Spring']; assign: true };
        AutocompleteItems: { props: ['Generic', 'User', 'Command'] };
        AutocompleteMenu: { name: 'Autocomplete' };
        AvatarComponents: { props: ['AnimatedAvatar'] };
        Badges: { props: ['IconBadge', 'NumberBadge']; assign: true };
        CardRemoveButton: { name: 'RemoveButton' };
        Checkmark: { name: 'Checkmark' };
        Connectors: { props: ['Router', 'Link']; assign: true };
        DiscordTag: { name: 'DiscordTag' };
        Emoji: { strings: ['emojiName', 'shouldAnimate', 'jumboable']; value: 'default' };
        EmojiButton: { name: 'EmojiButton' };
        EmojiPicker: { strings: ['EMOJI_PICKER_TAB_PANEL_ID', 'diversitySelector'] };
        Flex: (props: ['Wrap', 'Direction', 'Child']) => JSX.Element;
        FlowerStarIcon: { name: 'FlowerStarIcon' };
        FocusRingScope: { props: ['FocusRingScope']; value: 'default' };
        FormComponents: { props: ['FormSection', 'FormText']; assign: true };
        'GuildComponents Badge': { name: 'GuildBadge' };
        'GuildComponents BlobMask': { name: 'BlobMask' };
        'GuildComponents Icon': { name: 'GuildIconWrapper' };
        'GuildComponents Items': { props: ['Separator', 'DragPlaceholder'] };
        'GuildComponents MutedText': { props: ['useMutedUntilText']; value: 'default' };
        'GuildComponents Pill': { strings: ['opacity:1,height:', '20:8', 'default.item'] };
        HeaderBarComponents: { name: 'HeaderBarContainer' };
        Image: { props: ['ImageReadyStates'] };
        ImageModal: { name: 'ImageModal' };
        LazyImage: { name: 'LazyImage' };
        ListHeader: { name: 'ListSectionItem' };
        Mask: { name: 'Mask' };
        Menu: { name: 'Menu' };
        MenuItems: { props: ['MenuItem', 'MenuGroup']; assign: true };
        'MenuItems Colors': { props: ['MenuItemColor']; value: 'MenuItemColor' };
        MessageGroup: { name: 'ChannelMessage' };
        MessagesPopoutComponents: { props: ['Header', 'EmptyStateBottom'] };
        ModalComponents: { props: ['ModalContent', 'ModalFooter']; assign: true };
        NavItem: { name: 'NavItem' };
        Paginator: { name: 'Paginator' };
        PanelButton: { name: 'PanelButton' };
        PopoutCSSAnimator: { name: 'PopoutCSSAnimator' };
        PopoutFocusLock: { strings: ['useFocusLock', 'useImperativeHandle'] };
        PrivateChannelItems: { props: ['DirectMessage', 'GroupDM'] };
        QuickSwitchItems: { props: ['Channel', 'GroupDM', 'Header'] };
        QuickSwitchMenu: { name: 'QuickSwitcher' };
        'Scrollers Auto': {
            props: ['AdvancedScrollerThin', 'AdvancedScrollerAuto'];
            value: 'AdvancedScrollerAuto';
        };
        'Scrollers None': {
            props: ['AdvancedScrollerThin', 'AdvancedScrollerAuto'];
            value: 'AdvancedScrollerNone';
        };
        'Scrollers Thin': {
            props: ['AdvancedScrollerThin', 'AdvancedScrollerAuto'];
            value: 'AdvancedScrollerThin';
        };
        Spinner: { name: 'Spinner' };
        Status: { name: 'Status' };
        StatusPickerPopout: { strings: ['"StatusPickerPopout"']; value: 'default' };
        TextElement: { name: 'Text' };
        UserPopout: { name: 'ConnectedUserPopout' };
        UserSummaryItem: { name: 'UserSummaryItem' };
        VideoForwardRef: { strings: ['displayName="Video"', '"video"', 'HTMLImageElement']; value: 'default' };
    };
}

interface ToastOptions {
    type: 'success';
}

interface ModalOptions {
    confirmText: string;
    cancelText: string;
    onCancel: () => void;
    onConfirm: () => void;
}

declare class BdApi {
    Plugins: {
        folder: string;
    };
    showToast: (message: string, options: ToastOptions) => void;
    alert: (title: string, message: string) => void;
    showConfirmationModal: (title: string, message: string, options: ModalOptions) => void;
}

declare class Plugin {
    patchedModules: {};
    getName: () => string;
    getAuthor: () => string;
    getVersion: () => string;
    getDescription: () => string;
    load: () => void;
    start: () => void;
    stop: () => void;
}

export {};
