const inputtext = document.getElementById("input-text");
const listcontainer = document.getElementById("list-container");

/**
 * Adds a new task to the list. If the input is empty, it will alert the user to
 * enter some text. Otherwise, it creates a new list item with the input text and
 * appends it to the list container. It also appends a span with the text "x" to
 * the list item. Finally, it clears the input text.
 */
function addtask() {
    if (inputtext.value === '') {
        alert("you must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputtext.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "x";
        li.appendChild(span);
        saveData();
    }
    inputtext.value = " ";
    saveData();
}

listcontainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("check");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }

}, false);

function saveData() {
    localStorage.setItem("data", listcontainer.innerHTML);
    console.log("data saved");
}

function showTask() {
    listcontainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();

function openList(evt, listName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tablinks[i].classList.remove("active");
    }
    document.getElementById(listName).style.display = "block";
    evt.currentTarget.classList.add("active");

    if (listName === "Completed") {
        const completed = document.getElementById("list-container-Completed");
        const all = document.getElementById("list-container-All");
        completed.innerHTML = "";
        all.innerHTML = "";
        const allList = document.querySelectorAll("li");
        allList.forEach(task => {
            if (task.classList.contains("check")) {
                completed.appendChild(task);
            } else {
                all.appendChild(task);
            }
        });
    }
}