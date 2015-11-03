'use strict'

const mkdirp = require('mkdirp')
const merge = require('lodash').merge
const inquirer = require('inquirer')
const slugify = require('slugify')
const fs = require('fs')
const path = require('path')
const tempfile = require('tempfile')


module.exports = {
  createDir,
  ask,
  saveOSResultsToCache,
  getOSResultsFromCache,
  ifTrue,
  canRead,
  cachePath
}


function cachePath (cache, filename, fallbackTemp) {
  if (cache) {
    return path.join(cache, slugify(filename).replace(/['"]/g, ''))
  } else if (fallbackTemp) {
    return tempfile(path.extname(filename))
  } else {
    return null
  }
}

function createDir (dir) {
  return new Promise((resolve, reject) => mkdirp(dir, err => err ? reject(err) : resolve()))
}

function ask (question) {
  if (question.type === 'list') {
    // Append separator at end of list to mark end of list
    question = merge({}, question, {
      choices: question.choices.concat([new inquirer.Separator])
    })
  }

  return new Promise(resolve => inquirer.prompt([merge({ name: 'answer' }, question)], answers => resolve(answers.answer)))
}

ask.confirm = function (message, def) {
  return ask({ type: 'confirm', message, default: def })
}

ask.list = function (message, choices, def) {
  return ask({ type: 'list', message, choices, default: def })
}

ask.input = function (message, def) {
  return ask({ type: 'input', message, default: def })
}

function saveOSResultsToCache (cacheDir, title, results) {
  try {
    fs.writeFileSync(cachePath(cacheDir, title + '.json'), JSON.stringify(results))
    return true
  } catch (e) {
    return false
  }
}

function getOSResultsFromCache (cacheDir, title) {
  const filename = cachePath(cacheDir, slugify(title) + '.json')
  try {
    const mtime = Number(fs.statSync(filename).mtime)
    const now = Date.now()
    if (now - mtime > 3600000) {
      return null
    } else {
      return JSON.parse(fs.readFileSync(filename))
    }
  } catch (e) {
    return null
  }
}

function ifTrue (fn) {
  return value => value && fn(value)
}

function canRead (filename) {
  try {
    fs.accessSync(filename, fs.R_OK)
    return true
  } catch (e) {
    return false
  }
}
