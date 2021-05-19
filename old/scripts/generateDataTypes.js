#!/usr/bin/env zx
const fs = require('fs/promises');

const BDFDB_url = `https://raw.githubusercontent.com/mwittrien/BetterDiscordAddons/master/Library/_res/BDFDB.data.json`;
const outFile = './test.d.ts';

(async () => {
    let resp = await fetch(BDFDB_url);
    if (!resp.ok) return;

    const txt = await resp.text();

    try {
        const data = JSON.parse(txt);
        const types = generateTypes(data);
        console.log(types);
        await fs.writeFile(outFile, types);
    } catch (e) {
        console.error(e);
        return;
    }
})();

function generateTypes(json) {
    let outStr = `declare class BDFDB {\n`;

    Object.entries(json).forEach(([topLevelKey, topLevelValue]) => {
        console.log(topLevelKey);

        switch (topLevelKey) {
            case 'LibraryModules':
                outStr += `  ${topLevelKey}: {\n`;

                Object.entries(topLevelValue).forEach(([propName, propValue]) => {
                    outStr += `${propName}: {`;
                    Object.entries(propValue).forEach(([typeName, typeValues]) => {
                        if (Array.isArray(typeValues)) {
                            outStr += `${typeName}: '${typeValues.join(`' | '`)}';\n`;
                            return;
                        }

                        switch (typeof typeValues) {
                            case 'string':
                            case 'number':
                            case 'boolean':
                                outStr += `${typeName}: '${typeValues}'`;
                                break;
                            default:
                                break;
                        }
                    });

                    outStr += `}\n`;
                });

                outStr += `  }\n`;
                break;
            case 'LibraryComponents':
                break;
            default:
                break;
        }
    }, '');

    outStr += `}`;
    return outStr;
}
