// Handles all mangling rules for password mangling through the upload endpoint
// NOTE: Right now, works best with single word/phrase starting with, ending with, or surrounded by symbols/numbers

// Basic IO requirements
const fs = require('fs-extra')
const path = require('path')
const readline = require('readline')
const util = require('util')
const stream = require('stream')
const os = require('os')
const appDir = path.dirname(require.main.filename)

// ------------------- [ SPELLING HELPER FUNCTIONS ] ------------------- //

// Requirements for close-words(spell check) on password terms
const spelling = require('spelling'),
	dictionary = require('spelling/dictionaries/en_US'),
	dict = new spelling(dictionary)

// returns a list of matched spell checks for the extracted word (currently gets completed words from starting prefix or incomplete words)
const getSpellCheckMatches = (word) => {
	let res = dict.search(word, { suggest: true })

	if (res.length > 0) {
		let suggestions = []
		res.forEach((wordObj) => {
			suggestions.push(wordObj.word)
		})
		return suggestions
	}

	return []
}

// returns extracted alphabetical contents of string with index of start (right now just removes numbers and tries mapping)
const extractWordWithIndex = (password) => {
	let word = password.replace(/[^A-Za-z]/gi, '')
	return { word: word, start: password.indexOf(word) }
}

// Rebuilds passphrase at start location of word extraction from passphrase
const rebuildPassphraseWithSuggested = (original, suggestions, extractedWord) => {
	let rebuiltPassPhrases = []
	suggestions.forEach((suggestion) => {
		let before = original.slice(0, extractedWord.start)
		let after = original.slice(extractedWord.start + extractedWord.word.length)
		rebuiltPassPhrases.push(`${before}${suggestion}${after}`)
	})

	return rebuiltPassPhrases
}

// ------------------- [ SPELLING HELPER FUNCTIONS ] ------------------- //

// ------------------- [ REPLACEMENTS HELPER FUNCTIONS ] ------------------- //

const commonReplacesments = {
	a : [
		'4',
		'@'
	],
	b : [
		'8'
	],
	c : [
		'(',
		'{',
		'[',
		'<'
	],
	e : [
		'3'
	],
	g : [
		'6',
		'9'
	],
	i : [
		'1',
		'!',
		'|'
	],
	l : [
		'1',
		'|',
		'7'
	],
	o : [
		'0'
	],
	s : [
		'$',
		'5'
	],
	t : [
		'+',
		'7'
	],
	x : [
		'%'
	],
	z : [
		'2'
	]
}

const replaceWord = async (word) => {
	for (let i = 0; i < word.length; i++) {
		word[i] in commonReplacesments
			? word.replace(word[i], commonReplacesments[word[i]][Math.random() * commonReplacesments[word[i]].length])
			: null
	}
}

// ------------------- [ REPLACEMENTS HELPER FUNCTIONS ] ------------------- //

// ------------------- [ MANGLING FUNCTIONS ] ------------------- //

// modifies the provided password file with the added word suggestions
const addMispelledWords = async (passFile) => {
	const readStream = fs.createReadStream(passFile)
	const rl = readline.createInterface({
		input     : readStream,
		crlfDelay : Infinity
	})

	console.log('Adding any fixed mispelled/incomplete words to passwords in passlist...')

	try {
		for await (const password of rl) {
			let extractedWord = extractWordWithIndex(password)
			let wordSuggestions = getSpellCheckMatches(extractedWord.word)
			let newPasswords = rebuildPassphraseWithSuggested(password, wordSuggestions, extractedWord)
			await newPasswords.forEach((pass) => {
				fs.appendFile(passFile, `${pass}${os.EOL}`)
			})
		}
	} catch (err) {
		Promise.reject('Failed to perform spell-check mangling operation')
	}
}

// adds a list of 14 million common (used) passwords from rockyou.txt to this combo list
const addCommonPasswords = async (passFile) => {
	const readStream = fs.createReadStream('files/common_password_list.txt', { root: appDir })

	console.log('Adding common passwords from rockyou.txt to password list... (this can take a very long time)')

	try {
		await util.promisify(stream.pipeline)(async function*() {
			for await (const password of readStream) {
				yield `${password}${os.EOL}`
			}
		}, fs.createWriteStream(passFile))
	} catch (err) {
		Promise.reject(`ERROR: Failed to write common passwords to file...${err}`)
	}
}

// ------------------- [ MANGLING FUNCTIONS ] ------------------- //

module.exports = {
	addMispelledWords,
	addCommonPasswords
}
