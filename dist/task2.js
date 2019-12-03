"use strict";

/**
 * Reading CSV
 **/
var csv = require('csvtojson');

var fs = require('fs');

var _require = require('stream'),
    pipeline = _require.pipeline;

var csvFilePath = './csv/node_mentoring_t1_2_input_example.csv';

function readCSVLineByLine() {
  pipeline(fs.ReadStream(csvFilePath), csv(), fs.createWriteStream('csv/lineCSV.txt'), function (err) {
    if (err) {
      console.error('Writing to text file failed', err);
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
          return regeneratorRuntime.awrap(csv().fromFile(csvFilePath));

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