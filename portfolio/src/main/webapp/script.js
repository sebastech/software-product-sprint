function displayMessage() {

  // The fetch() function returns a Promise because the request is asynchronous.
  const responsePromise = fetch('/data');

  // When the request is complete, pass the response into handleResponse().
  responsePromise.then(handleResponse);
}

/**
 * Handles response by converting it to text and passing the result to
 * addQuoteToDom().
 */
function handleResponse(response) {
  console.log('Handling the response.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  const textPromise = response.text();

  // When the response is converted to text, pass the result into the
  // addQuoteToDom() function.
  textPromise.then(addMsgToDOM);
}

/** Adds a random quote to the DOM. */
function addMsgToDOM(msg) {
  console.log('Adding quote to dom: ' + msg);

  const msgContainer = document.getElementById('msg');
  msgContainer.innerText = msg;
}

//JSON STUFF

function getServerStats() {
  fetch('/data').then(response => response.json()).then((obj) => {
    // stats is an object, not a string, so we have to
    // reference its fields to create HTML content

    const statsListElement = document.getElementById('server-stats-container');
    statsListElement.innerHTML = '';
    statsListElement.appendChild(
        createListElement('Start time: ' + obj.startTime));
    statsListElement.appendChild(
        createListElement('Current time: ' + obj.currentTime));
    statsListElement.appendChild(
        createListElement('Max memory: ' + obj.maxMemory));
    statsListElement.appendChild(
        createListElement('Used memory: ' + obj.usedMemory));
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}