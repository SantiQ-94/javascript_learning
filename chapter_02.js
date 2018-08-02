/* Looping triangle

let numerals = ''
for (let i = 1; i <= 7; i++) {
  numerals += '#';
  console.log(numerals);
}
*/


/*FizzBuzz 
let i = 1;
while (i <= 100) {
	if (i%3 == 0) {
		console.log('Fizz');
	} else if (i%5 == 0) {
		console.log('Buzz');
	} else {
		console.log(i);
	}
	i++;
}
*/

/*Chessboard
let w, h;
w = prompt('Give me a width value');
h = prompt('Give me a height value');
let line = '';
for (let i = 0; i < h; i++) {
	for (let j = 0; j < w; j++) {
		if (i%2 == 0) {
			if (j%2 == 0) {
				line += ' ';
			} else {
				line += '#';
			}
		} else {
			if (j%2 == 0) {
				line += '#';
			} else {
				line += ' ';
			}
		}
	}
	console.log(line);
	console.log('\n');
	line ='';
}
*/