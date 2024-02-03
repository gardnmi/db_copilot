// Register an inline completions provider for the Python language in Monaco editor
monaco.languages.registerInlineCompletionsProvider("python", {
    // This function provides inline completions based on the current model, position, and context
    provideInlineCompletions: async function (model, position, context, token) {

        let endpoint = document.getElementById('endpoint').value;

        // set the endpoint from chrome storage
        chrome.storage.sync.set({ endpoint: endpoint }, function () {
            // console.log('Value is set to ' + endpoint);
        });

        // If the endpoint is not defined, exit the function
        if (endpoint == undefined || endpoint == "") {
            console.log("No endpoint found Exiting: " + endpoint)
            return
        };

        // Get the editor content up to the current position
        const editorContent = model.getValueInRange({ startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column });

        // Make an API call with the editor content and await the response
        const apiResponse = await makeApiCall(editorContent, endpoint);

        // console.log(apiResponse);
        // Define a completion item with the API response as the insert text
        const completionItem = {
            sortText: "a",
            insertText: apiResponse, // Use the entire text as the insert text
            range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
        };

        // Return a promise that resolves with the completion item
        return Promise.resolve({ items: [completionItem] });
    },

    // This function is called when the inline completions are no longer needed
    freeInlineCompletions(args) { },
});

// This function makes an API call with the provided code
async function makeApiCall(code, endpoint) {

    // Define the payload for the API call
    const payload = {
        prompt: `${code}`,
        language: "python",
    };

    // Make a POST request to the API with the payload
    const response = await fetch(endpoint, {
        method: "POST",
        // mode: 'no-cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    // Get the response text and remove newline characters
    let data = await response.text();
    data = data.replace(/[\n]/g, "");
    return data
}

// Create a Monaco editor instance with Python as the language
let editor = monaco.editor.create(document.getElementById('container'), {
    language: "python",
});


// Read from chrome stroage and add to editor
chrome.storage.sync.get(['key'], function (result) {
    // console.log('Value currently is ' + result.key);
    editor.setValue(result.key.replace(/\u00A0/g, " "));
});


// Read the notebook title from chrome storage and add to popup
chrome.storage.sync.get(['notebookTitle'], function (result) {
    // console.log('Value currently is ' + result.notebookTitle);
    document.getElementById('notebook_title').innerText = result.notebookTitle;
});

// Set the endpoint from chrome storage
chrome.storage.sync.get(['endpoint'], function (result) {
    // console.log('Value currently is ' + result.endpoint);
    document.getElementById('endpoint').value = result.endpoint;
});

