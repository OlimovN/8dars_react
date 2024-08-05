import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./index.module.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.repassword)
      newErrors.repassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(
        "https://auth-rg69.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data.message) {
        setErrors({ general: data.message });
        return;
      }

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        alert("User registered successfully!");
        navigate("/login"); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        autoComplete="off"
        onSubmit={handleRegister}
      >
        <h1>Register</h1>
        <input
          type="text"
          name="username"
          placeholder="Enter username..."
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? styles.error : ""}
        />
        {errors.username && (
          <p className={styles.errorText}>{errors.username}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter email..."
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? styles.error : ""}
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? styles.error : ""}
        />
        {errors.password && (
          <p className={styles.errorText}>{errors.password}</p>
        )}

        <input
          type="password"
          name="repassword"
          placeholder="Confirm password..."
          value={formData.repassword}
          onChange={handleChange}
          className={errors.repassword ? styles.error : ""}
        />
        {errors.repassword && (
          <p className={styles.errorText}>{errors.repassword}</p>
        )}

        {errors.general && <p className={styles.errorText}>{errors.general}</p>}

        <button type="submit" className={styles.button}>
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
 