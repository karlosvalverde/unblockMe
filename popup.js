document.getElementById('removeClass').addEventListener('click', () => {
    browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
        browser.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: removeClasses
        });
    });

    function removeClasses() {
        const classesToRemove = ['first-class', 'second-class'];

        classesToRemove.forEach(className => {
            let elements = document.querySelectorAll('.' + className);
            elements.forEach(element => {
                element.classList.remove(className);
            });
        });
    }
});
