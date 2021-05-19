import { BdApi } from './BdApi';
import { meta } from './plugin.meta';

declare let window: { BdApi: BdApi };

const Test = ({ title }: { title: string }) => {
    const [open, setOpen] = window.BdApi.React.useState(false);
    return (
        <div>
            <h1>{title}</h1>
            <button
                onClick={() => {
                    setOpen(!open);
                }}
            >
                {open ? 'Open' : 'Closed'}
            </button>
        </div>
    );
};

const getRootElement = () => {
    console.log(document.getElementById('app-mount'));
};

export default class Corehalla {
    loaded = false;

    getName() {
        return meta.info.name;
    }
    getAuthor() {
        return meta.info.author;
    }
    getVersion() {
        return meta.info.version;
    }
    getDescription() {
        return meta.info.description;
    }
    load() {
        this.loaded = true;
        // window.BdApi.alert(
        //     'hello',
        //     <div>
        //         <a href="xd">asdsada</a>
        //         <br />
        //         hello
        //         <Test title="Title" />
        //     </div>,
        // );
        window.BdApi.showConfirmationModal('asd', <Test title="Title" />, {
            onConfirm: () => {
                console.log('hello');
            },
        });
        window.BdApi.showToast('asljkdhaslkjdas', { icon: true, type: 'success' });
        // window.BdApi.Patcher.after('corehalla' );
        // console.log(window.BdApi.findAllModules(() => true));
        // console.log(
        //     window.BdApi.Patcher.after(
        //         'corehalla',
        //         window.BdApi.findModuleByDisplayName('Tooltip'),
        //         'render',
        //         () => {
        //             console.log('XDDDD');
        //         },
        //         {},
        //     ),
        // );
        getRootElement();
        console.log('ReactDOM', window.BdApi.findModuleByProps('render', 'findDOMNode'));

        console.log(window.BdApi.findModuleByProps('Permissions', 'ActivityTypes', 'StatusTypes'));
    }
    start() {
        if (!this.loaded) this.load();
    }
    stop() {}
}
