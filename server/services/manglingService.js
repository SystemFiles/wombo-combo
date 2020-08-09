// Handles all mangling rules for password mangling through the upload endpoint
// NOTE: Right now, works best with single word/phrase starting with, ending with, or surrounded by symbols/numbers

// Basic IO requirements
const fs = require('fs-extra')
const readline = require('readline')
const os = require('os')

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

// modifies the provided password file with the added word suggestions
const addMispelledWords = async (passFile) => {
	const readStream = fs.createReadStream(passFile)

	const rl = readline.createInterface({
		input     : readStream,
		crlfDelay : Infinity
	})

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

// --- Test functions --- //
// let password = '%4@6&sur%2$66'
// let extractedWord = extractWordWithIndex(password)
// let foundWords = getSpellCheckMatches(extractedWord.word)
// console.log(rebuildPassphraseWithSuggested(password, foundWords, extractedWord))

// --- Test full --- //
;(async () => {
	console.log('Adding mispelled words to password list...')
	try {
		await addMispelledWords(__dirname + '/testData.txt')
	} catch (err) {
		console.log('ERROR')
	}
	console.log('Done!')
})()

module.exports = {
	addMispelledWords
}
