console.clear();
credits();

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

// PROGRAM
const inputA = document.querySelector('#a');
const inputB = document.querySelector('#b');
const inputC = document.querySelector('#c');
const output = document.querySelector('#output');

function quadraticSolve(a, b, c) {
    var discriminant = ((b*b)-(4*a*c))**(1/2)
    var solutions = [((-b+discriminant)/(2*a)),((-b-discriminant)/(2*a))]
    console.log(solutions.join(' '));
    return solutions
}

function displayQuadratic() {
    if ((inputA && inputA.value) && (inputB && inputB.value) && (inputC && inputC.value)) {
        solutions = quadraticSolve(inputA.value, inputB.value, inputC.value)
        output.innerHTML = "loading...";
        if (isNaN(solutions[0]) || isNaN(solutions[1])) {
          for (i = 0; i < solutions.length; i++) {
            solutions[i] = 'x = ' + solutions[i];
          }
          output.innerHTML = solutions.join('&nbsp;&nbsp;&nbsp;&nbsp; ') + "<br><br>This happened because you tried to get the square root of a negative number.<br><br>Hint: Try increasing the value of b."
        }
        else {
          output.innerHTML = `<span class="orange-text">x</span> = ${solutions[0]}&nbsp;&nbsp;&nbsp;&nbsp; <span class="orange-text">x</span> = ${solutions[1]}`
        }
      }
}

inputA.oninput = function() {
    displayQuadratic();
}

inputB.oninput = function() {
    displayQuadratic();
}

inputC.oninput = function() {
    displayQuadratic();
}