/**
 * String reversal
 **/
import * as readLine from 'readline';
import * as csv from 'csvtojson';
b
const readL = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

function listenCommandLine() {
    readL.question("Enter String to reverse ", (input) => {
        let output = reverseString(input);
        console.log(output);
        listenCommandLine();
    });
}

readL.on("close", () => {
    console.log("\n Terminated Task1");
    process.exit(0);
});

function reverseString(input){
    return input.split("").reverse().join("");
}

listenCommandLine();

/**
 * Reading CSV
 **/
const csvFilePath='./csv/node_mentoring_t1_2_input_example.csv'

async function readCSV(){
    const jsonArray=await csv().fromFile(csvFilePath);
    console.log(jsonArray);
}

readCSV();

