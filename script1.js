function validateLogin(event) {
    event.preventDefault();
  
    // Get form inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Get user data from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check if user exists and password matches
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      confirm('Login successful!');
  
      // Store the logged-in user's information in local storage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
  
      // Redirect to home page or perform other actions
      displayUserIcon(user.name);
    } else {
      confirm('Invalid email or password');
    }
  }
  
  function validateSignup(event) {
    event.preventDefault();
  
    // Get form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Get existing users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check if user already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      confirm('User already exists with the provided email');
      return;
    }
  
    // Create new user object
    const newUser = {
      name: name,
      email: email,
      password: password
    };
  
    // Add new user to the users array
    users.push(newUser);
  
    // Store updated users array in local storage
    localStorage.setItem('users', JSON.stringify(users));
  
    confirm('Sign up successful!');
  
    // Store the newly signed-up user's information in local storage
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
  
    // Redirect to login page or perform other actions
    displayUserIcon(newUser.name);
  }
  
  function displayUserIcon(name) {
    // Get the logged-in user's name
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
    // Get the first letter of the name
    const firstLetter = name.charAt(0).toUpperCase();
  
    // Create the user icon element
    const userIcon = document.createElement('div');
    userIcon.classList.add('user-icon');
    userIcon.textContent = firstLetter;
  
    // Add click event listener to the user icon for logout functionality
    userIcon.addEventListener('click', logout);
  
    // Append the user icon to the navbar
    const navbar = document.querySelector('.navbar');
    navbar.appendChild(userIcon);
  
    // Replace the login and sign up links with the user icon
    const loginLink = document.querySelector('a[href="login.html"]');
    const signupLink = document.querySelector('a[href="signup.html"]');
    loginLink.style.display = 'none';
    signupLink.style.display = 'none';
  }
  
  function logout() {
    // Clear the logged-in user's information from local storage
    localStorage.removeItem('loggedInUser');
  
    // Reload the page to show the login and sign up links again
    location.reload();
  }
  
  // Check if a user is already logged in
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    displayUserIcon(loggedInUser.name);
  }
  