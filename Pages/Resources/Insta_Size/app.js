console.clear();
credits();

// PROGRAM
const fileInput = document.querySelector('#upload');
const fileChosen = document.querySelector('#file-chosen');
const subHeader = document.querySelector('.sub-header');
const inputs = document.querySelector('.inputs');
const columnsInput = document.querySelector('#columns');
const rowsInput = document.querySelector('#rows');
const gridContainer = document.querySelector('.grid-container');
const uploadedImageContainer = document.querySelector('.uploaded-image');
const uploadedImage = document.querySelector('#source');
const gridImage = document.querySelector('#inner-source');

let columns = 1;
let rows = 1;

let imageWidth = 0;
let imageHeight = 0;

let crop = '';

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
            inputs.classList.add('active');
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
			box.style.padding = padding + 'px';
            row.appendChild(box);
        };
      
        grid.appendChild(row);      
    };
	gridImage.style.margin = margin;
    gridContainer.appendChild(grid);
};

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

function getMargin(padding) {
	if (crop == 'horizontal') {
		margin = ((imageWidth - padding * 2 * rows) / 2) * -1;
		console.log(margin)
		return '2px 0px 0px ' + margin + 'px';
	} else {
		margin = ((imageHeight - padding * 2 * columns) / 2) * -1;
		console.log(margin)
		return margin + 'px 0px 0px 2px ';
	}
}

columnsInput.oninput = function() {
    createGrid();
}

rowsInput.oninput = function() {
    createGrid();
}

window.addEventListener('resize', () => {
	createGrid();
})
