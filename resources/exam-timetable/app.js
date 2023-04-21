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

const EXAMS = [
    {'Date': 'Monday 15th May 2023', 'Time': 'AM', 'UnitCode': '8062/ 11-17 ', 'Topic': 'religiousStudies', 'Subject': 'Religious Studies A Paper 1 ', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Monday 15th May 2023', 'Time': 'AM', 'UnitCode': '8063/1', 'Topic': 'religiousStudies', 'Subject': 'Religious Studies B Paper 1', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Monday 15th May 2023', 'Time': 'PM', 'UnitCode': '8100/1', 'Topic': 'citizenshipStudies', 'Subject': 'Citizenship Studies Paper 1', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Monday 15th May 2023', 'Time': 'PM', 'UnitCode': '8261/W', 'Topic': 'drama', 'Subject': 'Drama', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Monday 15th May 2023', 'Time': 'PM', 'UnitCode': '8633/LF', 'Topic': 'italian', 'Subject': 'Italian Paper 1', 'Tier': 'F', 'Duration': '35m'},
    {'Date': 'Monday 15th May 2023', 'Time': 'PM', 'UnitCode': '8633/LH', 'Topic': 'italian', 'Subject': 'Italian Paper 1', 'Tier': 'H', 'Duration': '45m'},
    {'Date': 'Monday 15th May 2023', 'Time': 'PM', 'UnitCode': '8633/RF', 'Topic': 'italian', 'Subject': 'Italian Paper 3', 'Tier': 'F', 'Duration': '45m'},
    {'Date': 'Monday 15th May 2023', 'Time': 'PM', 'UnitCode': '8633/RH', 'Topic': 'italian', 'Subject': 'Italian Paper 3', 'Tier': 'H', 'Duration': '1h'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'AM', 'UnitCode': '8461/1F and 1H', 'Topic': 'biology', 'Subject': 'Biology Paper 1 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 45m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'AM', 'UnitCode': '8465/1F and 1H ', 'Topic': 'combinedScience', 'Subject': 'Combined Science: Synergy Paper 1 (both tiers) ', 'Tier': 'F & H', 'Duration': '1h 45m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'AM', 'UnitCode': '8464/B/1F and 1H', 'Topic': 'separateSciences', 'Subject': 'Combined Science: Trilogy - Biology Paper 1 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 15m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'PM', 'UnitCode': '8668/LF', 'Topic': 'german', 'Subject': 'German Paper 1', 'Tier': 'F', 'Duration': '35m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'PM', 'UnitCode': '8668/LH', 'Topic': 'german', 'Subject': 'German Paper 1', 'Tier': 'H', 'Duration': '45m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'PM', 'UnitCode': '8668/RF', 'Topic': 'german', 'Subject': 'German Paper 3', 'Tier': 'F', 'Duration': '45m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'PM', 'UnitCode': '8668/RH', 'Topic': 'german', 'Subject': 'German Paper 3', 'Tier': 'H', 'Duration': '1h'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'PM', 'UnitCode': '8572/1', 'Topic': 'mediaStudies', 'Subject': 'Media Studies Paper 1', 'Tier': '', 'Duration': '1h 30m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'PM', 'UnitCode': '8192/1', 'Topic': 'sociology', 'Subject': 'Sociology Paper 1', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'PM', 'UnitCode': '8648/LF', 'Topic': 'urdu', 'Subject': 'Urdu Paper 1', 'Tier': 'F', 'Duration': '35m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'PM', 'UnitCode': '8648/LH', 'Topic': 'urdu', 'Subject': 'Urdu Paper 1', 'Tier': 'H', 'Duration': '45m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'PM', 'UnitCode': '8648/RF', 'Topic': 'urdu', 'Subject': 'Urdu Paper 3', 'Tier': 'F', 'Duration': '45m'},
    {'Date': 'Tuesday 16th May 2023', 'Time': 'PM', 'UnitCode': '8648/RH', 'Topic': 'urdu', 'Subject': 'Urdu Paper 3', 'Tier': 'H', 'Duration': '1h'},
    {'Date': 'Wednesday 17th May 2023', 'Time': 'AM', 'UnitCode': '8702/1', 'Topic': 'englishLiterature', 'Subject': 'English Literature Paper 1', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Wednesday 17th May 2023', 'Time': 'PM', 'UnitCode': '8136/1', 'Topic': 'economics', 'Subject': 'Economics Paper 1', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Wednesday 17th May 2023', 'Time': 'PM', 'UnitCode': '8582/1', 'Topic': 'physicalEducation', 'Subject': 'Physical Education Paper 1', 'Tier': '', 'Duration': '1h 15m'},
    {'Date': 'Thursday 18th May 2023', 'Time': 'AM', 'UnitCode': '8145/1A/A - 1B/E', 'Topic': 'history', 'Subject': 'History Paper 1', 'Tier': '', 'Duration': '2h'},
    {'Date': 'Thursday 18th May 2023', 'Time': 'PM', 'UnitCode': '8525/1A', 'Topic': 'computerScience', 'Subject': 'Computer Science', 'Tier': '', 'Duration': '2h'},
    {'Date': 'Thursday 18th May 2023', 'Time': 'PM', 'UnitCode': '8525/1B', 'Topic': 'computerScience', 'Subject': 'Computer Science', 'Tier': '', 'Duration': '2h'},
    {'Date': 'Thursday 18th May 2023', 'Time': 'PM', 'UnitCode': '8525/1C', 'Topic': 'computerScience', 'Subject': 'Computer Science', 'Tier': '', 'Duration': '2h'},
    {'Date': 'Thursday 18th May 2023', 'Time': 'PM', 'UnitCode': '8182/1', 'Topic': 'psychology', 'Subject': 'Psychology Paper 1', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Friday 19th May 2023', 'Time': 'AM', 'UnitCode': '8300/1F and 1H', 'Topic': 'maths', 'Subject': 'Mathematics Paper 1 (non-calculator) (both tiers)', 'Tier': 'F & H', 'Duration': '1h 30m'},
    {'Date': 'Friday 19th May 2023', 'Time': 'PM', 'UnitCode': '8132/1', 'Topic': 'business', 'Subject': 'Business Paper 1', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Friday 19th May 2023', 'Time': 'PM', 'UnitCode': '8673/LF', 'Topic': 'chinese', 'Subject': 'Chinese (Mandarin) Paper 1', 'Tier': 'F', 'Duration': '35m'},
    {'Date': 'Friday 19th May 2023', 'Time': 'PM', 'UnitCode': '8673/LH', 'Topic': 'chinese', 'Subject': 'Chinese (Mandarin) Paper 1', 'Tier': 'H', 'Duration': '45m'},
    {'Date': 'Friday 19th May 2023', 'Time': 'PM', 'UnitCode': '8673/RF', 'Topic': 'chinese', 'Subject': 'Chinese (Mandarin) Paper 3', 'Tier': 'F', 'Duration': '45m'},
    {'Date': 'Friday 19th May 2023', 'Time': 'PM', 'UnitCode': '8673/RH', 'Topic': 'chinese', 'Subject': 'Chinese (Mandarin) Paper 3', 'Tier': 'H', 'Duration': '1h'},
    {'Date': 'Friday 19th May 2023', 'Time': 'PM', 'UnitCode': 'PER3', 'Topic': 'performingArts', 'Subject': 'Performing arts Unit 3: The performing arts experience', 'Tier': '', 'Duration': '1h 30m'},
    {'Date': 'Monday 22nd May 2023', 'Time': 'AM', 'UnitCode': '8658/LF', 'Topic': 'french', 'Subject': 'French Paper 1', 'Tier': 'F', 'Duration': '35m'},
    {'Date': 'Monday 22nd May 2023', 'Time': 'AM', 'UnitCode': '8658/LH', 'Topic': 'french', 'Subject': 'French Paper 1', 'Tier': 'H', 'Duration': '45m'},
    {'Date': 'Monday 22nd May 2023', 'Time': 'AM', 'UnitCode': '8658/RF', 'Topic': 'french', 'Subject': 'French Paper 3', 'Tier': 'F', 'Duration': '45m'},
    {'Date': 'Monday 22nd May 2023', 'Time': 'AM', 'UnitCode': '8658/RH', 'Topic': 'french', 'Subject': 'French Paper 3', 'Tier': 'H', 'Duration': '1h'},
    {'Date': 'Monday 22nd May 2023', 'Time': 'PM', 'UnitCode': '8035/1', 'Topic': 'geography', 'Subject': 'Geography Paper 1', 'Tier': '', 'Duration': '1h 30m'},
    {'Date': 'Tuesday 23rd May 2023', 'Time': 'AM', 'UnitCode': '8462/1F and 1H', 'Topic': 'chemistry', 'Subject': 'Chemistry Paper 1 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 45m'},
    {'Date': 'Tuesday 23rd May 2023', 'Time': 'AM', 'UnitCode': '8464/C/1F and 1H', 'Topic': 'separateSciences', 'Subject': 'Combined Science: Trilogy - Chemistry Paper 1 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 15m'},
    {'Date': 'Tuesday 23rd May 2023', 'Time': 'PM', 'UnitCode': '8061/1-5', 'Topic': 'religiousStudies', 'Subject': 'Religious Studies (Short course)', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Tuesday 23rd May 2023', 'Time': 'PM', 'UnitCode': '8062/2A and 2B', 'Topic': 'religiousStudies', 'Subject': 'Religious Studies A Paper 2', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Tuesday 23rd May 2023', 'Time': 'PM', 'UnitCode': '8063/2A, 2B, 2X and 2Y', 'Topic': 'religiousStudies', 'Subject': 'Religious Studies B Paper 2', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Wednesday 24th May 2023', 'Time': 'AM', 'UnitCode': '8702/2', 'Topic': 'englishLiterature', 'Subject': 'English Literature Paper 2', 'Tier': '', 'Duration': '2h 15m'},
    {'Date': 'Wednesday 24th May 2023', 'Time': 'PM', 'UnitCode': '8100/2', 'Topic': 'citizenshipStudies', 'Subject': 'Citizenship Studies Paper 2', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Wednesday 24th May 2023', 'Time': 'PM', 'UnitCode': '8633/WF', 'Topic': 'italian', 'Subject': 'Italian Paper 4', 'Tier': 'F', 'Duration': '1h'},
    {'Date': 'Wednesday 24th May 2023', 'Time': 'PM', 'UnitCode': '8633/WH', 'Topic': 'italian', 'Subject': 'Italian Paper 4', 'Tier': 'H', 'Duration': '1h 15m'},
    {'Date': 'Wednesday 24th May 2023', 'Time': 'PM', 'UnitCode': '8572/2', 'Topic': 'mediaStudies', 'Subject': 'Media Studies Paper 2', 'Tier': '', 'Duration': '1h 30m'},
    {'Date': 'Thursday 25th May 2023', 'Time': 'AM', 'UnitCode': '8465/2F and 2H', 'Topic': 'combinedScience', 'Subject': 'Combined Science: Synergy Paper 2 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 45m'},
    {'Date': 'Thursday 25th May 2023', 'Time': 'AM', 'UnitCode': '8464/P/1F and 1H', 'Topic': 'separateSciences', 'Subject': 'Combined Science: Trilogy - Physics Paper 1 (both tiers) ', 'Tier': 'F & H', 'Duration': '1h 15m'},
    {'Date': 'Thursday 25th May 2023', 'Time': 'AM', 'UnitCode': '8463/1F and 1H', 'Topic': 'physics', 'Subject': 'Physics Paper 1 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 45m'},
    {'Date': 'Thursday 25th May 2023', 'Time': 'PM', 'UnitCode': '8525/2', 'Topic': 'computerScience', 'Subject': 'Computer Science', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Thursday 25th May 2023', 'Time': 'PM', 'UnitCode': '8192/2', 'Topic': 'sociology', 'Subject': 'Sociology Paper 2', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Thursday 25th May 2023', 'Time': 'PM', 'UnitCode': '8648/WF', 'Topic': 'urdu', 'Subject': 'Urdu Paper 4', 'Tier': 'F', 'Duration': '1h'},
    {'Date': 'Thursday 25th May 2023', 'Time': 'PM', 'UnitCode': '8648/WH', 'Topic': 'urdu', 'Subject': 'Urdu Paper 4', 'Tier': 'H', 'Duration': '1h 15m'},
    {'Date': 'Friday 26th May 2023', 'Time': 'AM', 'UnitCode': '8136/2', 'Topic': 'economics', 'Subject': 'Economics Paper 2', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Friday 26th May 2023', 'Time': 'AM', 'UnitCode': '8668/WF', 'Topic': 'german', 'Subject': 'German Paper 4', 'Tier': 'F', 'Duration': '1h'},
    {'Date': 'Friday 26th May 2023', 'Time': 'AM', 'UnitCode': '8668/WH', 'Topic': 'german', 'Subject': 'German Paper 4', 'Tier': 'H', 'Duration': '1h 15m'},
    {'Date': 'Friday 26th May 2023', 'Time': 'AM', 'UnitCode': '8582/2', 'Topic': 'physicalEducation', 'Subject': 'Physical Education Paper 2', 'Tier': '', 'Duration': '1h 15m'},
    {'Date': 'Friday 26th May 2023', 'Time': 'PM', 'UnitCode': '8673/WF', 'Topic': 'chinese', 'Subject': 'Chinese (Mandarin) Paper 4', 'Tier': 'F', 'Duration': '1h'},
    {'Date': 'Friday 26th May 2023', 'Time': 'PM', 'UnitCode': '8673/WH', 'Topic': 'chinese', 'Subject': 'Chinese (Mandarin) Paper 4', 'Tier': 'H', 'Duration': '1h 15m'},
    {'Date': 'Friday 26th May 2023', 'Time': 'PM', 'UnitCode': '8182/2', 'Topic': 'psychology', 'Subject': 'Psychology Paper 2', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Monday 5th June 2023', 'Time': 'AM', 'UnitCode': '8700/1', 'Topic': 'englishLanguage', 'Subject': 'English Language Paper 1', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Monday 5th June 2023', 'Time': 'PM', 'UnitCode': '8638/LF', 'Topic': 'bengali', 'Subject': 'Bengali Paper 1', 'Tier': 'F', 'Duration': '35m'},
    {'Date': 'Monday 5th June 2023', 'Time': 'PM', 'UnitCode': '8638/LH', 'Topic': 'bengali', 'Subject': 'Bengali Paper 1', 'Tier': 'H', 'Duration': '45m'},
    {'Date': 'Monday 5th June 2023', 'Time': 'PM', 'UnitCode': '8638/RF', 'Topic': 'bengali', 'Subject': 'Bengali Paper 3', 'Tier': 'F', 'Duration': '45m'},
    {'Date': 'Monday 5th June 2023', 'Time': 'PM', 'UnitCode': '8638/RH', 'Topic': 'bengali', 'Subject': 'Bengali Paper 3', 'Tier': 'H', 'Duration': '1h'},
    {'Date': 'Monday 5th June 2023', 'Time': 'PM', 'UnitCode': '8658/WF', 'Topic': 'french', 'Subject': 'French Paper 4', 'Tier': 'F', 'Duration': '1h'},
    {'Date': 'Monday 5th June 2023', 'Time': 'PM', 'UnitCode': '8658/WH', 'Topic': 'french', 'Subject': 'French Paper 4', 'Tier': 'H', 'Duration': '1h 15m'},
    {'Date': 'Tuesday 6th June 2023', 'Time': 'AM', 'UnitCode': '8300/2F and 2H', 'Topic': 'maths', 'Subject': 'Mathematics Paper 2 (calculator) (both tiers)', 'Tier': 'F & H', 'Duration': '1h 30m'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'AM', 'UnitCode': '8678/LF', 'Topic': 'hebrew', 'Subject': 'Modern Hebrew Paper 1', 'Tier': 'F', 'Duration': '35m'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'AM', 'UnitCode': '8678/LH', 'Topic': 'hebrew', 'Subject': 'Modern Hebrew Paper 1', 'Tier': 'H', 'Duration': '45m'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'AM', 'UnitCode': '8678/RF', 'Topic': 'hebrew', 'Subject': 'Modern Hebrew Paper 3', 'Tier': 'F', 'Duration': '45m'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'AM', 'UnitCode': '8678/RH', 'Topic': 'hebrew', 'Subject': 'Modern Hebrew Paper 3', 'Tier': 'H', 'Duration': '1h'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'AM', 'UnitCode': '8698/LF', 'Topic': 'spanish', 'Subject': 'Spanish Paper 1', 'Tier': 'F', 'Duration': '35m'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'AM', 'UnitCode': '8698/LH', 'Topic': 'spanish', 'Subject': 'Spanish Paper 1', 'Tier': 'H', 'Duration': '45m'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'AM', 'UnitCode': '8698/RF', 'Topic': 'spanish', 'Subject': 'Spanish Paper 3', 'Tier': 'F', 'Duration': '45m'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'AM', 'UnitCode': '8698/RH', 'Topic': 'spanish', 'Subject': 'Spanish Paper 3', 'Tier': 'H', 'Duration': '1h'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'AM', 'UnitCode': '8382/1F', 'Topic': 'statistics', 'Subject': 'Statistics Paper 1', 'Tier': 'F', 'Duration': '1h 45m'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'AM', 'UnitCode': '8382/1H', 'Topic': 'statistics', 'Subject': 'Statistics Paper 1', 'Tier': 'H', 'Duration': '1h 45m'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'PM', 'UnitCode': '8365/1', 'Topic': 'furtherMaths', 'Subject': 'Level 2 Certificate in Further mathematics Paper 1 ', 'Tier': 'Cert', 'Duration': '1h 45m'},
    {'Date': 'Wednesday 7th June 2023', 'Time': 'PM', 'UnitCode': '8145/2A/A - 2B/D', 'Topic': 'history', 'Subject': 'History Paper 2', 'Tier': '', 'Duration': '2h'},
    {'Date': 'Friday 9th June 2023', 'Time': 'AM', 'UnitCode': '8035/2', 'Topic': 'geography', 'Subject': 'Geography Paper 2', 'Tier': '', 'Duration': '1h 30m'},
    {'Date': 'Friday 9th June 2023', 'Time': 'PM', 'UnitCode': '8461/2F and 2H', 'Topic': 'biology', 'Subject': 'Biology Paper 2 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 45m'},
    {'Date': 'Friday 9th June 2023', 'Time': 'PM', 'UnitCode': '8465/3F and 3H', 'Topic': 'combinedScience', 'Subject': 'Combined Science: Synergy Paper 3 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 45m'},
    {'Date': 'Friday 9th June 2023', 'Time': 'PM', 'UnitCode': '8464/B/2F and 2H', 'Topic': 'separateSciences', 'Subject': 'Combined Science: Trilogy - Biology Paper 2 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 15m'},
    {'Date': 'Monday 12th June 2023', 'Time': 'AM', 'UnitCode': '8700/2', 'Topic': 'englishLanguage', 'Subject': 'English Language Paper 2', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Monday 12th June 2023', 'Time': 'PM', 'UnitCode': '8132/2', 'Topic': 'business', 'Subject': 'Business Paper 2', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Tuesday 13th June 2023', 'Time': 'AM', 'UnitCode': '8462/2F and 2H', 'Topic': 'chemistry', 'Subject': 'Chemistry Paper 2 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 45m'},
    {'Date': 'Tuesday 13th June 2023', 'Time': 'AM', 'UnitCode': '8465/4F and 4H', 'Topic': 'combinedScience', 'Subject': 'Combined Science: Synergy Paper 4 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 45m'},
    {'Date': 'Tuesday 13th June 2023', 'Time': 'AM', 'UnitCode': '8464/C/2F and 2H', 'Topic': 'separateSciences', 'Subject': 'Combined Science: Trilogy - Chemistry Paper 2 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 15m'},
    {'Date': 'Tuesday 13th June 2023', 'Time': 'PM', 'UnitCode': '8638/WF', 'Topic': 'bengali', 'Subject': 'Bengali Paper 4', 'Tier': 'F', 'Duration': '1h'},
    {'Date': 'Tuesday 13th June 2023', 'Time': 'PM', 'UnitCode': '8638/WH', 'Topic': 'bengali', 'Subject': 'Bengali Paper 4', 'Tier': 'H', 'Duration': '1h 15m'},
    {'Date': 'Tuesday 13th June 2023', 'Time': 'PM', 'UnitCode': '8698/WF', 'Topic': 'spanish', 'Subject': 'Spanish Paper 4', 'Tier': 'F', 'Duration': '1h'},
    {'Date': 'Tuesday 13th June 2023', 'Time': 'PM', 'UnitCode': '8698/WH', 'Topic': 'spanish', 'Subject': 'Spanish Paper 4', 'Tier': 'H', 'Duration': '1h 15m'},
    {'Date': 'Wednesday 14th June 2023', 'Time': 'AM', 'UnitCode': '8300/3F and 3H', 'Topic': 'maths', 'Subject': 'Mathematics Paper 3 (calculator) (both tiers)', 'Tier': 'F & H', 'Duration': '1h 30m'},
    {'Date': 'Wednesday 14th June 2023', 'Time': 'PM', 'UnitCode': '8271/W', 'Topic': 'music', 'Subject': 'Music', 'Tier': '', 'Duration': '1h 30m'},
    {'Date': 'Wednesday 14th June 2023', 'Time': 'PM', 'UnitCode': '8683/LF', 'Topic': 'panjabi', 'Subject': 'Panjabi Paper 1', 'Tier': 'F', 'Duration': '35m'},
    {'Date': 'Wednesday 14th June 2023', 'Time': 'PM', 'UnitCode': '8683/LH', 'Topic': 'panjabi', 'Subject': 'Panjabi Paper 1', 'Tier': 'H', 'Duration': '45m'},
    {'Date': 'Wednesday 14th June 2023', 'Time': 'PM', 'UnitCode': '8683/RF', 'Topic': 'panjabi', 'Subject': 'Panjabi Paper 3', 'Tier': 'F', 'Duration': '45m'},
    {'Date': 'Wednesday 14th June 2023', 'Time': 'PM', 'UnitCode': '8683/RH', 'Topic': 'panjabi', 'Subject': 'Panjabi Paper 3', 'Tier': 'H', 'Duration': '1h'},
    {'Date': 'Wednesday 14th June 2023', 'Time': 'PM', 'UnitCode': '8688/LF', 'Topic': 'polish', 'Subject': 'Polish Paper 1', 'Tier': 'F', 'Duration': '35m'},
    {'Date': 'Wednesday 14th June 2023', 'Time': 'PM', 'UnitCode': '8688/LH', 'Topic': 'polish', 'Subject': 'Polish Paper 1', 'Tier': 'H', 'Duration': '45m'},
    {'Date': 'Wednesday 14th June 2023', 'Time': 'PM', 'UnitCode': '8688/RF', 'Topic': 'polish', 'Subject': 'Polish Paper 3', 'Tier': 'F', 'Duration': '45m'},
    {'Date': 'Wednesday 14th June 2023', 'Time': 'PM', 'UnitCode': '8688/RH', 'Topic': 'polish', 'Subject': 'Polish Paper 3', 'Tier': 'H', 'Duration': '1h'},
    {'Date': 'Thursday 15th June 2023', 'Time': 'PM', 'UnitCode': '8236/W', 'Topic': 'dance', 'Subject': 'Dance', 'Tier': '', 'Duration': '1h 30m'},
    {'Date': 'Thursday 15th June 2023', 'Time': 'PM', 'UnitCode': '8852/W', 'Topic': 'engineering', 'Subject': 'Engineering', 'Tier': '', 'Duration': '2h'},
    {'Date': 'Thursday 15th June 2023', 'Time': 'PM', 'UnitCode': '8585/W', 'Topic': 'foodPreparation', 'Subject': 'Food preparation and nutrition', 'Tier': '', 'Duration': '1h 45m'},
    {'Date': 'Friday 16th June 2023', 'Time': 'AM', 'UnitCode': '8464/P/2F and 2H', 'Topic': 'separateSciences', 'Subject': 'Combined Science: Trilogy - Physics Paper 2 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 15m'},
    {'Date': 'Friday 16th June 2023', 'Time': 'AM', 'UnitCode': '8463/2F and 2H', 'Topic': 'physics', 'Subject': 'Physics Paper 2 (both tiers)', 'Tier': 'F & H', 'Duration': '1h 45m'},
    {'Date': 'Friday 16th June 2023', 'Time': 'PM', 'UnitCode': '8035/3', 'Topic': 'geography', 'Subject': 'Geography Paper 3', 'Tier': '', 'Duration': '1h 15m'},
    {'Date': 'Monday 19th June 2023', 'Time': 'AM', 'UnitCode': '8552/W', 'Topic': 'designTechnology', 'Subject': 'Design & Technology', 'Tier': '', 'Duration': '2h'},
    {'Date': 'Monday 19th June 2023', 'Time': 'PM', 'UnitCode': '8678/WF', 'Topic': 'hebrew', 'Subject': 'Modern Hebrew Paper 4', 'Tier': 'F', 'Duration': '1h'},
    {'Date': 'Monday 19th June 2023', 'Time': 'PM', 'UnitCode': '8678/WH', 'Topic': 'hebrew', 'Subject': 'Modern Hebrew Paper 4', 'Tier': 'H', 'Duration': '1h 15m'},
    {'Date': 'Monday 19th June 2023', 'Time': 'PM', 'UnitCode': '8382/2F', 'Topic': 'statistics', 'Subject': 'Statistics Paper 2', 'Tier': 'F', 'Duration': '1h 45m'},
    {'Date': 'Monday 19th June 2023', 'Time': 'PM', 'UnitCode': '8382/2H', 'Topic': 'statistics', 'Subject': 'Statistics Paper 2', 'Tier': 'H', 'Duration': '1h 45m'},
    {'Date': 'Wednesday 21st June 2023', 'Time': 'AM', 'UnitCode': '8683/WF', 'Topic': 'panjabi', 'Subject': 'Panjabi Paper 4', 'Tier': 'F', 'Duration': '1h'},
    {'Date': 'Wednesday 21st June 2023', 'Time': 'AM', 'UnitCode': '8683/WH', 'Topic': 'panjabi', 'Subject': 'Panjabi Paper 4', 'Tier': 'H', 'Duration': '1h 15m'},
    {'Date': 'Wednesday 21st June 2023', 'Time': 'AM', 'UnitCode': '8688/WF', 'Topic': 'polish', 'Subject': 'Polish Paper 4', 'Tier': 'F', 'Duration': '1h'},
    {'Date': 'Wednesday 21st June 2023', 'Time': 'AM', 'UnitCode': '8688/WH', 'Topic': 'polish', 'Subject': 'Polish Paper 4', 'Tier': 'H', 'Duration': '1h 15m'},
    {'Date': 'Wednesday 21st June 2023', 'Time': 'PM', 'UnitCode': '8365/2', 'Topic': 'furtherMaths', 'Subject': 'Level 2 Certificate in Further mathematics Paper 2', 'Tier': 'Cert', 'Duration': '1h 45m'}
]

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