"use strict";

/**
 * Reading CSV
 **/
var csv = require('csvtojson');

var csvFilePath = './csv/node_mentoring_t1_2_input_example.csv';

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
          console.log(jsonArray);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

readCSV();