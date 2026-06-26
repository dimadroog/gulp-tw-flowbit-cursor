let source_folder = "app";
let project_folder = "dist";

let patch = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
    lib: project_folder + "/lib/",
  },
  src: {
    html: [source_folder + "/**/*.njk", "!" + source_folder + "/**/_*.njk"],
    css: [source_folder + "/css/style.css"],
    js: [source_folder + "/js/*.js", "!" + source_folder + "/js/_*.js"],
    lib: [
      source_folder + "/lib/**",
      "!" + source_folder + "/lib/{_*,_*/**}",
      "!" + source_folder + "/lib/**/**/node_modules/**",
    ],
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp,mp4,webm,webmanifest}",
    fonts: source_folder + "/fonts/**/*",
    favicon: source_folder + "/favicon.ico",
  },
  watch: {
    html: source_folder + "/**/*.njk",
    json: [source_folder + "/shared/**/*.json", source_folder + "/*.json"],
    css: source_folder + "/css/**/*.css",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp,mp4,webm,webmanifest}",
  },
  clean: "./" + project_folder + "/**/*",
};

let { src, dest } = require("gulp");
let gulp = require("gulp");
let postcss = require("gulp-postcss");
let sharp = require("sharp");
let path = require("path");
let { readFileSync, readdirSync, existsSync, promises: fsp } = require("fs");
let { Transform } = require("stream");

let browsersync = require("browser-sync").create();
let del = require("del");
let clean_css = require("gulp-clean-css");
let rename = require("gulp-rename");
let prettyHtml = require("gulp-pretty-html");
let nunjucksRender = require("gulp-nunjucks-render");
let gulpData = require("gulp-data");

function loadJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function getTemplateData(file) {
  let ctx = {};
  const sharedDir = path.join(source_folder, "shared");

  if (existsSync(sharedDir)) {
    for (const name of readdirSync(sharedDir)
      .filter((n) => n.endsWith(".json"))
      .sort()) {
      ctx = { ...ctx, ...loadJson(path.join(sharedDir, name)) };
    }
  }

  const sibling = path.join(path.dirname(file.path), path.basename(file.path, ".njk") + ".json");

  if (existsSync(sibling)) {
    ctx = { ...ctx, ...loadJson(sibling) };
  }

  return ctx;
}

// Add @preline/* entries here when a module is needed — see .cursor/commands/add-preline-module.md
// Example:
// {
//   src: "./node_modules/@preline/dropdown/index.js",
//   dest: source_folder + "/lib/preline/",
//   rename: "dropdown.js",
// },
const vendorLibs = [];

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(patch.src.html)
    .pipe(gulpData(getTemplateData))
    .pipe(
      nunjucksRender({
        path: source_folder,
      })
    )
    .pipe(prettyHtml())
    .pipe(dest(patch.build.html))
    .pipe(browsersync.stream())
    .pipe(browsersync.stream());
}

function css() {
  return src(patch.src.css)
    .pipe(postcss())
    .pipe(dest(patch.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(patch.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(patch.src.js).pipe(dest(patch.build.js)).pipe(browsersync.stream());
}

// Raster formats processed by sharp; everything else copied as-is
const RASTER_RE = /\.(jpe?g|png)$/i;
// Widths generated for images placed in app/img/responsive/
// Matches project breakpoints: sm:560 md:880 lg:1080 xl:1280, plus 2x for largest
const RESPONSIVE_WIDTHS = [640, 960, 1280, 1600];

async function walkDir(dir) {
  let results = [];
  let entries;
  try {
    entries = await fsp.readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await walkDir(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

async function images() {
  const srcDir = source_folder + "/img";
  const destDir = project_folder + "/img";
  const files = await walkDir(srcDir);

  await Promise.all(
    files.map(async (file) => {
      const rel = path.relative(srcDir, file);
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      const outDir = path.join(destDir, path.dirname(rel));

      await fsp.mkdir(outDir, { recursive: true });

      if (RASTER_RE.test(ext)) {
        // Optimised original
        const optimised = sharp(file);
        const pipeline =
          ext === ".png"
            ? optimised.png({ compressionLevel: 8 })
            : optimised.jpeg({ quality: 85, progressive: true });
        await pipeline.toFile(path.join(outDir, path.basename(file)));

        // WebP version
        await sharp(file)
          .webp({ quality: 85 })
          .toFile(path.join(outDir, baseName + ".webp"));

        // Responsive variants — only for app/img/responsive/
        const isResponsive = rel.startsWith("responsive/") || rel.startsWith("responsive\\");
        if (isResponsive) {
          const { width: naturalWidth } = await sharp(file).metadata();
          for (const w of RESPONSIVE_WIDTHS) {
            if (w < naturalWidth) {
              const resized = sharp(file).resize(w);
              const resizedFmt =
                ext === ".png"
                  ? resized.png({ compressionLevel: 8 })
                  : resized.jpeg({ quality: 85 });
              await resizedFmt.toFile(path.join(outDir, `${baseName}-${w}w${ext}`));
              await sharp(file)
                .resize(w)
                .webp({ quality: 85 })
                .toFile(path.join(outDir, `${baseName}-${w}w.webp`));
            }
          }
        }
      } else {
        await fsp.copyFile(file, path.join(outDir, path.basename(file)));
      }
    })
  );

  if (browsersync.active) browsersync.reload();
}

function fonts() {
  return src(patch.src.fonts, { encoding: false }).pipe(dest(patch.build.fonts));
}

function favicon() {
  return src(patch.src.favicon, { encoding: false }).pipe(dest(patch.build.html));
}

function syncVendorLibs(done) {
  if (!vendorLibs.length) {
    done();
    return;
  }

  const runSyncInParallel = gulp.parallel(
    ...vendorLibs.map(
      (entry) =>
        function syncSingleVendorLib() {
          let stream = src(entry.src, { allowEmpty: true });
          if (entry.rename) {
            stream = stream.pipe(rename(entry.rename));
          }
          if (entry.patch) {
            stream = stream.pipe(
              new Transform({
                objectMode: true,
                transform(file, _, cb) {
                  if (file.isBuffer()) {
                    file.contents = Buffer.from(entry.patch(file.contents.toString("utf8")));
                  }
                  cb(null, file);
                },
              })
            );
          }
          return stream.pipe(dest(entry.dest));
        }
    )
  );
  return runSyncInParallel(done);
}

function lib() {
  return src(patch.src.lib).pipe(dest(patch.build.lib));
}

function watchFiles() {
  gulp.watch([patch.watch.html].concat(patch.watch.json), gulp.parallel(html, css));
  gulp.watch([patch.watch.css], css);
  gulp.watch([patch.watch.js], js);
  gulp.watch([patch.watch.img], images);
}

function clean() {
  return del(patch.clean);
}

let build = gulp.series(
  clean,
  syncVendorLibs,
  gulp.parallel(images, js, css, html, fonts, favicon, lib)
);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
