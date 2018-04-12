const Remark = require("remark");
const find = require("unist-util-find");
const dedent = require("dedent");
const plugin = require("../index");

describe(`gatsby-remark-sub-sup`, () => {
  let remark;

  beforeEach(() => {
    remark = new Remark().data(`settings`, {
      commonmark: true,
      footnotes: true,
      pedantic: true
    });
    const parserPlugins = plugin.setParserPlugins();
    const parser = parserPlugins[0];
    remark.use(parser);
  });

  it(`subscript`, () => {
    const markdownAST = remark.parse(`H~2~O`);

    const transformed = plugin({ markdownAST });

    expect(find(transformed, { type: `sub` })).toBeTruthy();
  });

  it(`superscript`, () => {
    const markdownAST = remark.parse(`x^2^`);

    const transformed = plugin({ markdownAST });

    expect(find(transformed, { type: `sup` })).toBeTruthy();
  });

  it(`leaves other nodes alone`, async () => {
    const markdownAST = remark.parse(dedent`
# Hello World

a regular sentence

not a ^sup
not a ^ sup ^ too
not a ~ sub
not a ~ sub ~ too

- list item
- other list item

1. numbered
1. other numbered
    `);

    const transformed = await plugin({
      markdownAST: Object.assign({}, markdownAST)
    });

    expect(transformed).toEqual(markdownAST);
  });
});
