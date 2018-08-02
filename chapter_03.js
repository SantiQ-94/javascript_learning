const min = function(a, b) {
	return a > b ? b : a;
};

function isEven(num) {
	if (num < 0)
		return '??';

	if (num == 0)
		return true;
	else if (num == 1)
		return false;
	else
		return isEven(num -2);
}

function countBs(text) {
	let counter = 0;
	for (let i = 0; i < text.length; i++) {
		if (text[i].toLowerCase() == 'b')
			counter ++;
	}
	return counter;
}

function countChar(text, char) {
	let counter = 0;
	for (var i = 0; i < text.length; i++) {
		if (text[i].toLowerCase() == char) {
			counter++;
		}
	}
	return counter;
}