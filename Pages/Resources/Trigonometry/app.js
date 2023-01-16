console.clear();
credits();


// FUNCTIONS 
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function round(number, decimalPlaces) {
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
}


// PROGRAM
const inputA = document.querySelector('#a');
const inputB = document.querySelector('#b');
const inputC = document.querySelector('#c');
const inputAlpha = document.querySelector('#alpha');
const inputBeta = document.querySelector('#beta');
const output = document.querySelector('#output');

let changedVariables = [];

async function trigonometry() {
    if (changedVariables.length <= 1) { return }

    const inputs = [changedVariables[changedVariables.length - 1], changedVariables[changedVariables.length - 2]];
    console.log(inputs.join(', '));

    // Computation

    function toRadians(degrees) {
        return degrees * Math.PI/180;
    }

    function toDegrees(radians) {
        return radians * 180/Math.PI;
    }

    const a = inputA.value;
    const b = inputB.value;
    const c = inputC.value;
    const alpha = inputAlpha.value;
    const beta = inputBeta.value;

    let aValue = inputA.value;
    let bValue = inputB.value;
    let cValue = inputC.value;
    let alphaValue = inputAlpha.value;
    let betaValue = inputBeta.value;

    // input a 
    if (inputs.includes('a') && inputs.includes('b')) {
        cValue = round((a**2 + b**2) ** (0.5), 3);
        alphaValue = round(toDegrees(Math.atan(a / b)), 3);
        betaValue = round(toDegrees(Math.atan(b / a)), 3);
    } else if (inputs.includes('a') && inputs.includes('c')) {
        bValue = round((c**2 - a**2) ** (0.5), 3);
        alphaValue = round(toDegrees(Math.asin(a / c)), 3);
        betaValue = round(toDegrees(Math.acos(a / c)), 3);
    } else if (inputs.includes('a') && inputs.includes('alpha')) {
        bValue = round(a / (Math.tan(toRadians(alpha))), 3);
        cValue = round(a / (Math.sin(toRadians(alpha))), 3);
        betaValue = round(toDegrees(Math.atan((a / Math.tan(toRadians(alpha))) / a)), 3);
    } else if (inputs.includes('a') && inputs.includes('beta')) {
        bValue = round(a * (Math.tan(toRadians(beta))), 3);
        cValue = round(a / (Math.cos(toRadians(beta))), 3);
        alphaValue = round(toDegrees(Math.atan(a / (a * Math.tan(toRadians(beta))))), 3);
    }

    // input b 
    else if (inputs.includes('b') && inputs.includes('c')) {
        aValue = round((c**2 - b**2) ** (0.5), 3);
        alphaValue = round(toDegrees(Math.acos(b / c)), 3);
        betaValue = round(toDegrees(Math.asin(b / c)), 3);
    } else if (inputs.includes('b') && inputs.includes('alpha')) {
        aValue = round(b * Math.tan(toRadians(alpha)), 3);
        cValue = round(b / Math.cos(toRadians(alpha)), 3);
        betaValue = round(toDegrees(Math.atan(b / (b * Math.tan(toRadians(alpha))))), 3);
    } else if (inputs.includes('b') && inputs.includes('beta')) {
        aValue = round(b / (Math.tan(toRadians(beta))), 3);
        cValue = round(b / (Math.sin(toRadians(beta))), 3);
        alphaValue = round(toDegrees(Math.atan((b / (Math.tan(toRadians(beta)))) / b)), 3);
    }

    // input c 
    else if (inputs.includes('c') && inputs.includes('alpha')) {
        aValue = round(c * Math.sin(toRadians(alpha)), 3);
        bValue = round(c * Math.cos(toRadians(alpha)), 3);
        betaValue = round(toDegrees(Math.acos((c * Math.sin(toRadians(alpha))) / c)), 3);
    } else if (inputs.includes('c') && inputs.includes('beta')) {
        aValue = round(c * Math.cos(toRadians(beta)), 3);
        bValue = round(c * Math.sin(toRadians(beta)), 3);
        alphaValue = round(toDegrees(Math.asin((c * Math.cos(toRadians(beta))) / c)), 3);
    }

    // input alpha 
    else if (inputs.includes('alpha') && inputs.includes('beta')) {
        output.innerHTML = '<span class="orange-text">Hint</span>: Try adding the length of a <span class="orange-text">side</span>.';
        await sleep(2000);
        output.innerHTML = '<span class="orange-text">Hint</span>: Angles are calculated in <span class="orange-text">degrees</span>.';
    }

    inputA.value = aValue;
    inputB.value = bValue;
    inputC.value = cValue;
    inputAlpha.value = alphaValue;
    inputBeta.value = betaValue;

    if (isNaN(aValue) || isNaN(bValue) || isNaN(cValue) || isNaN(alphaValue) || isNaN(betaValue)) {
        output.innerHTML = '<span class="orange-text">Error</span>: Angle α and Angle β must be <span class="orange-text">bigger</span> than <span class="orange-text">zero</span>.';
        await sleep(2000);
        output.innerHTML = '<span class="orange-text">Hint</span>: Angles are calculated in <span class="orange-text">degrees</span>.';
    }
}

inputA.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'a') {
        changedVariables.push('a');
    }
    trigonometry();
}

inputB.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'b') {
        changedVariables.push('b');
    }
    trigonometry();
}

inputC.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'c') {
        changedVariables.push('c');
    }
    trigonometry();
}

inputAlpha.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'alpha') {
        changedVariables.push('alpha');
    }    trigonometry();
}

inputBeta.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'beta') {
        changedVariables.push('beta');
    }    trigonometry();
}