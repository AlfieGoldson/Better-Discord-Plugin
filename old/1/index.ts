import plugin from './Plugin';
import config from './plugin.meta.json';

const downloadLibrary = () => {
    require('request').get('https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js', (e, r, b) => {
        if (!e && b && r.statusCode == 200)
            require('fs').writeFile(require('path').join(BdApi.Plugins.folder, '0BDFDB.plugin.js'), b, () =>
                BdApi.showToast('Finished downloading BDFDB Library', { type: 'success' }),
            );
        else
            BdApi.alert(
                'Error',
                'Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library',
            );
    });
};

module.exports = (() => {
    return !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started)
        ? {
              getName: () => config.info.name,
              getAuthor: () => config.info.author,
              getVersion: () => config.info.version,
              getDescription: () =>
                  `The Library Plugin needed for ${config.info.name} is missing. Open the Plugin Settings to download it. \n\n${config.info.description}`,

              load: () => {
                  if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue))
                      window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, { pluginQueue: [] });
                  if (!window.BDFDB_Global.downloadModal) {
                      window.BDFDB_Global.downloadModal = true;
                      BdApi.showConfirmationModal(
                          'Library Missing',
                          `The Library Plugin needed for ${config.info.name} is missing. Please click "Download Now" to install it.`,
                          {
                              confirmText: 'Download Now',
                              cancelText: 'Cancel',
                              onCancel: () => {
                                  delete window.BDFDB_Global.downloadModal;
                              },
                              onConfirm: () => {
                                  delete window.BDFDB_Global.downloadModal;
                                  downloadLibrary();
                              },
                          },
                      );
                  }
                  if (!window.BDFDB_Global.pluginQueue.includes(config.info.name))
                      window.BDFDB_Global.pluginQueue.push(config.info.name);
              },
              start: () => {
                  this.load();
              },
              stop: () => {},
              getSettingsPanel: () => {
                  let template = document.createElement('template');
                  template.innerHTML = `<div style="color: var(--header-primary); font-size: 16px; font-weight: 300; white-space: pre; line-height: 22px;">The Library Plugin needed for ${config.info.name} is missing.\nPlease click <a style="font-weight: 500;">Download Now</a> to install it.</div>`;
                  template.content.firstElementChild.querySelector('a').addEventListener('click', this.downloadLibrary);
                  return template.content.firstElementChild;
              },
          }
        : plugin(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();
