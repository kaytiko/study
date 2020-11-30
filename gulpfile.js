const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const minify = require('gulp-cssmin');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const htmlmin = require("gulp-htmlmin");
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const rimraf = require('rimraf');
reload = sync.reload;

// Clean

gulp.task('clean', function (cb) {
  rimraf("build", cb);
});

// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff, woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}

exports.copy = copy;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
    .pipe(reload({stream: true}));
}

exports.html = html;

// JS

const js = () => {
  return gulp.src("source/js/**/*.js")
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("build/js"))
}

exports.js = js;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(sourcemap.write("."))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

// Image optimization

const imageMin = () => {
  return gulp.src("source/img/icons/*.*")
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true,
        verbose: true
    }))
    .pipe(gulp.dest("build/img"))
    .pipe(reload({stream: true}));
}

exports.imageMin = imageMin;

// Webp

const webP = () => {
  return gulp.src("source/img/*.{jpg,png}")
    .pipe(webp({quality: 85}))
    .pipe(gulp.dest("build/img"))
    .pipe(reload({stream: true}));
}

exports.webP = webP;

// Sprite

const sprite = () => {
  return gulp.src('source/img/icon-*.svg')
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Build

const build = gulp.series(
  copy,
  html,
  js,
  imageMin,
  webP,
  sprite
);

exports.build = build;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build' //меняем на build
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/**/*.js", gulp.series("js"));
  gulp.watch("source/*.html", gulp.series("build")).on("change", sync.reload);
}

exports.default = gulp.series(
  build, styles, server, watcher
);
