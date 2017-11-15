function Answer() {
    var correct = false;

    if (document.getElementById("because").checked) {
        correct = false;
    }

    if (document.getElementById("wanted").checked) {
        correct = false;
    }

    if (document.getElementById("reasons").checked) {
        correct = true;
    }

    if (document.getElementById("die").checked) {
        correct = false;   
    }

    if (correct) {
        alert("Correct!!!!");
    }
    else {
        alert("Not Correct!!!!");
    }
}