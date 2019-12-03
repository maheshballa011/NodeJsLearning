"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("@babel/polyfill");

var _csvtojson = require("csvtojson");

var fs = _interopRequireWildcard(require("fs"));

var _stream = require("stream");

var readLine = _interopRequireWildcard(require("readline"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var csvFilePath = './csv/node_mentoring_t1_2_input_example.csv';
/**
 * Reading CSV
 **/

function readCSVLineByLine() {
  (0, _stream.pipeline)((0, _csvtojson.csv)().fromFile(csvFilePath), fs.createWriteStream('csv/lineCSV.txt'), function (err) {
    if (err) {
      console.error('Writing to text file failed.', err);
    } else {
      console.log('Writing to text file succeeded.');
    }
  });
}

function readCSV() {
  var jsonArray;
  return regeneratorRuntime.async(function readCSV$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _csvtojson.csv)().fromFile(csvFilePath));

        case 2:
          jsonArray = _context.sent;
          writeToTxt(jsonArray);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function writeToTxt(data) {
  var txtFile = fs.createWriteStream('csv/fullLoadCSV.txt');
  data.forEach(function (row) {
    txtFile.write(JSON.stringify(row) + '' + '\n');
  });
  txtFile.end();
}

readCSV();
readCSVLineByLine();
/**
 * String reversal
 **/

process.stdin.on('readable', function () {
  var input = String(process.stdin.read());
  var output = reverseString(input);
  console.log(output);
});

function reverseString(input) {
  return input.split("").reverse().join("").trim("\n");
}