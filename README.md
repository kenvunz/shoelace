# Shoelace

A little utility that allow you to do this

**Input:**

```js
import { parse } from "@kenvunz/shoelace";

const value = parse({
    foo: {
        baz: "baz",
        complex: ["1", "2"]
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

## License

MIT
