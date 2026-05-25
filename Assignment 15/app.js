
const AUTH_URL = 'http://localhost:3003';   // user auth server
const DATA_URL = 'http://localhost:3000/students'; // student data server

document.addEventListener('DOMContentLoaded', checkAuthentication);


document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('registerForm').addEventListener('submit', handleRegister);
document.getElementById('studentForm').addEventListener('submit', handleStudentSubmit);
document.getElementById('searchBtn').addEventListener('click', searchStudents);
document.getElementById('resetBtn').addEventListener('click', fetchStudents);
document.getElementById('cancelBtn').addEventListener('click', resetForm);
document.getElementById('logoutBtn').addEventListener('click', handleLogout);


function toggleAuthScreens(showRegister) {
    if (showRegister) {
        document.getElementById('loginBox').classList.add('hidden');
        document.getElementById('registerBox').classList.remove('hidden');
    } else {
        document.getElementById('registerBox').classList.add('hidden');
        document.getElementById('loginBox').classList.remove('hidden');
    }
}


function checkAuthentication() {
    const token = localStorage.getItem('userToken');
    if (token) {
        document.getElementById('authOverlay').classList.add('hidden');
        document.getElementById('mainDashboard').classList.remove('hidden');
        fetchStudents();
    } else {
        document.getElementById('authOverlay').classList.remove('hidden');
        document.getElementById('mainDashboard').classList.add('hidden');
    }
}


function getAuthHeaders() {
    return {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json'
    };
}



async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Login failed');

        localStorage.setItem('userToken', data.token); // Store token safely
        document.getElementById('loginForm').reset();
        checkAuthentication(); 
    } catch (error) {
        alert(error.message);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch(`${AUTH_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Registration failed');

        alert('Registration successful! Please login.');
        document.getElementById('registerForm').reset();
        toggleAuthScreens(false); 
    } catch (error) {
        alert(error.message);
    }
}

function handleLogout() {
    localStorage.removeItem('userToken');
    checkAuthentication();
}


async function fetchStudents() {
    try {
        document.getElementById('searchKeyword').value = '';
        const response = await fetch(DATA_URL, { headers: getAuthHeaders() });
        
        if (response.status === 401 || response.status === 403) return handleLogout();
        
        const students = await response.json();
        renderTable(students);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function handleStudentSubmit(e) {
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
            response = await fetch(`${DATA_URL}/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(studentData)
            });
        } else {
            response = await fetch(DATA_URL, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(studentData)
            });
        }

        if (!response.ok) throw new Error(await response.text());
        
        alert(id ? 'Student updated!' : 'Student added!');
        resetForm();
        fetchStudents();
    } catch (error) {
        alert('Operation failed: ' + error.message);
    }
}

async function deleteStudent(id) {
    if (!confirm('Delete this record?')) return;
    try {
        const response = await fetch(`${DATA_URL}/${id}`, { 
            method: 'DELETE', 
            headers: getAuthHeaders() 
        });
        if (!response.ok) throw new Error(await response.text());
        fetchStudents();
    } catch (error) {
        alert(error.message);
    }
}

async function searchStudents() {
    const keyword = document.getElementById('searchKeyword').value.trim();
    if (!keyword) return fetchStudents();

    try {
        const response = await fetch(`${DATA_URL}/search?keyword=${encodeURIComponent(keyword)}`, { 
            headers: getAuthHeaders() 
        });
        if (!response.ok) throw new Error(await response.text());
        const students = await response.json();
        renderTable(students);
    } catch (error) {
        alert(error.message);
    }
}



function renderTable(students) {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';
    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No records found.</td></tr>`;
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
            </td>`;
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