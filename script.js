

let studentsArray = [];
let currentStudentIndex = 0;

// Function to render a single student
function renderStudent(student) {
    const inputDiv = document.getElementById('input');
    if (!inputDiv) return;

    inputDiv.innerHTML = '';

    const studentDiv = document.createElement('div');
    studentDiv.className = 'student';

    const nameHeader = document.createElement('h3');
    nameHeader.textContent = student.name;
    studentDiv.appendChild(nameHeader);

    const classList = document.createElement('ul');
    classList.className = 'class-list';

    if (Array.isArray(student.classes)) {
        student.classes.forEach(className => {
            const listItem = document.createElement('li');
            listItem.textContent = className;
            classList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'No classes available';
        classList.appendChild(listItem);
    }

    studentDiv.appendChild(classList);

    // Add mouseenter event to switch to next student
    studentDiv.addEventListener('mouseleave', () => {
        if (studentsArray.length > 0) {
            currentStudentIndex = (currentStudentIndex + 1) % studentsArray.length;
            renderStudent(studentsArray[currentStudentIndex]);
        }
    });

    inputDiv.appendChild(studentDiv);
}

// Function to fetch and prepare student data
async function displayStudents() {
    try {
        const response = await fetch('storage.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Convert object to array for easier indexing
        studentsArray = Object.values(data);

        if (studentsArray.length === 0) {
            throw new Error('No students found');
        }

        currentStudentIndex = 0;
        renderStudent(studentsArray[currentStudentIndex]);
    } catch (error) {
        console.error('Error fetching or displaying data:', error);
        const inputDiv = document.getElementById('input');
        if (inputDiv) {
            inputDiv.innerHTML = '<p>Error loading student data: ' + error.message + '</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', displayStudents);