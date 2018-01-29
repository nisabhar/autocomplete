module.exports = {
	files: ['src/**/*.js'],
	options: {
		html: {
			braceStyle: 'collapse',
			indentChar: ' ',
			indentScripts: 'keep',
			indentSize: 4,
			maxPreserveNewlines: 5,
			preserveNewlines: true,
			wrapLineLength: 0
		},
		css: {
			indentChar: ' ',
			indentSize: 4
		},
		js: {
			braceStyle: 'collapse',
			breakChainedMethods: false,
			e4x: false,
			evalCode: false,
			indentChar: ' ',
			indentLevel: 0,
			indentSize: 4,
			indentWithTabs: true,
			jslintHappy: false,
			keepArrayIndentation: false,
			keepFunctionIndentation: false,
			maxPreserveNewlines: 2,
			preserveNewlines: true,
			spaceBeforeConditional: true,
			spaceInParen: false,
			unescapeStrings: false,
			wrapLineLength: 0,
			endWithNewline: true
		}
	}
};
