// import type { PluginFactory } from '@bdjs/core';

// const plugin: PluginFactory = (Plugin, Api) => {
//     const { WebpackModules, ReactTools, Patcher, DiscordModules, Utilities, DCM } = Api;

//     console.log('PLUGIN', Plugin, Api);
//     console.log('HI', Api);

//     // const isGuildMuted = WebpackModules.getByProps('isMuted').isMuted;

//     // const isMuted = (guild) => {
//     //     if (guild.props.guildId) return isGuildMuted(guild.props.guildId);
//     //     const unmuted = guild.props.guildIds.filter((g) => !isGuildMuted(g));
//     //     return !unmuted.length;
//     // };

//     return class HELLO extends Plugin {
//         constructor() {
//             super();
//             // this.defaultSettings = { hide: false };
//             // this.guildListPatch = () => {};
//             // this.guildFolderExpandedPatch = () => {};
//             // this.guildFolderIconPatch = () => {};
//             // this.folderPatches = {};
//         }

//         getName() {
//             return 'asdkasjd';
//         }
//         getVersion() {
//             return '0.1.0';
//         }
//         getDescription() {
//             return 'asdolkasjhdlksaj';
//         }
//         getAuthor() {
//             return 'askljdhasdlkj';
//         }
//         start() {
//             return 'sadsad';
//         }
//         stop() {
//             return 'sadsad';
//         }

//         onStart() {
//             Patcher.after(DiscordModules.NotificationSettingsModal, 'updateNotificationSettings', () => {
//                 console.log('hello');
//             });
//         }

//         onStop() {}
//     };
// };

// export default plugin;

// // export default class Corehalla {
// //     loaded = false;

// //     getName() {
// //         return meta.info.name;
// //     }
// //     getAuthor() {
// //         return meta.info.author;
// //     }
// //     getVersion() {
// //         return meta.info.version;
// //     }
// //     getDescription() {
// //         return meta.info.description;
// //     }
// //     load() {
// //         this.loaded = true;
// //         // window.BdApi.alert(
// //         //     'hello',
// //         //     <div>
// //         //         <a href="xd">asdsada</a>
// //         //         <br />
// //         //         hello
// //         //         <Test title="Title" />
// //         //     </div>,
// //         // );
// //         window.BdApi.showConfirmationModal('asd', <Test title="Title" />, {
// //             onConfirm: () => {
// //                 console.log('hello');
// //             },
// //         });
// //         window.BdApi.showToast('asljkdhaslkjdas', { icon: true, type: 'success' });
// //         // window.BdApi.Patcher.after('corehalla' );
// //         // console.log(window.BdApi.findAllModules(() => true));
// //         // console.log(
// //         //     window.BdApi.Patcher.after(
// //         //         'corehalla',
// //         //         window.BdApi.findModuleByDisplayName('Tooltip'),
// //         //         'render',
// //         //         () => {
// //         //             console.log('XDDDD');
// //         //         },
// //         //         {},
// //         //     ),
// //         // );
// //         getRootElement();
// //         console.log('ReactDOM', window.BdApi.findModuleByProps('render', 'findDOMNode'));

// //         console.log(window.BdApi.findModuleByProps('Permissions', 'ActivityTypes', 'StatusTypes'));
// //     }
// //     start() {
// //         if (!this.loaded) this.load();
// //     }
// //     stop() {}
// // }
