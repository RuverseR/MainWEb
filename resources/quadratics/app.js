console.clear();
credits();

function addPlus(number) {
	if (!(isNumeric(number))) { return number }

	if (number < 0) {
		return number;
	} else {
		return '+' + number;
	}
}

// QUADRATIC FORMULA
const DECIMAL_PLACES = 5;

const inputQuadraticA = document.querySelector('#quadratic-formula #a');
const inputQuadraticB = document.querySelector('#quadratic-formula #b');
const inputQuadraticC = document.querySelector('#quadratic-formula #c');
const outputQuadratic = document.querySelector('#quadratic-formula #output');

function quadraticSolve(a, b, c) {
    let discriminant = ((b*b)-(4*a*c))**(1/2)
    let solutions = [round(((-b+discriminant)/(2*a)), DECIMAL_PLACES), round(((-b-discriminant)/(2*a)), DECIMAL_PLACES)]
    console.log(solutions.join(' '));
    return solutions
}

function displayQuadratic() {
    if ((inputQuadraticA && inputQuadraticA.value) && (inputQuadraticB && inputQuadraticB.value) && (inputQuadraticC && inputQuadraticC.value)) {
        let solutions = quadraticSolve(inputQuadraticA.value, inputQuadraticB.value, inputQuadraticC.value)
        outputQuadratic.innerHTML = "loading...";
        if (isNaN(solutions[0]) || isNaN(solutions[1])) {
			for (i = 0; i < solutions.length; i++) {
				solutions[i] = 'x = ' + solutions[i];
			}
			outputQuadratic.innerHTML = solutions.join('&nbsp;&nbsp;&nbsp;&nbsp; ') + "<br><br>This <span class='orange-text'>happened</span> because you tried to get the square root of a <span class='orange-text'>negative</span> number.<br><br>Hint: Try <span class='orange-text'>increasing</span> the value of <span class='orange-text'>b</span>."
        }
        else {
			outputQuadratic.innerHTML = `<span class="orange-text">x</span> = ${solutions[0]}<br><br><span class="orange-text">x</span> = ${solutions[1]}`
        }
	}
}

inputQuadraticA.oninput = function() {
    displayQuadratic();
}

inputQuadraticB.oninput = function() {
    displayQuadratic();
}

inputQuadraticC.oninput = function() {
    displayQuadratic();
}


// COMPLETING THE SQUARE
const inputTurningPointA = document.querySelector('#completing-the-square #a');
const inputTurningPointB = document.querySelector('#completing-the-square #b');
const inputTurningPointC = document.querySelector('#completing-the-square #c');
const outputTurningPoint = document.querySelector('#completing-the-square #output');

function completeSquare(a, b, c) {
    let x = -b / (2 * a)
    let y = c - (b**2 / (4*a))
    console.log(`(${x}, ${y})`);
    return [x, y]
}

function displayTurningPoint() {
	console.log("Getting turning point")
	if ((inputTurningPointA && inputTurningPointA.value) && (inputTurningPointB && inputTurningPointB.value) && (inputTurningPointC && inputTurningPointC.value)) {
		let solutions = completeSquare(inputTurningPointA.value, inputTurningPointB.value, inputTurningPointC.value)
		outputTurningPoint.innerHTML = "loading...";

		if (isNaN(solutions[0]) || isNaN(solutions[1])) {
			outputTurningPoint.innerHTML = `<span class="orange-text">Turning Point</span> = (${solutions[0]}, ${solutions[1]})` + "<br><br>This <span class='orange-text'>happened</span> because you tried to get the square root of a <span class='orange-text'>negative</span> number.<br><br>Hint: Try <span class='orange-text'>increasing</span> the value of <span class='orange-text'>b</span>.";
		} else {
			outputTurningPoint.innerHTML = `<span class="orange-text">Equation </span><span id="equation"></span><br><br><span class="orange-text">Turning Point</span> = (${solutions[0]}, ${solutions[1]})`;
			
			equation = `=${inputTurningPointA.value}(x${addPlus(solutions[0]*-1)})²${addPlus(solutions[1])}`;
			katex.render(equation, document.getElementById('equation'), {
				throwOnError: false
			});
		}
	}
}

inputTurningPointA.oninput = function() {
	displayTurningPoint();
}

inputTurningPointB.oninput = function() {
	displayTurningPoint();
}

inputTurningPointC.oninput = function() {
	displayTurningPoint();
}
