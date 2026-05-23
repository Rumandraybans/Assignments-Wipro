const API_URL = 'http://localhost:3000/students';


document.addEventListener('DOMContentLoaded', fetchStudents);
document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);
document.getElementById('searchBtn').addEventListener('click', searchStudents);
document.getElementById('resetBtn').addEventListener('click', fetchStudents);
document.getElementById('cancelBtn').addEventListener('click', resetForm);

// --- CRUD Operations ---


async function fetchStudents() {
    try {
        document.getElementById('searchKeyword').value = ''; 
        const response = await fetch(API_URL);
        const students = await response.json();
        renderTable(students);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function handleFormSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('studentId').value;
    const studentData = {
        name: document.getElementById('name').value,
        rollno: parseInt(document.getElementById('rollno').value),
        course: document.getElementById('course').value,
        age: parseInt(document.getElementById('age').value) || undefined,
        email: document.getElementById('email').value,
        city: document.getElementById('city').value
    };

    try {
        let response;
        if (id) {
            
            response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
        } else {
            
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
        }

        if (!response.ok) {
            const errMsg = await response.text();
            throw new Error(errMsg);
        }

        alert(id ? 'Student updated successfully!' : 'Student added successfully!');
        resetForm();
        fetchStudents();
    } catch (error) {
        alert('Operation failed: ' + error.message);
    }
}

async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student record?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(await response.text());
        
        alert('Student deleted successfully.');
        fetchStudents();
    } catch (error) {
        alert('Delete failed: ' + error.message);
    }
}


async function searchStudents() {
    const keyword = document.getElementById('searchKeyword').value.trim();
    if (!keyword) return fetchStudents();

    try {
        const response = await fetch(`${API_URL}/search?keyword=${encodeURIComponent(keyword)}`);
        if (!response.ok) throw new Error(await response.text());
        const students = await response.json();
        renderTable(students);
    } catch (error) {
        alert('Search failed: ' + error.message);
    }
}



function renderTable(students) {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';

    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No students found.</td></tr>`;
        return;
    }

    students.forEach(student => {
        const row = document.createElement('tr');
        
        
        row.innerHTML = `
            <td>${student.rollno || 'N/A'}</td>
            <td><strong>${student.name}</strong></td>
            <td>${student.course || '-'}</td>
            <td>${student.age || '-'}</td>
            <td>${student.email || '-'}</td>
            <td>${student.city || '-'}</td>
            <td class="action-btns">
                <button class="btn btn-warning btn-xs edit-btn">Edit</button>
                <button class="btn btn-danger btn-xs delete-btn">Delete</button>
            </td>
        `;

        
        row.querySelector('.edit-btn').addEventListener('click', () => populateFormForEdit(student));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteStudent(student._id));

        tbody.appendChild(row);
    });
}


function populateFormForEdit(student) {
    document.getElementById('formTitle').innerText = "Edit Student Details";
    document.getElementById('studentId').value = student._id;
    document.getElementById('name').value = student.name;
    document.getElementById('rollno').value = student.rollno;
    document.getElementById('course').value = student.course || '';
    document.getElementById('age').value = student.age || '';
    document.getElementById('email').value = student.email || '';
    document.getElementById('city').value = student.city || '';
    
    document.getElementById('cancelBtn').classList.remove('hidden');
    document.getElementById('submitBtn').className = "btn btn-warning btn-block";
}


function resetForm() {
    document.getElementById('formTitle').innerText = "Add New Student";
    document.getElementById('studentId').value = '';
    document.getElementById('studentForm').reset();
    document.getElementById('cancelBtn').classList.add('hidden');
    document.getElementById('submitBtn').className = "btn btn-success btn-block";
}