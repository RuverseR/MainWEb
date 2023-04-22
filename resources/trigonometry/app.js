console.clear();
credits();

/*--------------------------------------------------------------
TABLE OF CONTENTS
----------------------------------------------------------------
1.0 GLOBAL FUNCTIONS
1.0 TRIGONOMETRY
    1.1 DOM ELEMENTS
    1.2 FUNCTIONS
    1.3 EVENT LISTENERS
2.0 COSINE RULE
    2.1 DOM ELEMENTS
    2.2 FUNCTIONS
    2.3 EVENT LISTENERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
1.0 GLOBAL FUNCTIONS
--------------------------------------------------------------*/

function generateAnswer(changedVariables, variable, generatorFunction) {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != variable) {
        changedVariables.push(variable);
    }
    generatorFunction();
}

function toRadians(degrees) {
    return degrees * Math.PI/180;
}

function toDegrees(radians) {
    return radians * 180/Math.PI;
}

function sin(degrees) {
    return Math.sin(toRadians(degrees))
}

function cos(degrees) {
    return Math.sin(toRadians(degrees))
}

function tan(degrees) {
    return Math.sin(toRadians(degrees))
}

function asin(degrees) {
    return toDegrees(Math.asin(degrees))
}

function acos(degrees) {
    return toDegrees(Math.acos(degrees))
}

function atan(degrees) {
    return toDegrees(Math.atan(degrees))
}

/*--------------------------------------------------------------
1.0 TRIGONOMETRY
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 1.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const inputATrig = document.querySelector('#a-trig');
const inputBTrig = document.querySelector('#b-trig');
const inputCTrig = document.querySelector('#c-trig');
const inputAlphaTrig = document.querySelector('#alpha-trig');
const inputBetaTrig = document.querySelector('#beta-trig');
const outputTrig = document.querySelector('#output-trig');

    /*------------------------------------------------------------
    |
    | 1.2 FUNCTIONS
    |
    ------------------------------------------------------------*/

let changedVariablesTrig = [];

async function trigonometry() {
    if (changedVariablesTrig.length <= 1) { return }

    const inputs = [changedVariablesTrig[changedVariablesTrig.length - 1], changedVariablesTrig[changedVariablesTrig.length - 2]];
    console.log(inputs.join(', '));

    const a = inputATrig.value;
    const b = inputBTrig.value;
    const c = inputCTrig.value;
    const alpha = inputAlphaTrig.value;
    const beta = inputBetaTrig.value;

    let aValue = inputATrig.value;
    let bValue = inputBTrig.value;
    let cValue = inputCTrig.value;
    let alphaValue = inputAlphaTrig.value;
    let betaValue = inputBetaTrig.value;

    // input a 
    if (inputs.includes('a') && inputs.includes('b')) {
        cValue = round((a**2 + b**2) ** (0.5), 3);
        alphaValue = round(atan(a / b), 3);
        betaValue = round(atan(b / a), 3);
    } else if (inputs.includes('a') && inputs.includes('c')) {
        bValue = round((c**2 - a**2) ** (0.5), 3);
        alphaValue = round(asin(a / c), 3);
        betaValue = round(acos(a / c), 3);
    } else if (inputs.includes('a') && inputs.includes('alpha')) {
        bValue = round(a / tan(alpha), 3);
        cValue = round(a / sin(alpha), 3);
        betaValue = round(atan((a / tan(alpha)) / a), 3);
    } else if (inputs.includes('a') && inputs.includes('beta')) {
        bValue = round(a * tan(beta), 3);
        cValue = round(a / cos(beta), 3);
        alphaValue = round(atan(a / (a * tan(beta))), 3);
    }

    // input b 
    else if (inputs.includes('b') && inputs.includes('c')) {
        aValue = round((c**2 - b**2) ** (0.5), 3);
        alphaValue = round(acos(b / c), 3);
        betaValue = round(asin(b / c), 3);
    } else if (inputs.includes('b') && inputs.includes('alpha')) {
        aValue = round(b * tan(alpha), 3);
        cValue = round(b / cos(alpha), 3);
        betaValue = round(atan(b / (b * tan(alpha))), 3);
    } else if (inputs.includes('b') && inputs.includes('beta')) {
        aValue = round(b / tan(beta), 3);
        cValue = round(b / sin(beta), 3);
        alphaValue = round(atan(b / (tan(beta) / b)), 3);
    }

    // input c 
    else if (inputs.includes('c') && inputs.includes('alpha')) {
        aValue = round(c * sin(alpha), 3);
        bValue = round(c * cos(alpha), 3);
        betaValue = round(acos((c * sin(alpha)) / c), 3);
    } else if (inputs.includes('c') && inputs.includes('beta')) {
        aValue = round(c * cos(beta), 3);
        bValue = round(c * sin(beta), 3);
        alphaValue = round(asin(c * cos(beta) / c), 3);
    }

    // input alpha 
    else if (inputs.includes('alpha') && inputs.includes('beta')) {
        outputTrig.innerHTML = '<span class="orange-text">Hint</span>: Try adding the length of a <span class="orange-text">side</span>.';
        await sleep(2000);
        outputTrig.innerHTML = '<span class="orange-text">Hint</span>: Angles are calculated in <span class="orange-text">degrees</span>.';
    }

    inputATrig.value = aValue;
    inputBTrig.value = bValue;
    inputCTrig.value = cValue;
    inputAlphaTrig.value = alphaValue;
    inputBetaTrig.value = betaValue;

    if (isNaN(aValue) || isNaN(bValue) || isNaN(cValue) || isNaN(alphaValue) || isNaN(betaValue)) {
        outputTrig.innerHTML = '<span class="orange-text">Error</span>: Angle α and Angle β must be <span class="orange-text">bigger</span> than <span class="orange-text">zero</span>.';
        await sleep(2000);
        outputTrig.innerHTML = '<span class="orange-text">Hint</span>: Angles are calculated in <span class="orange-text">degrees</span>.';
    }
}

    /*------------------------------------------------------------
    |
    | 1.3 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

inputATrig.oninput = function() {
    generateAnswer(changedVariablesTrig, 'a', trigonometry);
}

inputBTrig.oninput = function() {
    generateAnswer(changedVariablesTrig, 'b', trigonometry);
}

inputCTrig.oninput = function() {
    generateAnswer(changedVariablesTrig, 'c', trigonometry);
}

inputAlphaTrig.oninput = function() {
    generateAnswer(changedVariablesTrig, 'alpha', trigonometry);
}

inputBetaTrig.oninput = function() {
    generateAnswer(changedVariablesTrig, 'beta', trigonometry);
}

/*--------------------------------------------------------------
2.0 COSINE RULE
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 2.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const inputACosine = document.querySelector('#a-cosine');
const inputBCosine = document.querySelector('#b-cosine');
const inputCCosine = document.querySelector('#c-cosine');
const inputGammaCosine = document.querySelector('#gamma-cosine');
const outputCosine = document.querySelector('#output-cosine');

    /*------------------------------------------------------------
    |
    | 2.2 FUNCTIONS
    |
    ------------------------------------------------------------*/

