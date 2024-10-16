let students = [];

// Function to add student data
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let roll = document.getElementById('roll').value;
    let contact = document.getElementById('contact').value;

    students.push({
        name: name,
        age: age,
        roll: roll,
        contact: contact
    });

    document.getElementById('studentForm').reset();

    displayStudents();
});

// Function to display students in table
function displayStudents() {
    const tableBody = document.querySelector('#studentTable tbody');
    tableBody.innerHTML = '';

    students.forEach(student => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.contact}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Prompt before leaving the page
window.addEventListener('beforeunload', function (event) {
    if (students.length > 0) {
        // Show a confirmation dialog
        const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
        event.returnValue = confirmationMessage; // For most browsers
        return confirmationMessage; // For older browsers
    }
});

// Function to download students data as CSV
document.getElementById('saveButton').addEventListener('click', function() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Roll Number,Name,Age,Contact Email\n" 
        + students.map(e => `${e.roll},${e.name},${e.age},${e.contact}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
});
