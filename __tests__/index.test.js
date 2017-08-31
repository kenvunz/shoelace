const { parse } = require("~/index");

describe("parse()", () => {
    it("works as expected", () => {
        const data = {
            foo: {
                baz: "baz",
                hey: "hey",
                complex: ["1", "2"]
            },
            baz: "@{foo.baz}",
            hey: "hey/@{foo.hey}/",
            complex: "@{foo.complex}",
            baz1: "@{baz}",
            foo1: "@{foo}"
        };
        const value = parse(data);

        expect(value.baz).toEqual(data.foo.baz);
        expect(value.hey).toEqual("hey/hey/");
        expect(value.complex).toEqual(data.foo.complex);
        expect(value.baz1).toEqual(data.foo.baz);
        expect(value.foo1).toEqual(data.foo);
    });
});
