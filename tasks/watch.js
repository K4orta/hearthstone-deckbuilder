"use strict";

module.exports = function(gulp) {
  var livereload = require("gulp-livereload"),
      nodemon = require("gulp-nodemon");

  livereload.listen();
  gulp.task("watch", function() {
    gulp.isWatching = true;
    nodemon({
      script: "app.js",
      ext: "js json jade",
      env: {
        "NODE_ENV": "development"
      },
      nodeArgs: [
        "--debug"
      ]
    }).on("restart", function() {
      setTimeout(livereload.changed, 2000);
      console.log("restarted");
    });

    gulp.watch("**/*.jade").on("change", livereload.changed);
    gulp.watch("public/less/**/*.less", [
      "less"
    ]);

    gulp.watch([
      "public/views/*.jsx",
      "public/js/**/*.js",
      "public/js/**/*.jsx",
      "!public/js/dist/**/*.js"
    ], [
      "browserify"
    ]);

  });
};
