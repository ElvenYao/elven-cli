const download = require('download-git-repo')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { exec } = require('child_process')
const fs = require('fs')
chalk.level = 3 // 设置chalk等级为3

const printTeam = () => {
  console.log(
    chalk.yellow(` 
    ******** **       **      ** ******** ****     **
    /**///// /**      /**     /**/**///// /**/**   /**
    /**      /**      /**     /**/**      /**//**  /**
    /******* /**      //**    ** /******* /** //** /**
    /**////  /**       //**  **  /**////  /**  //**/**
    /**      /**        //****   /**      /**   //****
    /********/********   //**    /********/**    //***
    //////// ////////     //     //////// //      ///

                - Welcome to Elven-cli!!! -
  `)
  )
}
module.exports = () => {
  console.log(chalk.green('=========starting init project!========'))
  inquirer
    .prompt([
      {
        type: 'input', // 问题类型为填空题
        message: 'your project name:', // 问题描述
        name: 'projectName', // 问题对应的属性
        validate: (val) => {
          // 对输入的值做判断
          if (val === '') {
            return chalk.red('Project name cannot be empty empty!!')
          }
          return true
        },
      },
    ])
    .then((answer) => {
      printTeam()
      console.log(chalk.gray('doing init...'))
      console.log(chalk.green('init project files\n'))
      const gitUrl = 'https://github.com/ElvenYao/react-production.git'
      exec(
        `git clone ${gitUrl} ${answer.projectName}`,
        (error, stdout, stderr) => {
          if (error) {
            // 当有错误时打印出错误并退出操作
            console.log(chalk.red(error))
            process.exit()
          }
          fs.readFile(
            `${process.cwd()}/${answer.projectName}/package.json`,
            (err, data) => {
              if (error) {
                console.log(chalk.red('read package.json fail!'))
                process.exit()
              }
              data = JSON.parse(data.toString())
              data.name = answer.projectName
              fs.writeFile(
                `${process.cwd()}/${answer.projectName}/package.json`,
                JSON.stringify(data, '', '\t'),
                (err) => {
                  if (err) {
                    console.log(chalk.red('write to package.json fail!'))
                    process.exit()
                  }
                  console.log(
                    chalk.green('=========init finished!================')
                  )
                  process.exit() // 退出这次命令行操作
                }
              )
            }
          )
        }
      )
    })
}
