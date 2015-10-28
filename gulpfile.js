var gulp        = require('gulp');
var nodemon     = require('gulp-nodemon');
var livereload  = require('gulp-livereload');

var config = {};
config.path = './public';
config.app = './routes/app.js';

gulp.task('serve',  ()=> {
  livereload.listen();
  var reloaded;

  nodemon({
    script: config.app,
    ext: 'js',
    ignore: ['public'],
    env: {
      'NODE_ENV': 'development',
      'DEBUG': '【bin/www に定義されている debug 対象のアプリ名】'
    },
    stdout: false
  }).on('readable', ()=> {
    // 標準出力に起動完了のログが出力されたらリロードイベント発行
    this.stdout.on('data', (chunk)=> {
      if (/^Express\ server\ listening/.test(chunk)) {
        livereload.reload();
      }
      process.stdout.write(chunk);
    });
  });

  // node を再起動する必要のないファイル群用の設定
  gulp.watch(['views/**', 'public/**'])
    .on('change', (event)=> {
      livereload.changed(event);
    });
});

gulp.task('default', ['serve']);