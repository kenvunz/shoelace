import get from "lodash.get";

export const regex = /(.)@{([\w\.]+)}(.)/;

export function parse(data) {
    let json = JSON.stringify(data);

    let matches;

    while ((matches = regex.exec(json))) {
        const [input, first, key, last] = matches;
        let value = get(JSON.parse(json), key);

        if (value === void 0) value = "undefined";

        if (typeof value === "string") {
            const notion = `@{${key}}`;
            // if `value` contains `key` itself, means there is
            // circular referencing, terminate with "undefined" value
            if (value.indexOf(notion) >= 0) {
                throw new Error(`Key path "${key}" causes circular reference`);
            }
            json = json.replace(input, `${first}${value}${last}`);
        } else json = json.replace(input, JSON.stringify(value));
    }

    return JSON.parse(json);
}
