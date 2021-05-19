import React, {
    Component,
    PureComponent,
    createContext,
    createElement,
    StrictMode,
    Suspense,
    cloneElement,
    Fragment,
    Children,
    Profiler,
    createRef,
    createFactory,
    forwardRef,
    isValidElement,
    lazy,
    memo,
    useCallback,
    useContext,
    useDebugValue,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useReducer,
    useState,
} from 'react';

import ReactDOM, {
    createPortal,
    findDOMNode,
    flushSync,
    hydrate,
    render,
    unmountComponentAtNode,
    unstable_batchedUpdates,
    unstable_renderSubtreeIntoContainer,
} from 'react-dom';

interface Settings {
    type: 'collection' | 'category' | 'switch' | 'dropdown';
    id: string;
    name: string;
    button: { title: string; onClick: () => void };
    settings?: Settings[];
    collapsible?: boolean;
    note?: string;
}

declare global {
    class BdApi {
        Patcher: {
            /**
             * This method patches onto another function, allowing your code to run after.
             * Using this, you are also able to modify the return value, using the return of your code instead.
             *
             * @param caller - Name of the caller of the patch function. Using this you can undo all patches with the same name using {@link Patcher.unpatchAll}. Use `""` if you don't care.
             * @param moduleToPatch - Object with the function to be patched. Can also patch an object's prototype.
             * @param functionName - Name of the method to be patched
             * @param callback - Function to run instead of the original method
             * @param options - Object used to pass additional options.
             * @param options.displayName You can provide meaningful name for class/object provided in `what` param for logging purposes. By default, this function will try to determine name automatically.
             * @param options.forcePatch Set to `true` to patch even if the function doesnt exist. (Adds noop function in place).
             * @return Function with no arguments and no return value that should be called to cancel (unpatch) this patch. You should save and run it when your plugin is stopped.
             */
            after: (
                caller: string,
                moduleToPatch: object,
                functionName: string,
                callback: any,
                options: { displayName: string; forcePatch: boolean },
            ) => () => void;
            before: (e: any, t: any, b: any, o: any, r: any) => void;
            instead: (e: any, t: any, b: any, o: any, r: any) => void;
            patch: (e: any, t: any, b: any, o: any, r: any) => void;
            unpatchAll: (e: any) => void;
        };
        Plugins: {
            folder: string;
        };
        React: typeof React;
        //  & {
        //     __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        //         IsSomeRendererActing: {
        //             current: boolean;
        //         };
        //         ReactCurrentBatchConfig: { suspense: null };
        //         ReactCurrentDispatcher: {
        //             current: {
        //                 readContext: (e: any, t: any) => any;
        //                 useCallback: () => any;
        //                 useContext: () => any;
        //                 useDebugValue: () => any;
        //                 useDeferredValue: () => any;
        //                 useEffect: () => any;
        //                 useImperativeHandle: () => any;
        //                 useLayoutEffect: () => any;
        //                 useMemo: () => any;
        //                 useReducer: () => any;
        //                 useRef: () => any;
        //                 useResponder: () => any;
        //                 useState: () => any;
        //                 useTransition: () => any;
        //             };
        //         };
        //         ReactCurrentOwner: {
        //             current: null;
        //         };
        //         assign: () => any;
        //     };
        // };
        ReactDOM: typeof ReactDOM;
        //  & {
        //     // createBlockingRoot: (e: any, t: any) => any;
        //     // createPortal: typeof createPortal;
        //     // createRoot: (e: any, t: any) => any;
        //     // findDOMNode: typeof findDOMNode;
        //     // flushSync: typeof flushSync;
        //     // hydrate: typeof hydrate;
        //     // render: typeof render;
        //     // unmountComponentAtNode: typeof unmountComponentAtNode;
        //     // unstable_batchedUpdates: typeof unstable_batchedUpdates;
        //     // unstable_createPortal: () => any;
        //     // unstable_discreteUpdate: (e: any, t: any, n: any, r: any) => any;
        //     // unstable_flushControlled: (e: any) => any;
        //     // unstable_flushDiscreteUpdates: () => any;
        //     // unstable_renderSubtreeIntoContainer: typeof unstable_renderSubtreeIntoContainer;
        //     // unstable_scheduleHydration: (e: any) => any;
        //     __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        //         Events: any[];
        //     };
        // };
        Themes: { folder: string };
        WindowConfigFile: string;
        alert: (title: string, content?: JSX.Element) => void;
        clearCss: (e: any) => any;
        deleteData: (e: any, t: any) => any;
        disableSetting: (e: any, t: any, n: any) => any;
        Emotes: typeof Proxy;
        // ...
        settings: Settings[];
        // ...
        version: string;
    }
}

export {};
