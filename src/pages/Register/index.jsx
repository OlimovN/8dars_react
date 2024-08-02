import React, { useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (formData.username.length < 3)
      newErrors.username = "Username is too short";
    if (formData.email.length < 3) newErrors.email = "Email is too short";
    if (formData.password.length < 3)
      newErrors.password = "Password is too short";
    if (formData.rePassword.length < 3)
      newErrors.rePassword = "Re-enter password is too short";
    if (formData.password !== formData.rePassword)
      newErrors.rePassword = "Passwords do not match";

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

      if (data.message.includes("Failed!")) {
        setErrors((prev) => ({
          ...prev,
          [data.message.includes("Email") ? "email" : "username"]: data.message,
        }));
      } else if (data.message === "User registered successfully!") {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h1>Registration</h1>
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
          autoComplete="off"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? styles.error : ""}
        />
        {errors.password && (
          <p className={styles.errorText}>{errors.password}</p>
        )}

        <input
          type="password"
          name="rePassword"
          placeholder="Re-enter password..."
          autoComplete="off"
          value={formData.rePassword}
          onChange={handleChange}
          className={errors.rePassword ? styles.error : ""}
        />
        {errors.rePassword && (
          <p className={styles.errorText}>{errors.rePassword}</p>
        )}

        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