let changedVariablesCosine = [];

async function cosine() {
    if (changedVariablesCosine.length <= 1) { return }

    const inputs = changedVariablesCosine.slice(changedVariablesCosine.length-3);
    console.log(inputs.join(', '));

    const a = inputACosine.value;
    const b = inputBCosine.value;
    const c = inputCCosine.value;
    const gamma = inputGammaCosine.value;

    let aValue = inputACosine.value;
    let bValue = inputBCosine.value;
    let cValue = inputCCosine.value;
    let gammaValue = inputGammaCosine.value;

    if (inputs.includes('a') && inputs.includes('b') && inputs.includes('c')) {
        gammaValue = round(acos((a**2 + b**2 - c**2) / (2*a*b)), 3);
    } else if (inputs.includes('a') && inputs.includes('b') && inputs.includes('gamma')) {
        cValue = round((a**2 + b**2 - 2*a*b*cos(gamma))**(1/2), 3);
    } else if (inputs.includes('a') && inputs.includes('c') && inputs.includes('gamma')) {
        bValue = round(a * cos(gamma) + (c**2 - a**2 * (sin(gamma)**2))**(1/2), 3)
    } else if (inputs.includes('b') && inputs.includes('c') && inputs.includes('gamma')) {
        aValue = round(b * cos(gamma) + (c**2 - b**2 * (sin(gamma)**2))**(1/2), 3)
    } 

    inputACosine.value = aValue;
    inputBCosine.value = bValue;
    inputCCosine.value = cValue;
    inputGammaCosine.value = gammaValue;

    if (isNaN(aValue) || isNaN(bValue) || isNaN(cValue) || isNaN(gammaValue)) {
        outputCosine.innerHTML = '<span class="orange-text">Error</span>: You f*cked up.';
        await sleep(2000);
        outputCosine.innerHTML = '<span class="orange-text">Hint</span>: Angles are calculated in <span class="orange-text">degrees</span>.';
    }
}

    /*------------------------------------------------------------
    |
    | 2.3 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

inputACosine.oninput = function() {
    generateAnswer(changedVariablesCosine, 'a', cosine);
}

inputBCosine.oninput = function() {
    generateAnswer(changedVariablesCosine, 'b', cosine);
}

inputCCosine.oninput = function() {
    generateAnswer(changedVariablesCosine, 'c', cosine);
}

inputGammaCosine.oninput = function() {
    generateAnswer(changedVariablesCosine, 'gamma', cosine);
}