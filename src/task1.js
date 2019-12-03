process.stdin.on('readable', function () {
  let input = String(process.stdin.read());
  let output = reverseString(input);
  console.log(output);
});

function reverseString(input){
    return input.split("").reverse().join("");
}