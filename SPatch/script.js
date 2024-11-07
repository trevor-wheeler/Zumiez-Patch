function main() {

    try {
        var button = document.getElementById("TODO").parentElement;
    }
    catch (error) {
        button = undefined;
    }

    if (button) {
        button.style.display = "none";
    }
}

main();

var observer = new MutationObserver(main);
var observerConfig = {childList: true, subtree: true};
observer.observe(document.documentElement, observerConfig);