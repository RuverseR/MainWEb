console.clear();
credits();

// R106
const lifeCycleAnalysis = document.querySelector('#lca-checkbox');
const scalesOfProduction = document.querySelector('#scales-of-production-checkbox');
const legislation = document.querySelector('#legislation-checkbox');
const lathe = document.querySelector('#lathe-checkbox');
const injectionMoulding = document.querySelector('#injection-moulding-checkbox');
const soldering = document.querySelector('#soldering-checkbox');
const strengthsAndWeaknesses = document.querySelector('#strengths-and-weaknesses-checkbox');
const productAnalysisPages = document.querySelector('#product-analysis-pages-checkbox');
const productAnalysisEvaluation = document.querySelector('#product-analysis-evaluation-checkbox');
const disassembly = document.querySelector('#disassembly-checkbox');
const conclusion = document.querySelector('#conclusion-checkbox');
const bibliography = document.querySelector('#bibliography-checkbox');

// R107
const initialDesigns = document.querySelector('#initial-designs-checkbox');
const twoPoint = document.querySelector('#two-point-checkbox');
const isometricHanddrawn = document.querySelector('#isometric-handdrawn-checkbox');
const orthographicHanddrawn = document.querySelector('#orthographic-handdrawn-checkbox');
const orthographicDigital = document.querySelector('#orthographic-digital-checkbox');
const isometricDigital = document.querySelector('#isometric-digital-checkbox');

// R108
const productSpecification = document.querySelector('#product-specification-checkbox');
const preProductionPlan = document.querySelector('#pre-production-plan-checkbox');
const riskAssessments = document.querySelector('#risk-assessments-checkbox');
const digitalDiary = document.querySelector('#digital-diary-checkbox');
const prototypeEvaluation = document.querySelector('#prototype-evaluation-checkbox');

const checkboxes = [lifeCycleAnalysis, scalesOfProduction, legislation, lathe, injectionMoulding, soldering, strengthsAndWeaknesses, productAnalysisPages, productAnalysisEvaluation, disassembly, conclusion, bibliography, initialDesigns, twoPoint, isometricHanddrawn, orthographicHanddrawn, orthographicDigital, isometricDigital, productSpecification, preProductionPlan, riskAssessments, digitalDiary, prototypeEvaluation]

const leaderboard = document.querySelector('.leaderboard');
const DATA = {
    'Alex': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ':>': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'Kelvin': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'Daniel': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
}

function increment(element, start, final, interval) {
    element.textContent = start + "%"
    start ++
    
    if (start > final) { return }
    
    setTimeout(increment, interval, element, start, final, interval)
}

function getScore(scoreList) {
    return Math.round(scoreList.reduce((partialSum, a) => partialSum + a, 0) / scoreList.length * 100);
}

function loadScores() {
    leaderboard.innerHTML = '';

    for (const [key, value] of Object.entries(DATA)) {
        const score = getScore(value);
        const user = document.createElement('div');
        user.classList.add('user');

        const html = `
        <div class="name">${key}</div>
        <div class="progress">
            <div class="progress-container" style="width: ${score}% !important">
                <div class="progress-value"></div>
            </div>
        </div>
        <div class="score">0%</div>`

        user.innerHTML = html;
        increment(user.querySelector('.score'), 0, score, 30);

        user.addEventListener('click', () => {
            for (let i = 0; i < value.length; i++) {
                checkboxes[i].checked = false;
                if (value[i] == 1) {
                    checkboxes[i].checked = true;
                } else {
                    checkboxes[i].checked = false;
                }
            }
        })

        leaderboard.appendChild(user);
    }
}

loadScores();

// SMOOTH SCROLL
$(".user").click(function() {
    $('html,body').animate({
        scrollTop: $(".sub-header.checklist").offset().top - 20},
        'fast');
});