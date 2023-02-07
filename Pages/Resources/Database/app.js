console.clear();
credits();

function round(number, decimalPlaces) {
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
}


// FIBONACCI
const postButton = document.querySelector('#post-button');
const putButton = document.querySelector('#put-button');
const getButton = document.querySelector('#get-button');
const requestOutput = document.querySelector('#request-output');

const databaseURL = "https://sparx-c871.restdb.io/rest/test/63e29113aa8607500003c013";

const e = CryptoJS.AES.decrypt("U2FsdGVkX19g7zJEImiT3im4tYcmEOzpPfzDrMNzyBL1akgWxEKTEsEOHqBPqluG", "s2*%z3B2$4Ka").toString(CryptoJS.enc.Utf8);

async function getDatabase() {
    const settings = {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": e,
          "cache-control": "no-cache"
        }
    }

    response = await fetch(databaseURL, settings);
    console.log(await response.json())
}

async function postDatabase() {
    const jsonData = {
        "sparxdata": {
            "test": 1
        }
    }

    const settings = {
        "async": true,
        "crossDomain": true,
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "x-apikey": e,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": jsonData
    }

    response = await fetch(databaseURL, settings);
    console.log(await response.json())
}

async function putDatabase() {
    const jsonData = {"mystuff": "updated","field2": "xxx"};

    const settings = {
        "crossDomain": true,
        "method": "PUT",
        "headers": {
          "Content-Type": "application/json",
          "x-apikey": e,
          "cache-control": "no-cache"
        },
        "body": JSON.stringify(jsonData)
    }

    response = await fetch(databaseURL, settings);
    console.log(await response.json())
}

postButton.addEventListener('click', () => {
    postDatabase();
})

putButton.addEventListener('click', () => {
    putDatabase();
})

getButton.addEventListener('click', () => {
    getDatabase();
})