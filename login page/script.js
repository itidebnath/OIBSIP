const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const loginMsg = document.getElementById('login-msg');
const registerMsg = document.getElementById('register-msg');
const authSection = document.getElementById('auth-section');
const secureSection = document.getElementById('secure-section');
const userNameSpan = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');

showRegister.onclick = (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = '';
  loginMsg.textContent = '';
  registerMsg.textContent = '';
};


showLogin.onclick = (e) => {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = '';
  loginMsg.textContent = '';
  registerMsg.textContent = '';
};


function saveUser(username, password) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push({username, password});
  localStorage.setItem('users', JSON.stringify(users));
}


function findUser(username) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find(u => u.username === username);
}


registerForm.onsubmit = function(e) {
  e.preventDefault();
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value;
  if (!username || !password) {
    registerMsg.textContent = 'Please fill all fields.';
    return;
  }
  if (findUser(username)) {
    registerMsg.textContent = 'Username already exists!';
    return;
  }
  saveUser(username, password);
  registerMsg.style.color = 'green';
  registerMsg.textContent = 'Registration successful. Please login.';
  setTimeout(() => {
    registerForm.style.display = 'none';
    loginForm.style.display = '';
    registerMsg.textContent = '';
  }, 1200);
};


loginForm.onsubmit = function(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  if (!username || !password) {
    loginMsg.textContent = 'Please fill all fields.';
    return;
  }
  const user = findUser(username);
  if (!user || user.password !== password) {
    loginMsg.textContent = 'Invalid username or password!';
    return;
  }
  
  localStorage.setItem('loggedInUser', username);
  showSecureSection();
};

function showSecureSection() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    authSection.style.display = 'none';
    secureSection.style.display = '';
    userNameSpan.textContent = loggedInUser;
  }
}


logoutBtn.onclick = function() {
  localStorage.removeItem('loggedInUser');
  secureSection.style.display = 'none';
  authSection.style.display = '';
  loginForm.reset();
  loginMsg.textContent = '';
};


if (localStorage.getItem('loggedInUser')) {
  showSecureSection();
}