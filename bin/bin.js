#!/usr/bin/env node
const fs = require('fs')
const program = require('commander')
const ora = require('ora')
//version 版本号
//name 新项目名称
program
  .version(require('../package').version, '-v, --version')
  .option('-i, init', 'init a project!')
  .action(() => {
    console.log('init project start')
    require('../command/init.js')()
  })
program.parse(process.argv)