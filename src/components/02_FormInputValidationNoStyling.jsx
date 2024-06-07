// start with code from 01_FormInputValidationHtmlOnly.jsx

import { useEffect, useState } from "react";
export default function FormInputValidationNoStyling() {
  // TODO: create state variables for email, password, hidePassword, emailError, passwordError
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  // TODO: use useEffect hook to run functions to validate the input email and password
  // TODO: provide a button to show or hide the password
  // TODO: ensure the button is correctly set up in the the form element
  useEffect(() => {
    const validateEmail = () => {
      // code here:
      if (email === "") {
        setEmailError("");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    };
    const validatePassword = () => {
      // code here:
      if (password === "") {
        setPasswordError("");
      } else if (password.length < 6) {
        setPasswordError(
          "Invalid password, must be at least 6 characters long"
        );
      } else {
        setPasswordError("");
      }
    };

    validateEmail();
    validatePassword();
  }, [email, password]);

  function handleSubmit(e) {
    e.preventDefault();
    // code here:
    if (!emailError && !passwordError) {
      const newEntry = { email, password };
      setSubmittedData([...submittedData, newEntry]);
      alert(`Successfully! ${email} has been submitted`);
    } else if (emailError && passwordError) {
      alert("Invalid Email and Password");
    } else if (emailError) {
      alert("Invalid Email");
    } else if (passwordError) {
      alert("Invalid Password");
    } else {
      alert("Unknow Error");
    }
  }

  function handleHidePassword(e) {
    e.preventDefault();
    // code here:
    setHidePassword(!hidePassword);
  }

  return (
    <div className="bg-slate-500 min-h-screen">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && email !== "" && <p>{emailError}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type={hidePassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && password !== "" && <p>{passwordError}</p>}
          <div className="flex items-center mt-2">
            <button onClick={handleHidePassword}>
              {hidePassword ? "Show Password" : "Hide Password"}
            </button>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <h2>Submitted Data</h2>
        <ul>
          {submittedData.map((entry, index) => (
            <li key={index}>
              Email: {entry.email}, Password: {entry.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
