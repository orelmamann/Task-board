let day, month, year, hour, minute, task;
let divS = '<div class="note p-2">';
let iS = '<i class="bi bi-x-lg float-end xbtn" onclick="deleteNote(';
let iE = ')"></i>';
let pS = '<p>';
let pE = '</p>';
let div2S = '<div>';
let slash = '/';
let br = '<br>';
let colon = ':';
let div2E = '</div>';
let divE = '</div>';

let d = new Date();
let dated = d.getDate();
let datem = d.getMonth() + 1;
let datey = d.getFullYear();
let timeh = d.getHours();
let timem = d.getMinutes();

let notes = [];

GetNotesFromLocalStorage();

function GetNotesFromLocalStorage() {
    let getn = localStorage.getItem('notes');
    if (getn != null) {
        let parsen = JSON.parse(getn);
        console.log(parsen);
        for (let i = 0; i < parsen.length; i++) {
            let ndata = parsen[i];
            notes.push(ndata);
        }
    }
    showData();
    placeHolder();
    document.getElementById("task").focus();
}


class Note {
    constructor(day, month, year, hour, minute, task) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.minute = minute;
        this.task = task;
    }
}

function getValues() {
    day = document.getElementById("day").value;
    month = document.getElementById("month").value;
    year = document.getElementById("year").value;
    hour = document.getElementById("hour").value;
    minute = document.getElementById("minute").value;
    task = document.getElementById("task").value;
}

function validateData() {
    if (day == '') {
        day = dated;
    }
    if (month == '') {
        month = datem;
    }
    if (year == '') {
        year = datey;
    }
    if (hour == '') {
        hour = timeh;
    }
    if (minute == '') {
        minute = timem;
    }
}

function saveData() {
    getValues();
    validateData();
    let note1 = new Note(day, month, year, hour, minute, task);
    notes.push(note1);
    localStorage.setItem('notes', JSON.stringify(notes));


    showData();
    document.getElementById("taskform").reset();


}

function showData() {

    let notesdiv = '';
    for (let i = 0; i < notes.length; i++) {
        let notediv = divS + iS + i + iE + pS + notes[i].task +
            pE + div2S + notes[i].day + slash + notes[i].month +
            slash + notes[i].year + br + notes[i].hour +
            colon + notes[i].minute + div2E + divE;

        notesdiv += notediv;
    }
    document.getElementById('note-area').innerHTML = notesdiv;

}

function deleteNote(i) {
    notes.splice(i, 1);
    localStorage.clear();
    localStorage.setItem("notes", JSON.stringify(notes));
    showData();
}

function minmax(value, min, max) {
    if (parseInt(value) < min || isNaN(parseInt(value)))

        return min;
    else if (parseInt(value) > max) return max;
    else return parseInt(value);
}

function placeHolder() {
    let dd = dated.toString();
    let dm = datem.toString();
    let dy = datey.toString();
    let th = timeh.toString();
    let tm = timem.toString();
    document.getElementById('day').placeholder = dd;
    document.getElementById('month').placeholder = dm;
    document.getElementById('year').placeholder = dy;
    document.getElementById('hour').placeholder = th;
    document.getElementById('minute').placeholder = tm;
}