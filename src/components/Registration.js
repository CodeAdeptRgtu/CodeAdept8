import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import './Registration.css';

function Registration() {
  const [formData, setFormData] = useState({
    fullName: '',
    emailId: '',
    number: '',
    graduation: '',
    branch: '',
    skills: '',
    address: '',
    studentId: '',
    prefferedlanguages: '',
    college: '',
  });

  const [error, setError] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');

  useEffect(() => {
    // Load reCAPTCHA v3 script
    const loadReCaptcha = () => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=6LcpSGUqAAAAAFfQKc6O-qAz9FkUCjcesz-9qPQT`;
      script.async = true;
      document.body.appendChild(script);
    };

    loadReCaptcha();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to validate form data
  const validateForm = () => {
    const { emailId, number } = formData;

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key].trim() === '') {
        setError(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required.`);
        return false;
      }
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      setError('Invalid email format.');
      return false;
    }

    // Simple phone number validation (10-digit format)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(number)) {
      setError('Phone number must be 10 digits.');
      return false;
    }

    return true;
  };

  // Function to check Firestore for uniqueness
  const checkUniqueFields = async () => {
    const { studentId, emailId, number } = formData;

    const studentQuery = query(collection(db, "registrations"), where("studentId", "==", studentId));
    const emailQuery = query(collection(db, "registrations"), where("emailId", "==", emailId));
    const numberQuery = query(collection(db, "registrations"), where("number", "==", number));

    try {
      const [studentSnapshot, emailSnapshot, numberSnapshot] = await Promise.all([
        getDocs(studentQuery),
        getDocs(emailQuery),
        getDocs(numberQuery)
      ]);

      if (!studentSnapshot.empty) {
        setError('Student ID already registered.');
        return false;
      }
      if (!emailSnapshot.empty) {
        setError('Email already registered.');
        return false;
      }
      if (!numberSnapshot.empty) {
        setError('Phone number already registered.');
        return false;
      }
    } catch (error) {
      console.error("Error checking unique fields: ", error);
      setError('An error occurred while checking for uniqueness.');
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!validateForm()) {
      return;
    }

    try {
      // Get reCAPTCHA token
      const token = await window.grecaptcha.execute('6LcpSGUqAAAAAFfQKc6O-qAz9FkUCjcesz-9qPQT', { action: 'submit' });
      setRecaptchaToken(token);

      // Check Firestore for unique studentId, emailId, and number
      const isUnique = await checkUniqueFields();
      if (!isUnique) {
        return;
      }

      // Add the registration document to Firestore if unique
      const docRef = await addDoc(collection(db, "registrations"), {
        ...formData,
        recaptchaToken: token, // Store the token in Firestore if needed
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset form data after successful registration
      setFormData({
        fullName: '',
        emailId: '',
        number: '',
        graduation: '',
        branch: '',
        skills: '',
        address: '',
        studentId: '',
        prefferedlanguages: '',
        college: '',
      });

      // Display success message
      alert("Registration successful!");

    } catch (error) {
      console.error("Error adding document: ", error);
      setError('An error occurred during registration.');
    }
  };

  return (
    <form onSubmit={handleRegister} className="registration-form">
      <h3 className="registration-form__title">Register</h3>

      {Object.keys(formData).map((key) => (
        <div className="registration-form__field" key={key}>
          <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
          {key === 'skills' || key === 'address' ? (
            <textarea
              id={key}
              className="registration-form__input"
              name={key}
              rows="3"
              placeholder={key.replace(/([A-Z])/g, ' $1')}
              value={formData[key]}
              onChange={handleChange}
            />
          ) : (
            <input
              id={key}
              className="registration-form__input"
              name={key}
              placeholder={key.replace(/([A-Z])/g, ' $1')}
              value={formData[key]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      {error && <p className="error-message">{error}</p>}

      <div className="registration-form__submit">
        <button type="submit" className="registration-form__button">
          Register
        </button>
      </div>
    </form>
  );
}

export default Registration;
