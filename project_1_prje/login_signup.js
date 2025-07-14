const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginButton = document.getElementById('loginButton');

[loginEmail, loginPassword].forEach(input => {
  input.addEventListener('input', () => {
    loginButton.disabled = !loginEmail.value || !loginPassword.value;
  });
});

async function handleLogin(event) {
  event.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful');
      // Redirect or perform post-login actions
      window.location.href = '../index.html'; // Replace with the desired page
    } else {
      document.getElementById('loginEmailError').innerText = data.error || 'Login failed';
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
}

async function handleSignup(event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    document.getElementById('signupPasswordError').innerText = 'Passwords do not match';
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Signup successful');
      window.location.href = '../index.html'; 
    } else {
      document.getElementById('signupEmailError').innerText = data.error || 'Signup failed';
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
}

function showLogin() {
  document.getElementById('loginForm').classList.add('active');
  document.getElementById('signupForm').classList.remove('active');
}

function showSignup() {
  document.getElementById('signupForm').classList.add('active');
  document.getElementById('loginForm').classList.remove('active');
}

async function handleForgotPassword(event) {
  event.preventDefault();

  const email = document.getElementById('resetEmail').value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Reset link sent to your email');
    } else {
      alert(data.error || 'Failed to send reset link');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
}

function openForgotPasswordModal() {
  document.getElementById('forgotPasswordModal').style.display = 'block';
}

// Close the forgot password modal
function closeForgotPasswordModal() {
  document.getElementById('forgotPasswordModal').style.display = 'none';
}
