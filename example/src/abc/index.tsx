import type { PluginFactory } from '@bdjs/core';

const plugin: PluginFactory = (Plugin, Api) => {
    const { Patcher, DiscordModules, ReactComponents } = Api;

    console.log({ Plugin, Api });

    // console.log(JSON.stringify(DiscordModules));

    return class HELLO extends Plugin {
        constructor() {
            super();
        }

        getName() {
            return 'ABC';
        }
        getVersion() {
            return '0.1.0';
        }
        getDescription() {
            return 'Test Plugin';
        }
        getAuthor() {
            return 'Alfie';
        }

        async onStart() {
            // Patcher.after(DiscordModules.EmojiInfo, 'isEmojiFiltered', (thisObject, methodArguments, returnValue) => {
            //     return returnValue || DiscordModules.EmojiInfo.isEmojiDisabled(methodArguments[0], methodArguments[1]);
            // });
            console.log('asijdjghsaikdujha');
        }

        onStop() {
            // Patcher.unpatchAll();
        }
    };
};

export default plugin;
