# Shoelace

A little utility that allow you to do this

**Input:**

```js
import { parse } from "@kenvunz/shoelace";

const value = parse({
    foo: {
        baz: "baz",
        complex: ["1", "2"],
    },
    baz: "@{foo.baz}",
    complex: "@{foo.complex}"
});
```

**Output:**
```js
{
    foo: {
        baz: 'baz',
        complex: ['1', '2']
    },
    baz: 'baz',
    complex: ['1', '2']
}
```

**Features**

- Support complex but serialisable, e.g Array, Object
- Support filters

## Usage

Install:

```bash
yarn add @kenvunz/shoelace
```

## Filters

Similar to other view template engine, filters are essentially functions that can be applied to variables. They are called with a pipe operator `(|)`

```js
import { parser } from "@kenvunz/shoelace";

const parse = parser({
    lowercase(value) {
        return value.toLowerCase()
    }
});

const value = parse({
    foo: "Foo",
    baz: "@{foo | lowercase}"
});
```

## License

MIT
