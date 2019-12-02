/**
 * String reversal
 **/
import * as readLine from 'readline';
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

readL.on("close", function() {
    console.log("\n Terminated Task1");
    process.exit(0);
});

function reverseString(input){
    return input.split("").reverse().join("");
}

listenCommandLine();