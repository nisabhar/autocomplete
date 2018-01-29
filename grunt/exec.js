const npxArgs =
	'--no-install --node-arg=--max-old-space-size=8192 --node-arg=--stack-size=4096';

const npx = `'./node_modules/.bin/npx' ${npxArgs}`;

module.exports = {

	stylelint: `${npx} stylelint --config .stylelintrc src/**/*.css`,
	stylefmt: `${npx} stylefmt --config .stylelintrc --recursive src/**/*.css`,
	watch: `${npx} webpack --watch`,
	test: `${npx} karma start --single-run --browsers ChromeHeadless karma.conf.js`,
	testChrome: `${npx} karma start --browsers Chrome karma.conf.js`,
	testFirefox: `${npx} karma start --browsers Firefox karma.conf.js`,
	coverage: `${npx} karma start --single-run --browsers ChromeHeadless karma.conf.coverage.js`,
	printCoverage: `cat coverage/text-summary.txt`
};