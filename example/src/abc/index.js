const plugin = (Plugin, Api) => {
    const {} = Api;

    return class abc extends Plugin {
        constructor() {
            super();
        }

        getName() {
            return 'abc';
        }

        getVersion() {
            return '0.1.0';
        }

        getDescription() {
            return 'abc';
        }

        getAuthor() {
            return 'abc';
        }

        start() {}

        stop() {}

        onStart() {}

        onStop() {}
    };
};

export default plugin;
