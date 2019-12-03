"use strict";

process.stdin.on('readable', function () {
  var input = String(process.stdin.read());
  var output = reverseString(input);
  console.log(output);
});

function reverseString(input) {
  return input.split("").reverse().join("");
}