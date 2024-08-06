"use strict";
class pageReload {
    constructor() { }
    reload(button = document.querySelector('button')) {
        if (!(button === null)) {
            button.addEventListener('click', (event) => {
                window.setTimeout(() => window.location.reload(), 10);
            });
            return;
        }
        else
            return;
    }
}
pageReload.instance = new pageReload().reload();
pageReload.instance;
