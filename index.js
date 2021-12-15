let fetch = require('node-fetch');

async function checkResponseStatus(response) {
    if(response.ok) {
        return response
    } else  {
        throw new Error(`The HTTP status of the response is ${response.status} (${response.statusText})`);
    }
}

async function getText(url) {
    try {
        let response = await fetch(url);
        let body = await checkResponseStatus(response);
        return await body.text();
    } catch (err) {
        console.error(err.message);
    }
 }

 async function getJSON(url) {
    try {
        let response = await fetch(url);
        let body = await checkResponseStatus(response);
        return await body.json();
    } catch (err) {
        console.error(err.message);
    }
}

async function postText(url) {
    let todo = {
        userId: 123,
        title: "loren imps-um colors",
        completed: false
    };

    try {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {'Content-Type': 'application/json'}
        })
        let body = await checkResponseStatus(response);
        return await body.json();
    } catch (err) {
        console.error(err.message);
    }
}

getText('https://google.com')
    .then(body => console.log(body))
    .catch(error => console.log(`An error occurred: ${error.message}`));

postText('https://jsonplaceholder.typicode.com/todos')
    .then(body => console.log(body))
    .catch(error => console.log(`An error occurred: ${error.message}`));

getJSON('https://jsonplaceholder.typicode.com/users')
    .then(body => {
        console.log("First user in the array:");
        console.log(body[0]);
        console.log(`Name of the first user in the array: ${body[0].name}`);
    })
    .catch(error => console.log(`An error occurred: ${error.message}`));


