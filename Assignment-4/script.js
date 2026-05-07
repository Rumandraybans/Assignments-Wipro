var students = [];

function addStudent() {
    var nameField = document.getElementById('nameInput');
    var addressField = document.getElementById('addressInput');
    var batchField = document.getElementById('batchInput');

    var nameValue = nameField.value;
    var addressValue = addressField.value;
    var batchValue = batchField.value;

    if (nameValue == "" || batchValue == "") {
        alert("Please fill in the Name and Batch!");
        return;
    }

    var newStudent = {
        name: nameValue,
        address: addressValue,
        batch: batchValue
    };

    students.push(newStudent);

    nameField.value = "";
    addressField.value = "";
    batchField.value = "";

    updateDisplay();
}

function deleteRecord() {
    if (students.length > 0) {
        var choice = confirm("Are you sure you want to delete the last student?");
        if (choice == true) {
            students.pop();
            updateDisplay();
        }
    } else {
        alert("The list is already empty!");
    }
}

document.getElementById('batchInput').onkeypress = function(event) {
    if (event.key == "Enter") {
        addStudent();
    }
};

function updateDisplay() {
    var listDiv = document.getElementById('studentList');
    var totalText = document.getElementById('totalCount');
    var b002Text = document.getElementById('b002Count');

    listDiv.innerHTML = "";

    var countTotal = students.length;
    var countB002 = 0;

    for (var i = 0; i < students.length; i++) {
        var currentStudent = students[i];

        if (currentStudent.batch.toUpperCase() == "B002") {
            countB002 = countB002 + 1;
        }

        listDiv.innerHTML += '<div class="student-entry">' +
            '<strong>' + currentStudent.name + '</strong> (' + currentStudent.batch + ')<br>' +
            '<small>' + currentStudent.address + '</small>' +
            '</div>';
    }

    totalText.innerText = countTotal;
    b002Text.innerText = countB002;
}