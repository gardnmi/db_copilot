console.log("Content script running");

function addCopilotButton() {

    // Create a button
    const button = document.createElement('button');

    // Set attributes
    button.setAttribute("data-testid", "new-button-id");
    button.setAttribute("type", "button");
    button.setAttribute("class", "du-bois-light-btn du-bois-light-btn-link du-bois-light-btn-icon-only webapp-css-1a2x38u");
    // button.setAttribute("loading", "false");

    // Create a span element
    const span = document.createElement('span');
    span.setAttribute('role', 'img');
    span.setAttribute('aria-hidden', 'true');
    span.setAttribute('class', 'anticon webapp-css-6xix1i');

    // Append the span to the button
    button.appendChild(span);

    // Create an img element
    const img = document.createElement('img');
    img.src = chrome.runtime.getURL("assets/githubcopilot.png");
    // make image smaller and more transparent
    img.style.width = "20px";
    img.style.opacity = "0.7";

    // Append the img to the button
    span.appendChild(img);

    // Append the button to each iconBar
    const iconBar = document.getElementsByClassName("webapp-css-16dv7lo");


    for (let i = 0; i < iconBar.length; i++) {

        if (iconBar[i].querySelector('[data-testid="new-button-id"]')) {
            continue;
        }

        const newButton = button.cloneNode(true); // Create a new button for each iconBar element
        iconBar[i].append(newButton);

        // Add event listener to the button
        newButton.addEventListener('click', () => {

            notebookTitle = document.querySelector('[data-testid="notebook-title-text"]').innerText
            console.log(notebookTitle);

            // sent the notebook title and getParentCode to chrome storage
            chrome.storage.sync.set({ key: getParentCode() }, function () {
                // console.log('Value is set to ' + getParentCode());
            });

            chrome.storage.sync.set({ notebookTitle: notebookTitle }, function () {
                // console.log('Value is set to ' + getParentCode());
            });

            // Send a message to the background script
            chrome.runtime.sendMessage({ openPopup: true });
        });
    }

}

function getParentCode() {
    let cellArray = Array.from(document.querySelectorAll('[data-testid="notebook-cell-container"]'));
    let result = []

    // Reduce Array to up to the active notebook cell
    for (let i = 0; i < cellArray.length; i++) {
        const divElement = cellArray[i];

        if (divElement.hasAttribute('data-selected')) {
            // Found an element with the "data-selected" attribute
            // Remove all elements following the current one from the array
            cellArray.splice(i + 1);
            break; // Stop the loop
        }
    }

    // Get the code from the active cell
    for (let i = 0; i < cellArray.length; i++) {
        const divElement = cellArray[i];

        if (divElement.querySelector('[data-mode-id]').getAttribute("data-mode-id") == "python") {

            // Get the cell title
            result.push("# COMMAND - " + divElement.innerText.split("\n")[0]);

            // Loop through the child elements of the active cell
            chilldElements = divElement.querySelector('[data-mprt="7"]').childNodes

            if (chilldElements) {
                for (let i = 0; i < chilldElements.length; i++) {
                    const chilldElement = chilldElements[i];
                    result.push(chilldElement.innerText);

                    if (i == chilldElements.length - 1) {
                        result.push('');
                    }
                }
            }

        }
    }

    // join result into a text
    result = result.join('\n');

    return result;
}


// run every 2 seconds
setInterval(addCopilotButton, 1000);

