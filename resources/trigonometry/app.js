console.clear();
credits();

// TRIGIONOMETRY
const inputATrig = document.querySelector('#a-trig');
const inputBTrig = document.querySelector('#b-trig');
const inputCTrig = document.querySelector('#c-trig');
const inputAlphaTrig = document.querySelector('#alpha-trig');
const inputBetaTrig = document.querySelector('#beta-trig');
const outputTrig = document.querySelector('#output-trig');

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

inputATrig.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'a') {
        changedVariables.push('a');
    }
    trigonometry();
}

inputBTrig.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'b') {
        changedVariables.push('b');
    }
    trigonometry();
}

inputCTrig.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'c') {
        changedVariables.push('c');
    }
    trigonometry();
}

inputAlphaTrig.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'alpha') {
        changedVariables.push('alpha');
    }    trigonometry();
}

inputBetaTrig.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'beta') {
        changedVariables.push('beta');
    }    trigonometry();
}


// COSINE RULE
const inputACosine = document.querySelector('#a-cosine');
const inputBCosine = document.querySelector('#b-cosine');
const inputCCosine = document.querySelector('#c-cosine');
const inputGammaCosine = document.querySelector('#gamma-cosine');
const outputCosine = document.querySelector('#output-cosine');

let changedVariablesCosine = [];

async function cosine() {
    if (changedVariablesCosine.length <= 1) { return }

    const inputs = changedVariablesCosine.slice(changedVariablesCosine.length-3);
    console.log(inputs.join(', '));

    // Computation
    function toRadians(degrees) {
        return degrees * Math.PI/180;
    }

    function toDegrees(radians) {
        return radians * 180/Math.PI;
    }

    const a = inputACosine.value;
    const b = inputBCosine.value;
    const c = inputCCosine.value;
    const gamma = inputGammaCosine.value;

    let aValue = inputACosine.value;
    let bValue = inputBCosine.value;
    let cValue = inputCCosine.value;
    let gammaValue = inputGammaCosine.value;

    if (inputs.includes('a') && inputs.includes('b') && inputs.includes('c')) {
        gammaValue = round(toDegrees(Math.acos((a**2 + b**2 - c**2) / (2*a*b))), 3)
    } else if (inputs.includes('a') && inputs.includes('b') && inputs.includes('gamma')) {
        cValue = round((a**2 + b**2 - 2*a*b*Math.cos(toRadians(gamma)))**(1/2), 3)
    } else if (inputs.includes('a') && inputs.includes('c') && inputs.includes('gamma')) {
        bValue = round(a * Math.cos(toRadians(gamma)) + (c**2 - a**2 * (Math.sin(toRadians(gamma))**2))**(1/2), 3)
    } else if (inputs.includes('b') && inputs.includes('c') && inputs.includes('gamma')) {
        aValue = round(b * Math.cos(toRadians(gamma)) + (c**2 - b**2 * (Math.sin(toRadians(gamma))**2))**(1/2), 3)
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

inputACosine.oninput = function() {
    if (changedVariablesCosine.length == 0 || changedVariablesCosine[changedVariablesCosine.length - 1] != 'a') {
        changedVariablesCosine.push('a');
    }
    cosine();
}

inputBCosine.oninput = function() {
    if (changedVariablesCosine.length == 0 || changedVariablesCosine[changedVariablesCosine.length - 1] != 'b') {
        changedVariablesCosine.push('b');
    }
    cosine();
}

inputCCosine.oninput = function() {
    if (changedVariablesCosine.length == 0 || changedVariablesCosine[changedVariablesCosine.length - 1] != 'c') {
        changedVariablesCosine.push('c');
    }
    cosine();
}

inputGammaCosine.oninput = function() {
    if (changedVariablesCosine.length == 0 || changedVariablesCosine[changedVariablesCosine.length - 1] != 'gamma') {
        changedVariablesCosine.push('gamma');
    }    
    cosine();
}