/**
 * Reading CSV
 **/
const csv=require('csvtojson');
const fs=require('fs');
const { pipeline } = require('stream');

const csvFilePath='./csv/node_mentoring_t1_2_input_example.csv';

function readCSVLineByLine(){
    pipeline(
        fs.ReadStream(csvFilePath),
        csv(),
        fs.createWriteStream('csv/lineCSV.txt'),
        (err) => {
          if (err) {
            console.error('Writing to text file failed', err);
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