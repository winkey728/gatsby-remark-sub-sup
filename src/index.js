const subsup = require("remark-sub-super");

module.exports = ({ markdownAST }) => markdownAST;

module.exports.setParserPlugins = () => [subsup];
