import type { PluginFactory } from '@bdjs/core';

const plugin: PluginFactory = (Plugin, Api) => {
    const { Patcher, DiscordModules } = Api;

    console.log({ Plugin, Api });

    return class HELLO extends Plugin {
        constructor() {
            super();
        }

        getName() {
            return 'asdkasjd';
        }
        getVersion() {
            return '0.1.0';
        }
        getDescription() {
            return 'asdolkasjhdlksaj';
        }
        getAuthor() {
            return 'askljdhasdlkj';
        }
        start() {
            const currentUser = DiscordModules.UserStore.getCurrentUser();
            console.log({ currentUser });
        }
        stop() {}

        onStart() {
            Patcher.after(DiscordModules.NotificationSettingsModal, 'updateNotificationSettings', () => {
                console.log('hello');
            });
        }

        onStop() {}
    };
};

export default plugin;
