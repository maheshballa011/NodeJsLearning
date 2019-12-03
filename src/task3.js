import '@babel/polyfill';
import {csv} from 'csvtojson';
import * as fs from 'fs';
import { pipeline } from 'stream';
import * as readLine from 'readline';

const csvFilePath='./csv/node_mentoring_t1_2_input_example.csv';

/**
 * Reading CSV
 **/
function readCSVLineByLine(){
    pipeline(
        csv().fromFile(csvFilePath),
        fs.createWriteStream('csv/lineCSV.txt'),
        (err) => {
          if (err) {
            console.error('Writing to text file failed.', err);
          } else {
            console.log('Writing to text file succeeded.');
          }
        }
      );
}

async function readCSV(){
    const jsonArray=await csv().fromFile(csvFilePath);
    writeToTxt(jsonArray);
}

function writeToTxt(data){
    var txtFile = fs.createWriteStream('csv/fullLoadCSV.txt');
    data.forEach(row => {
        txtFile.write(JSON.stringify(row)+''+ '\n');
    });
    txtFile.end();
}

readCSV();
readCSVLineByLine();

/**
 * String reversal
 **/
process.stdin.on('readable', function () {
    let input = String(process.stdin.read());
    let output = reverseString(input);
    console.log(output);
  });
  
  function reverseString(input){
      return input.split("").reverse().join("").trim("\n");
  }