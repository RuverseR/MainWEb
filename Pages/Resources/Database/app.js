console.clear();
credits();

function round(number, decimalPlaces) {
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
}


// RestDB
const restPostButton = document.querySelector('#rest-post-button');
const restPutButton = document.querySelector('#rest-put-button');
const restGetButton = document.querySelector('#rest-get-button');
const restRequestOutput = document.querySelector('#rest-request-output');

const restDatabaseURL = "https://sparx-c871.restdb.io/rest/test/63e29113aa8607500003c013";

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

    response = await fetch(restDatabaseURL, settings);
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

    response = await fetch(restDatabaseURL, settings);
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

    response = await fetch(restDatabaseURL, settings);
    console.log(await response.json())
}

restPostButton.addEventListener('click', () => {
    postDatabase();
})

restPutButton.addEventListener('click', () => {
    putDatabase();
})

restGetButton.addEventListener('click', () => {
    getDatabase();
})


// MongoDB
const mongoPostButton = document.querySelector('#mongo-post-button');
const mongoGetUsersButton = document.querySelector('#mongo-get-users-button');
const mongoGetAnswersButton = document.querySelector('#mongo-get-answers-button');
const mongoFindButton = document.querySelector('#mongo-find-button');
const mongoRequestOutput = document.querySelector('#mongo-request-output');

const appName = 'data-pddjp';
const mongoDatabaseURL = `https://data.mongodb-api.com/app/${appName}/endpoint/data/v1/action/`;
const apiKey = CryptoJS.AES.decrypt("U2FsdGVkX1+dnt/VAVVIedObPfxFarPHuJ6ttji06Qu75SdEpY5hmD+q5TO2xBomem3iDCTVP3eqsj43QrruTKxEZVT5e8/u5LQtbw/ws5gako9dglBL0EIxZEd58T3e", "s2*%z3B2$4Ka").toString(CryptoJS.enc.Utf8);
let authorisedToken = null;
let userDocumentId = null;
const userName = 'Test1';

async function checkUser() {
    let response = await contactDatabase('find', 'users', 'user-data'); 

    // Initialise the 'users' collection if it doesn't exist
    if (response.documents.length == 0) {
        await contactDatabase('insertOne', 'users', 'user-data', {users: {}});
        response = await contactDatabase('find', 'users', 'user-data'); 
    }

    const documentId = response.documents[0]._id;
    const users = response.documents[0].users;
    userDocumentId = response.documents[0].users[userName];

    // Check if the ID points to an existing document in the 'answers' database
    response = await contactDatabase('findOne', 'answers', 'user-data', { "_id": { "$oid": users[userName] }}); 

    if (!userName in users) {
        console.log(`${userName} is not in the database`);
        
        // Create a new document for the user's answers in the 'answers' database
        newDocumentId = await (await contactDatabase('insertOne', 'answers', 'user-data', {})).insertedId;
        console.log(newDocumentId);

        users[userName] = newDocumentId;
        
        contactDatabase('updateOne', 'users', 'user-data', [{"users": users}, documentId]);

        return
    } else if (await( await contactDatabase('findOne', 'answers', 'user-data', { "_id": { "$oid": userDocumentId }})).document === null) {
        console.log(`${userName}'s document is not in the 'answers' database`);

        // Create a new document for the user's answers in the 'answers' database
        newDocumentId = await (await contactDatabase('insertOne', 'answers', 'user-data', {})).insertedId;
        console.log(newDocumentId);

        users[userName] = newDocumentId;
        
        contactDatabase('updateOne', 'users', 'user-data', [{"users": users}, documentId]);
    } else {
        console.log(`${userName} is already in the database`);
        console.log(`${userName}'s document ID: ${users[userName]}`)
    }
}

checkUser();


async function authorise() {
    if (authorisedToken === null) {
      let jsondata = {
        'key': apiKey
      }

      let settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://realm.mongodb.com/api/client/v2.0/app/${appName}/auth/providers/api-key/login`,
        "method": "POST",
        "headers": {
          'Content-Type': 'application/json'
        },
        'processData': false,
        'data': JSON.stringify(jsondata)
      }

      let response = await $.ajax(settings);
      authorisedToken = response.access_token;
    }
    return authorisedToken;
}

async function contactDatabase(action, database, collection, content=false) {
    let token = await authorise();

    const jsonData = {
        'database': database,
        'collection': collection,
        'dataSource': 'Sparx',
    }

    if (content !== false && action == 'updateOne') {
        jsonData.filter = { "_id": { "$oid": content[1] } };
        jsonData.update = content[0];
    } else if (content !== false && action == 'findOne') {
        jsonData.filter = content;
    } else if (content !== false) {
        jsonData.document = content;
    }

    const settings = {
        "async": true,
        "crossDomain": true,
        "method": "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        'processData': false,
        body: JSON.stringify(jsonData)
    }

    response = await (await fetch(mongoDatabaseURL + action, settings)).json();
    
    return response
}

function twoDigits(val) {
    if (val < 10) {
      return '0' + val;
    }
    return val;
}

mongoPostButton.addEventListener('click', () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+twoDigits((today.getMonth()+1))+'-'+twoDigits(today.getDate());
    let time = twoDigits(today.getHours()) + ":" + twoDigits(today.getMinutes()) + ":" + twoDigits(today.getSeconds());
    let dateTime = date+' '+time;

    const document = {
        "Jane Doe": "1234567890",
        "time": dateTime
    }
    
    contactDatabase('insertOne', 'users', 'user-data', document);
})

mongoGetUsersButton.addEventListener('click', async () => {
    console.log(await (await contactDatabase('find', 'users', 'user-data')).documents[0]);
})

mongoGetAnswersButton.addEventListener('click', async () => {
    console.log(await contactDatabase('find', 'answers', 'user-data'));
})

mongoFindButton.addEventListener('click', async () => {
    console.log(await contactDatabase('findOne', 'answers', 'user-data', { "_id": { "$oid": "63e9594bac08792f635e50e7"}})); 
})