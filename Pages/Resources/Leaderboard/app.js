console.clear();
credits();

function round(number, decimalPlaces) {
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
}


// MongoDB
// const appName = 'data-pddjp';
// const mongoDatabaseURL = `https://data.mongodb-api.com/app/${appName}/endpoint/data/v1/action/`;
// const apiKey = CryptoJS.AES.decrypt("U2FsdGVkX1+dnt/VAVVIedObPfxFarPHuJ6ttji06Qu75SdEpY5hmD+q5TO2xBomem3iDCTVP3eqsj43QrruTKxEZVT5e8/u5LQtbw/ws5gako9dglBL0EIxZEd58T3e", "s2*%z3B2$4Ka").toString(CryptoJS.enc.Utf8);
// let authorisedToken = null;


// async function authorise() {
//     if (authorisedToken === null) {
//         let jsondata = {
//         'key': apiKey
//         }

//         let settings = {
//         "async": true,
//         "crossDomain": true,
//         "method": "POST",
//         "headers": {
//             'Content-Type': 'application/json'
//         },
//         'processData': false,
//         body: JSON.stringify(jsondata)
//         }

//         let response = await (await fetch(`https://realm.mongodb.com/api/client/v2.0/app/${appName}/auth/providers/api-key/login`, settings)).json();
//         authorisedToken = response.access_token;
//     }
//     return authorisedToken;
// }

// async function contactDatabase(action, database, collection, content=false) {
//     let token = await authorise();

//     const jsonData = {
//         'database': database,
//         'collection': collection,
//         'dataSource': 'Sparx',
//     }

//     if (content !== false && action == 'updateOne') {
//         jsonData.filter = { "_id": { "$oid": content[1] } };
//         jsonData.update = content[0];
//     } else if (content !== false && action == 'findOne') {
//         jsonData.filter = content;
//     } else if (content !== false) {
//         jsonData.document = content;
//     }

//     const settings = {
//         "async": true,
//         "crossDomain": true,
//         "method": "POST",
//         headers: {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//         'processData': false,
//         body: JSON.stringify(jsonData)
//     }

//     response = await (await fetch(mongoDatabaseURL + action, settings)).json();
    
//     return response
// }

// function twoDigits(val) {
//     if (val < 10) {
//         return '0' + val;
//     }
//     return val;
// }

// mongoPostButton.addEventListener('click', () => {
//     let today = new Date();
//     let date = today.getFullYear()+'-'+twoDigits((today.getMonth()+1))+'-'+twoDigits(today.getDate());
//     let time = twoDigits(today.getHours()) + ":" + twoDigits(today.getMinutes()) + ":" + twoDigits(today.getSeconds());
//     let dateTime = date+' '+time;

//     const document = {
//         "Jane Doe": "1234567890",
//         "time": dateTime
//     }
    
//     contactDatabase('insertOne', 'users', 'user-data', document);
// })

// mongoGetUsersButton.addEventListener('click', async () => {
//     console.log(await (await contactDatabase('find', 'users', 'user-data')).documents[0]);
// })

// mongoGetAnswersButton.addEventListener('click', async () => {
//     console.log(await contactDatabase('find', 'answers', 'user-data'));
// })

// mongoFindButton.addEventListener('click', async () => {
//     console.log(await contactDatabase('findOne', 'answers', 'user-data', { "_id": { "$oid": "63e9594bac08792f635e50e7"}})); 
// })

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

const users = document.querySelectorAll('.user');

const user1 = users[0];
const user2 = users[1];
const user3 = users[2];
const user4 = users[3];

const DATA = {
    'Alex': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    ':>': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    'Kelvin': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    'Daniel': [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
}

function increment(element, start, final, interval) {
    element.textContent = start + "%"
    start ++
    
    if (start > final) { return }
    
    setTimeout(increment, interval, element, start, final, interval)
}

user1.querySelector('.progress-container').style = `width: ${DATA.Alex.reduce((partialSum, a) => partialSum + a, 0) / DATA.Alex.length * 100}% !important`;
user2.querySelector('.progress-container').style = `width: ${DATA[':>'].reduce((partialSum, a) => partialSum + a, 0) / DATA[':>'].length * 100}% !important`;
user3.querySelector('.progress-container').style = `width: ${DATA.Kelvin.reduce((partialSum, a) => partialSum + a, 0) / DATA.Kelvin.length * 100}% !important`;
user4.querySelector('.progress-container').style = `width: ${DATA.Daniel.reduce((partialSum, a) => partialSum + a, 0) / DATA.Daniel.length * 100}% !important`;

increment(user1.querySelector('.score'), 0, Math.round(DATA.Alex.reduce((partialSum, a) => partialSum + a, 0) / DATA.Alex.length * 100), 30);
increment(user2.querySelector('.score'), 0, Math.round(DATA[':>'].reduce((partialSum, a) => partialSum + a, 0) / DATA[':>'].length * 100), 30);
increment(user3.querySelector('.score'), 0, Math.round(DATA.Kelvin.reduce((partialSum, a) => partialSum + a, 0) / DATA.Kelvin.length * 100), 30);
increment(user4.querySelector('.score'), 0, Math.round(DATA.Daniel.reduce((partialSum, a) => partialSum + a, 0) / DATA.Daniel.length * 100), 30);

user1.addEventListener('click', () => {
    for (let i = 0; i < DATA.Alex.length; i++) {
        checkboxes[i].checked = false;
        if (DATA.Alex[i] == 1) {
            checkboxes[i].checked = true;
        } else {
            checkboxes[i].checked = false;
        }
    }
})

user2.addEventListener('click', () => {
    for (let i = 0; i < DATA[':>'].length; i++) {
        checkboxes[i].checked = false;
        if (DATA[':>'][i] == 1) {
            checkboxes[i].checked = true;
        } else {
            checkboxes[i].checked = false;
        }
    }
})

user3.addEventListener('click', () => {
    for (let i = 0; i < DATA.Kelvin.length; i++) {
        checkboxes[i].checked = false;
        if (DATA.Kelvin[i] == 1) {
            checkboxes[i].checked = true;
        } else {
            checkboxes[i].checked = false;
        }
    }
})

user4.addEventListener('click', () => {
    for (let i = 0; i < DATA.Daniel.length; i++) {
        checkboxes[i].checked = false;
        if (DATA.Daniel[i] == 1) {
            checkboxes[i].checked = true;
        } else {
            checkboxes[i].checked = false;
        }
    } 
})


// SMOOTH SCROLL
$(".user").click(function() {
    $('html,body').animate({
        scrollTop: $(".sub-header.checklist").offset().top - 20},
        'fast');
});