console.clear();
credits();

// PROGRAM

// Languages
const italian = [document.querySelector('#italian-checkbox'), 'italian'];
const chinese = [document.querySelector('#chinese-checkbox'), 'chinese'];
const panjabi = [document.querySelector('#panjabi-checkbox'), 'panjabi'];
const polish = [document.querySelector('#polish-checkbox'), 'polish'];
const bengali = [document.querySelector('#bengali-checkbox'), 'bengali'];
const hebrew = [document.querySelector('#hebrew-checkbox'), 'hebrew'];
const spanish = [document.querySelector('#spanish-checkbox'), 'spanish'];
const urdu = [document.querySelector('#urdu-checkbox'), 'urdu'];
const french = [document.querySelector('#french-checkbox'), 'french'];
const german = [document.querySelector('#german-checkbox'), 'german'];

// Science
const chemistry = [document.querySelector('#chemistry-checkbox'), 'chemistry'];
const biology = [document.querySelector('#biology-checkbox'), 'biology'];
const physics = [document.querySelector('#physics-checkbox'), 'physics'];
const combinedScience = [document.querySelector('#combined-science-checkbox'), 'combinedScience'];
const separateSciences = [document.querySelector('#separate-sciences-checkbox'), 'separateSciences'];

// English
const englishLiterature = [document.querySelector('#english-literature-checkbox'), 'englishLiterature'];
const englishLanguage = [document.querySelector('#english-language-checkbox'), 'englishLanguage'];

// Maths
const statistics = [document.querySelector('#statistics-checkbox'), 'statistics'];
const furtherMaths = [document.querySelector('#further-maths-checkbox'), 'furtherMaths'];
const maths = [document.querySelector('#maths-checkbox'), 'maths'];

// Engineering
const engineering = [document.querySelector('#engineering-checkbox'), 'engineering'];
const foodPreparation = [document.querySelector('#food-preparation-checkbox'), 'foodPreparation'];
const designTechnology = [document.querySelector('#design-technology-checkbox'), 'designTechnology'];
const business = [document.querySelector('#business-checkbox'), 'business'];
const computerScience = [document.querySelector('#computer-science-checkbox'), 'computerScience'];

// Humanities
const religiousStudies = [document.querySelector('#religious-studies-checkbox'), 'religiousStudies'];
const citizenshipStudies = [document.querySelector('#citizenship-studies-checkbox'), 'citizenshipStudies'];
const sociology = [document.querySelector('#sociology-checkbox'), 'sociology'];
const economics = [document.querySelector('#economics-checkbox'), 'economics'];
const history = [document.querySelector('#history-checkbox'), 'history'];
const psychology = [document.querySelector('#psychology-checkbox'), 'psychology'];
const geography = [document.querySelector('#geography-checkbox'), 'geography'];

// Other
const drama = [document.querySelector('#drama-checkbox'), 'drama'];
const mediaStudies = [document.querySelector('#media-studies-checkbox'), 'mediaStudies'];
const physicalEducation = [document.querySelector('#physical-education-checkbox'), 'physicalEducation'];
const performingArts = [document.querySelector('#performing-arts-checkbox'), 'performingArts'];
const music = [document.querySelector('#music-checkbox'), 'music'];
const dance = [document.querySelector('#dance-checkbox'), 'dance'];

const subjects = [italian, chinese, panjabi, polish, bengali, hebrew, spanish, urdu, french, german, chemistry, biology, physics, combinedScience, separateSciences, englishLiterature, englishLanguage, statistics, furtherMaths, maths, engineering, foodPreparation, designTechnology, business, computerScience, religiousStudies, citizenshipStudies, sociology, economics, history, psychology, geography, drama, mediaStudies, physicalEducation, performingArts, music, dance]
const timetable = document.querySelector('.timetable');

const MONTHS = {'January': 1, 'February': 2,'March': 3, 'April': 4, 'May': 5, 'June': 6, 'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12};

let counter = 0;

function padDate(number) {
    if (number.toString().length < 2) {
        return `0${number}`;
    } else {
        return number;
    }
}

function updateTable() {
    let chosenSubjects = [];
    let timetableData = [];
    let date = '';

    timetable.innerHTML = '';

    subjects.forEach(function (subject) {
        if (subject[0].checked && !chosenSubjects.includes(subject[1])) {
            chosenSubjects.push(subject[1]);
        }
    });

    EXAMS.forEach(function (exam) {
        if (chosenSubjects.includes(exam.Topic)) {
            timetableData.push(exam.Subject);
            
            if (timetableData.length == 1) {
                date = exam.Date.split(' ');
                day = padDate(date[1].match(/(\d+)/)[0]);
                month = padDate(MONTHS[date[2]]);
                year = date[3];

                let currentDate = new Date();
                let endDate = new Date(`${month}/${day}/${year}`);

                console.log(currentDate);
                console.log(endDate);

                let difference = Math.round((endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24), 0);

                let textNode = document.createElement('p');
                textNode.classList.add('days-until-exam');
                textNode.innerHTML = `<span class='orange'>${difference}</span> days until first exam.`;
                timetable.appendChild(textNode);
            }

            if (`${exam.Date} ${exam.Time}` != date) {
                date = `${exam.Date} ${exam.Time}`;
                let subHeader = document.createElement('h2');
                subHeader.innerHTML = `${exam.Date} ${exam.Time}`;
                timetable.appendChild(subHeader);
            }

            let textNode = document.createElement('p');
            textNode.innerHTML = exam.Subject;

            if (exam.Tier == 'H') {
                textNode.classList.add('orange');
            } else if (exam.Tier == 'F') {
                textNode.classList.add('blue');
            } else if (exam.Tier == 'F & H') {
                textNode.classList.add('purple');
            }
            timetable.appendChild(textNode);
        }
    });
}