function $(qry){return document.querySelector(qry)};

const counters = {
    "primary": $("div#counter-1"),
    "secondary": $("div#counter-2")
}

var bindedKeys = {
    "primary": ["ArrowLeft"],
    "secondary": ["ArrowRight"]
}

var count1 = 0, count2 = 0

function addCounter(button) {
    if(button == 0) {
        count1++;
        counters.primary.innerText = count1;
    } else {
        count2++;
        counters.secondary.innerText = count2;
    }
}

function styles(counter, changing = true) {
    let currentCounter = counter == 0 ? counters.primary : counters.secondary;
    if(changing) {
        currentCounter.className = "changing";
    } else {
        currentCounter.className = null;
    }
}

function keyWrap({key, type, target}) {
    if($("#settings").contains(target)) return;
    for(let i = 0; i < bindedKeys.primary.length; i++) {
        if(key == bindedKeys.primary[i]) {
            if(type == "keydown") {
                addCounter(0);
                styles(0, true)
            } else {
                styles(0, false)
            }
        }
    }
    for(let i = 0; i < bindedKeys.secondary.length; i++) {
        if(key == bindedKeys.secondary[i]) {
            if(type == "keydown") {
                addCounter(1);
                styles(1, true)
            } else {
                styles(1, false)
            }
        }
    }
}

var settingsOpen = false;
function openSettings({target}) {
    let settingsPanel = $("#settings");
    let settingsButton = $("#settings-button");
    settingsButton.classList.add("clicked");
    settingsButton.classList.remove("closing");
    if(settingsOpen) {
        settingsButton.classList.remove("clicked");
        settingsOpen = false;
        settingsPanel.classList.add("hidden");
        return;
    }
    settingsOpen = true;

    let leftPosition = settingsButton.getBoundingClientRect().right;
    let topPosition = settingsButton.getBoundingClientRect().bottom + 20;

    settingsPanel.style = `top: ${topPosition}px; left: ${leftPosition}px;`;
    settingsPanel.classList.remove("hidden");
}
function closeSettings({target}) {
    let settingsPanel = $("#settings");
    let settingsButton = $("#settings-button");
    if(settingsOpen && (!settingsButton.contains(target) && !settingsPanel.contains(target))) {
        settingsButton.classList.remove("clicked");
        settingsButton.classList.add("closing");
        settingsOpen = false;
        settingsPanel.classList.add("hidden");
        return;
    }
}

$("#settings-button").addEventListener("click", openSettings);
document.addEventListener("click", closeSettings);

var styleSettings = {
    "themeColor": "#008cff",
    "headingColor": "#fff",
    "backgroundColor": "#fff",
    "textColor": "#000",
    "primaryLabel": "Primary:",
    "secondaryLabel": "Secondary:"
}
styleSettings.setStyle = function() {
    document.body.style = 
`--theme-color: ${styleSettings.themeColor}; 
--heading-color: ${styleSettings.headingColor};
--background-color: ${styleSettings.backgroundColor};
--text-color: ${styleSettings.textColor};`;
}

styleSettings.setLabels = function() {
    $("#counter-1-label").innerText = styleSettings.primaryLabel;
    $("#counter-2-label").innerText = styleSettings.secondaryLabel;
}

function reset(type) {
    if(type == "counter") {
        count1 = 0;
        count2 = 0;

        counters.primary.innerText = count1;
        counters.secondary.innerText = count1;
    } else if(type == "settings") {
        styleSettings.themeColor = "#008cff";
        styleSettings.headingColor = "#ffffff";
        styleSettings.backgroundColor = "#ffffff";
        styleSettings.textColor = "#000000";
        styleSettings.primaryLabel = "Primary:";
        styleSettings.secondaryLabel = "Secondary:";

        $("#theme-color").value = "#008cff";
        $("#heading-color").value = "#ffffff";
        $("#background-color").value = "#ffffff";
        $("#text-color").value = "#000000";
        $("#primary-label").value = "Primary:";
        $("#secondary-label").value = "Secondary:";

        styleSettings.setStyle();
        styleSettings.setLabels();
    }
}

function handleSettings(e) {
    switch(e.target.id) {
        case "theme-color":
            styleSettings.themeColor = e.target.value;
            styleSettings.setStyle();
            break;
        case "heading-color":
            styleSettings.headingColor = e.target.value;
            styleSettings.setStyle();
            break;
        case "background-color":
            styleSettings.backgroundColor = e.target.value;
            styleSettings.setStyle();
            break;
        case "text-color":
            styleSettings.textColor = e.target.value;
            styleSettings.setStyle();
            break;
        case "primary-label":
            styleSettings.primaryLabel = e.target.value;
            styleSettings.setLabels();
            break;
        case "secondary-label":
            styleSettings.secondaryLabel = e.target.value;
            styleSettings.setLabels();
            break;
        default:
            break;
    }
}

function backToHome() {
    location.href = "https://lopste.github.io"
}
function changeHeading({target}) {
    if(target == $("#page-heading")) {
        $("#page-heading").innerText = "Made by Lopste";
    } else {
        $("#page-heading").innerText = "Dual Counters";
    }
}
document.addEventListener("mousemove", changeHeading)
$("#page-heading").addEventListener("click", backToHome);

const inputs = document.querySelectorAll("#settings input");
for(let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", handleSettings);
}

document.addEventListener("keydown", keyWrap)
document.addEventListener("keyup", keyWrap)
window.addEventListener("resize", () => {
    let settingsPanel = $("#settings");
    let settingsButton = $("#settings-button");

    let leftPosition = settingsButton.getBoundingClientRect().right;
    let topPosition = settingsButton.getBoundingClientRect().bottom + 20;

    settingsPanel.style = `top: ${topPosition}px; left: ${leftPosition}px;`;
})

document.addEventListener("contextmenu", (e) => {e.preventDefault()})