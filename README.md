# gulp-phpmd [![NPM version](https://badge.fury.io/js/gulp-phpmd.png)](https://www.npmjs.org/package/gulp-phpmd)

> A gulp plugin for running [PHP Mess Detector](https://github.com/squizlabs/PHP_CodeSniffer).

Derivative work of Dmitriy S. Simushev's [gulp-phpcs](https://github.com/JustBlackBird/gulp-phpcs)
##Requirements
 - [PHP Mess Detector](https://github.com/squizlabs/php_codesniffer#installation)

##Installation
```shell
npm install gulp-phpmd --save-dev
```

## Usage

```js
var gulp = require('gulp');
var phpmd = require('gulp-phpmd');

gulp.task('default', function () {
  return gulp.src(['src/**/*.php', '!src/vendor/**/*.*'])
    // Validate code using PHP Mess Detector
    .pipe(phpmd({
      bin: 'src/vendor/bin/phpmd',
      format: 'text',
      ruleset: 'unusedcode'
    }))
    .on('error', console.error)
});
```


## API

### phpmd(options)

#### options.bin

Type: `String`

Default: `'phpmd'`

PHP Mess Detector executable.

#### options.ruleset

Type: `String`

The format of the report, for multiple formats just use a comma separated
string.

#### options.ruleset

Type: `String`

The ruleset to check against

#### options.minimumpriority

Type: `String`

pass --mininumpriority to phpmd

#### options.strict

Type: `String`

pass --strict to phpmd


## License

[MIT](http://opensource.org/licenses/MIT) © Higashi Ryohei
