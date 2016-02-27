var gulp = require('gulp'),
bpjs = require('boilerplate-gulp-js'),
path = require('path');

bpjs(gulp, {
  // This will be used to name the built artifact (e.g., MyModule.js)
  name: 'Trump',

  // The root of your CommonJS modules
  entry: path.join(__dirname, 'src/assets/js/index.js'),

  // The sources for your project (used in linting and testing tasks)
  sources: path.join(__dirname, 'src/assets/js/*.js'),

  // The tests for your project
  tests: path.join(__dirname, 'src/**/*Spec.js'),

  // The destination to write the built files
  dest: path.join(__dirname, 'build'),
});

// Rest of your gulp file, potentially overwriting the boilerplate-gulp tasks...
