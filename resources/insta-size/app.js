console.clear();
credits();

// PROGRAM
const fileInput = document.querySelector('#upload');
const fileChosen = document.querySelector('#file-chosen');
const subHeader = document.querySelector('.sub-header');
const downloadButton = document.querySelector('#download');
const inputs = document.querySelectorAll('.inputs');
const columnsInput = document.querySelector('#columns');
const rowsInput = document.querySelector('#rows');
const offsetInputX = document.querySelector('#offset-x');
const offsetInputY = document.querySelector('#offset-y');
const gridContainer = document.querySelector('.grid-container');
const uploadedImageContainer = document.querySelector('.uploaded-image');
const uploadedImage = document.querySelector('#source');
const gridImage = document.querySelector('#inner-source');

let columns = 1;
let rows = 1;

let imageWidth = 0;
let imageHeight = 0;

let crop = '';
const canvas = document.createElement('canvas');

function readURL() {
    if (fileInput.files && fileInput.files[0]) {
        fileChosen.textContent = fileInput.files[0].name;  
        let reader = new FileReader();
        reader.onload = function (e) {
            console.log("changed");
			gridImage.src = e.target.result;
            uploadedImage.src = e.target.result;
            uploadedImageContainer.classList.add('active');
            subHeader.classList.add('active');
			for (i = 0; i < inputs.length; ++i) {
				inputs[i].classList.add('active');
			}

			// Reset sliders 
			offsetInputX.value = 50;
			offsetInputY.value = 50;
		}
        reader.readAsDataURL(fileInput.files[0]);
    }
}

fileInput.addEventListener('change', () => {
    readURL();
})

function createGrid() {
	// Check if all inputs are satisfied
	if (!((columnsInput && columnsInput.value) && (rowsInput && rowsInput.value))) { return }

	// Delete previous grid
	if (document.querySelector('#grid')) { document.querySelector('#grid').remove() }

	console.log('creating grid');

	imageWidth = uploadedImage.width;
	imageHeight = uploadedImage.height;

	// Make sure cropped image works on mobile 
	gridImage.style.width = uploadedImage.width + 'px';
	gridImage.style.height = uploadedImage.height + 'px';

	rows = rowsInput.value;
	columns = columnsInput.value;

	const padding = getPadding();
	const margin = getMargin(padding);

    let grid = document.createElement("div");
    grid.id = "grid";
    grid.className = "container";

    for (i = 0; i < columns; i++) {
        let row = document.createElement("div");
        row.className = "row";
        row.id = "row" + i;

        for (k = 0; k < rows; k++) {
            let box = document.createElement("div"); 
            box.className = "box";
			if (rows > 10 || columns > 10) {
				box.style.border = '1px solid orange';
				box.style.padding = padding + 1 + 'px';
			} else {
				box.style.padding = padding + 'px';
				box.style.border = '2px solid orange';
			}
			row.appendChild(box);
		}
		
		grid.appendChild(row);
	}

	downloadButton.classList.add('active');

	gridImage.style.margin = margin;
	gridContainer.appendChild(grid);
}

function getRatio() {
	heightMultiplier = imageHeight / columns;
	widthMultiplier = imageWidth / rows;

	if (heightMultiplier > widthMultiplier) {
		crop = 'vertical';
		return widthMultiplier / uploadedImage.width
	} else {
		crop = 'horizontal';
		return heightMultiplier / uploadedImage.height
	}
}

function getSquareSize() {
	heightMultiplier = imageHeight / columns;
	widthMultiplier = imageWidth / rows;

	if (heightMultiplier > widthMultiplier) {
		crop = 'vertical';
		return widthMultiplier
	} else {
		crop = 'horizontal';
		return heightMultiplier
	}
}

function getPadding() {
	heightMultiplier = imageHeight / columns;
	widthMultiplier = imageWidth / rows;

	if (heightMultiplier > widthMultiplier) {
		crop = 'vertical';
		return widthMultiplier / 2 - 2
	} else {
		crop = 'horizontal';
		return heightMultiplier / 2 - 2
	}
}

function getPosition(squareSize) {
	let left = uploadedImage.width / 2 - canvas.width / 2; 
	let top = uploadedImage.height / 2 - canvas.height / 2; 

	console.log(left);
	console.log(top);

	if (crop == 'horizontal') {
		let offset = ((offsetInputX.value - 50) / 100) * (imageWidth - squareSize * rows);
		left -= offset;
	} else {
		let offset = ((offsetInputY.value - 50) / 100) * (imageHeight - squareSize * columns);
		top -= offset;
	}

	return [left, top]
}

function getMargin(padding) {
	if (crop == 'horizontal') {
		gridContainer.style['margin-top'] = '0px';
		offsetInputY.classList.add('inactive');
		offsetInputX.classList.remove('inactive');
		let offset = ((offsetInputX.value - 50) / 100) * (imageWidth - padding * 2 * rows);
		let margin = ((imageWidth - padding * 2 * rows) / 2) * -1 + offset;
		gridContainer.style['margin-left'] = offset * -2 + 5 + 'px';
		return '2px 0px 0px ' + margin + 'px';
	} else {
		gridContainer.style['margin-left'] = '0px';
		offsetInputX.classList.add('inactive');
		offsetInputY.classList.remove('inactive');
		let offset = ((offsetInputY.value - 50) / 100) * (imageHeight - padding * 2 * columns);
		let margin = ((imageHeight - padding * 2 * columns) / 2) * -1 + offset;
		gridContainer.style['margin-top'] = offset * -2 + 5 + 'px';
		return margin + 'px 0px 0px 2px ';
	}
}

columnsInput.oninput = function() {
	createGrid();
}

rowsInput.oninput = function() {
	createGrid();
}

function snap(input) {
	if (input.value < 55 && input.value > 45) {
		input.value = 50;
	}
	if (input.value < 2) {
		input.value = 2;
	}
}

offsetInputX.oninput = function() {
	snap(offsetInputX);
	createGrid();
}

offsetInputY.oninput = function() {
	snap(offsetInputY);
	createGrid();
}

window.addEventListener('resize', () => {
	gridImage.style.width = uploadedImage.width + 'px';
	gridImage.style.height = uploadedImage.height + 'px';
	createGrid();
})

function downloadBase64File(base64Data) {
	const linkSource = base64Data;
	const downloadLink = document.createElement("a");
	downloadLink.href = linkSource;
	downloadLink.download = 'Test';
	downloadLink.click();
}

function cropImage() {
	let squareSize = getSquareSize();
	canvas.width = squareSize;
	canvas.height = squareSize;

	let ratio = getRatio();
	let cropWidth = uploadedImage.width * ratio;
	let cropHeight = uploadedImage.height * ratio;

	let position = getPosition(squareSize);
	let left = position[0];
	let top = position[1];

	let cropLeft = -left * ratio;
	let cropTop = -top * ratio;

	let ctx = canvas.getContext('2d');

	ctx.drawImage(uploadedImage, cropLeft, cropTop, cropWidth, cropHeight);
}

function saveImage() {
	try {
		cropImage();
		const base64Img = canvas.toDataURL('image/jpeg', 1.0);
		downloadBase64File(base64Img);
	} catch(e) { alert(e); }
}

downloadButton.addEventListener('click', () => {
	saveImage();
})