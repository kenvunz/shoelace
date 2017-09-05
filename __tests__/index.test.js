const { parse, parser } = require("~/index");

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

    it("throws error if key path references an undefined value", () => {
        expect(() => {
            parse({
                foo: "@{baz}"
            });
        }).toThrow(Error);
    });

    it("resolves the issue when property key `socialdek` is more than 8 chars and the `image` prop is not replaced correctly", () => {
        const data = {
            socialdek: "TK",
            url: "http://localhost/",
            image: "@{url}images/social.jpg",
            twitter: {
                description: "@{socialdek}",
                image: "@{image}"
            }
        };

        const value = parse(data);

        expect(value.image).toEqual("http://localhost/images/social.jpg");
        expect(value.twitter.description).toEqual("TK");
        expect(value.twitter.image).toEqual(value.image);
    });

    it("throws error if circular reference occurs", () => {
        expect(() => {
            parse({
                circular: "@{circular}/"
            });
        }).toThrow(Error);
    });

    it("supports filter", () => {
        const data = {
            foo: "baz",
            baz: "@{foo | change | uppercase}"
        };

        const parse = parser({
            change() {
                return "foo";
            },
            uppercase(value) {
                return value.toUpperCase();
            }
        });

        expect(parse(data)).toMatchObject({
            foo: "baz",
            baz: "FOO"
        });
    });

    it("supports filter for complex type like array", () => {
        const data = {
            foo: ["1", "2"],
            baz: "@{foo | join}"
        };

        const parse = parser({
            join(value) {
                return value.join(".");
            }
        });

        expect(parse(data)).toMatchObject({
            foo: ["1", "2"],
            baz: "1.2"
        });
    });
});
