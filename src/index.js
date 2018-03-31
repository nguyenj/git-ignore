const program = require('commander')
const shell = require('shelljs')
const chalk = require('chalk')
const path = require('path')

function makeRed (text) {
	return chalk.red(text)
}

const getProjectRootPath = function getProjectRootPath () {
	return shell
		.exec('git rev-parse --show-toplevel', { silent: true })
		.stdout
		.trim()
}

const getGitIgnoreFilepath = function getGitIgnoreFilepath (rootPath) {
	return path.join(rootPath, '.gitignore')
}

if (!process.argv.slice(2).length) {
		program.outputHelp(makeRed)
}

module.exports = program
	.version('0.1.0')
	.usage('<pattern|filename|directory>')
	.arguments('<pattern...>')
	.action((pattern) => {
		if (!shell.which('git')) {
			console.log(chalk.red('`git` is required.'))
			process.exit(1)
		}

		if (!Array.isArray(pattern)) {
			pattern = [pattern]
		}

		pattern.forEach(function (entry) {
			shell.exec("echo '" + entry + "' >> " + getGitIgnoreFilepath(getProjectRootPath()))
		})
	})
	.parse(process.argv)
