/**
 * Reading CSV
 **/
const csv=require('csvtojson');
const fs=require('fs');
const csvFilePath='./csv/node_mentoring_t1_2_input_example.csv'

async function readCSV(){
    const jsonArray=await csv().fromFile(csvFilePath);
    console.log(jsonArray);
    writeToTxt(jsonArray);
}

function writeToTxt(data){
    var txtFile = fs.createWriteStream('csv.txt');
    console.log(data);
    data.forEach(row => {
        txtFile.write(JSON.stringify(row)+', '+ '\n');
    });
    txtFile.end();
}

readCSV();
// writeToTxt(csvData);

