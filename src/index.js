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
            json = json.replace(input, `${first}${value}${last}`);
        } else json = json.replace(input, JSON.stringify(value));
    }

    return JSON.parse(json);
}
