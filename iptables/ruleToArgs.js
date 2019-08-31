'use strict';
const _ = require('lodash');

const expandCommandLineArgument = (rule, name, mnemonic) => _.has(rule, name)
  ? [mnemonic, _.get(rule, name)]
  : [];

exports = module.exports = (command, rule) => {
  const args = ['-t', _.get(rule, 'table', 'filter'), command, rule.chain];
  args.push(...expandCommandLineArgument(rule, 'proto', '-p'));
  args.push(...expandCommandLineArgument(rule, 'src', '-s'));
  args.push(...expandCommandLineArgument(rule, 'dst', '-d'));
  args.push(...['-j', rule.target]);
  args.push(..._.get(rule, 'extra', []));
  return args;
};
