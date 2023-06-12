console.clear();
credits();

/*--------------------------------------------------------------
TABLE OF CONTENTS
----------------------------------------------------------------
1.0 PAPERSSS
    1.1 DOM ELEMENTS
    1.2 VARIABLES
    1.3 FUNCTIONS
    1.4 EVENT LISTENERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
1.0 SET-UP
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 1.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const textInput = document.querySelector('#input-text');
const lineLength = document.querySelector('#line-length');
const loremButton = document.querySelector('#lorem-button');
const wrapButton = document.querySelector('#wrap-button');
const resetButton = document.querySelector('#reset-button');

    /*------------------------------------------------------------
    |
    | 1.2 VARIABLES
    |
    ------------------------------------------------------------*/

lineLength.value = 50;

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Pellentesque lacinia velit vitae purus egestas imperdiet ut sit amet lacus. Sed imperdiet, dolor at hendrerit ultrices, est velit imperdiet nulla, in sagittis nibh lectus et velit. Donec pretium sit amet sapien nec consequat. Nam fermentum eleifend lorem quis rhoncus. Aliquam vel odio at elit sagittis interdum nec et ex. Vestibulum suscipit cursus nisl et rutrum. Praesent eros erat, ultricies ut ex in, euismod laoreet est. Donec a erat a mauris efficitur iaculis. Fusce tincidunt laoreet nisi, in gravida arcu placerat nec.

Etiam nisl felis, luctus et feugiat sed, dictum et libero. Pellentesque convallis sagittis odio et egestas. Morbi sagittis porta lacus porta eleifend. Etiam dictum efficitur dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus et nibh vitae augue maximus sodales. Maecenas ac pellentesque leo. Morbi nec leo id sapien posuere convallis. Sed congue orci nec sollicitudin mattis. Vestibulum malesuada nisi sit amet efficitur sollicitudin. Proin sed ultricies velit, vel ornare lectus. Nam ante urna, sollicitudin sit amet purus eu, sollicitudin venenatis ex. Vestibulum et cursus sem, in egestas diam. Praesent semper iaculis turpis, id lacinia ipsum fringilla ac. Nunc eleifend gravida eros. In commodo tincidunt justo at placerat.

Phasellus tempor ex nec metus consequat suscipit. Proin vel nibh tincidunt, pellentesque ligula vel, mattis dui. Aliquam erat volutpat. Proin iaculis auctor massa, eget fringilla lectus cursus id. In hendrerit nunc ac ligula eleifend, at egestas ligula congue. Mauris vel blandit ante, sit amet lacinia lectus. Pellentesque elit magna, volutpat sed feugiat eu, laoreet vitae arcu. Nam quis urna tristique velit facilisis sollicitudin id at diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce et congue tellus. Aliquam vitae ex sit amet lorem eleifend gravida a sed libero. Etiam dapib`

    /*------------------------------------------------------------
    |
    | 1.3 FUNCTIONS
    |
    ------------------------------------------------------------*/

function resetText(text) {
	console.log("Resetting text");

	let multiLineString = text.split('\n');

	newText = [];

	for (let i = 0; i < multiLineString.length; i++) {
		if (newText.length == 0 || newText[newText.length-1] == '' || multiLineString[i] == '') {
			newText.push(multiLineString[i].trim());
		} else {
			newText[newText.length-1] = newText[newText.length-1] + ' ' + multiLineString[i].trim();
		}
	}

	return newText
}

function wrapLine(line, wrapLength) {
	let lines = [''];
	while (line.length >= 1) {
		if (lines[lines.length-1].length + line[0].length < wrapLength) {
			lines[lines.length-1] = lines[lines.length-1] + ' ' + line[0];
			line.shift();
		} else if (lines[lines.length-1].length == 0) {
			lines[lines.length-1] = line[0];
			line.shift();
		} else {
			lines.push('');
		}
	}

	return lines
}

function wrapText(textList, wrapLength) {
	console.log("Wrapping text");

	newText = '';

	for (let i = 0; i < textList.length; i++) {
		if (textList[i].length < wrapLength) {
			newText += textList[i].trim() + '\n';
		} else {
			let line = textList[i].split(' ');
			let lines = wrapLine(line, wrapLength);
			
			for (let l = 0; l < lines.length; l++) {
				newText += lines[l].trim() + '\n';
			}
		}
	}

	if (newText[newText.length-1] == '\n') {
		newText = newText.substring(0, newText.length-1);
	}

	console.log(newText);

	return newText.trimStart();
}

    /*------------------------------------------------------------
    |
    | 1.4 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

lineLength.oninput = function() {
	textInput.value = wrapText(resetText(textInput.value), lineLength.value);
}

loremButton.addEventListener('click', () => {
    textInput.value = wrapText(resetText(lorem), lineLength.value);
})

wrapButton.addEventListener('click', () => {
    textInput.value = wrapText(resetText(textInput.value), lineLength.value);
})

resetButton.addEventListener('click', () => {
    textInput.value = '';
})

textInput.value = wrapText(resetText(lorem), lineLength.value);
