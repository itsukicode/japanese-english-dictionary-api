module.exports = {
	'root': true,
	'env': {
		'es6': true,
		'node': true
	},
	'extends': ['eslint:recommended', 'google'],
	'rules': {
		'quotes': ['error', 'single'],
		'indent': [2, 'tab'],
		'semi': ['error', 'never'],
		'no-tabs': 0,
		'comma-dangle': ['error', 'never'],
		'max-len': ['error', {'code': 200}]
	},
	'parserOptions': {
		'ecmaVersion': 2017
	}
}
