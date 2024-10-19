browser.action.onClicked.addListener((tab) => {
    browser.scripting.executeScript({
        target: {tabId: tab.id},
        func: observeAndRemoveClassesAndIDs
    });
});

function observeAndRemoveClasses() {
    const classesToRemove = ['first-class', 'second-class', 'third-class'];
    const idsToRemove = ['first-id', 'second-id']; // List of IDs to remove

    // Function to remove the classes from all matching elements
    function removeClasses() {
        classesToRemove.forEach(className => {
            const elements = document.querySelectorAll('.' + className);
            elements.forEach(element => {
                element.classList.remove(className);
            });
        });
    }

    // Function to remove nodes containing the specified IDs
    function removeIDs() {
        idsToRemove.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.remove(); // Completely remove the element from the DOM
            }
        });
    }

    // Initial removal of classes and nodes with IDs
    removeClasses();
    removeIDs();

    // Set up a MutationObserver to monitor the DOM for changes
    const observer = new MutationObserver(() => {
        removeClasses(); // Remove classes whenever the DOM is updated
        removeIDs();     // Remove nodes with IDs whenever the DOM is updated
    });

    // Start observing the document for any changes in the subtree
    observer.observe(document.body, {
        childList: true, // Monitor for added or removed nodes
        subtree: true,   // Monitor the entire subtree (all children)
        attributes: true // Monitor attribute changes (for class attribute updates)
    });
}
