function validateForm() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Hardcoded credentials (for demo purposes only)
  var validUsername = "pranjil";
  var validPassword = "pranjil@123";

  if (username.trim() == "") {
    alert("Please enter your username.");
    return false;
  }

  if (password.trim() == "") {
    alert("Please enter your password.");
    return false;
  }

  if (username !== validUsername || password !== validPassword) {
    alert("Invalid username or password.");
    return false;
  }
  window.location.href = "./userpage.html"; // Redirect to index.html in the same location
  return false; // Prevent form submission
}
