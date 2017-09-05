import get from "lodash.get";

export const regex = /(.)@{([\w\.]+)\s*([|\w\s]*)}(.)/;

export function parser(filters) {
    return function(data) {
        return parse(data, filters);
    };
}

export function parse(data, filters = {}) {
    let json = JSON.stringify(data);

    let matches;

    while ((matches = regex.exec(json))) {
        const [input, first, key, filter, last] = matches;
        let value = get(JSON.parse(json), key);

        const fns = filter
            .replace(/\s+/g, "")
            .split("|")
            .map(key => filters[key] || null)
            .filter(Boolean);

        if (value === void 0) {
            throw new Error(`Key path "${key}" references an undefined value`);
        }

        fns.forEach(fn => (value = fn(value, key)));

        if (typeof value === "string") {
            const tag = `@{${key}}`;
            // if `value` contains `key` itself, means there is
            // circular referencing, terminate with "undefined" value
            if (value.indexOf(tag) >= 0) {
                throw new Error(`Key path "${key}" causes circular reference`);
            }
            json = json.replace(input, `${first}${value}${last}`);
        } else json = json.replace(input, JSON.stringify(value));
    }

    return JSON.parse(json);
}
