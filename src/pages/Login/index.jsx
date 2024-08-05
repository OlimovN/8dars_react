import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./index.module.css";

function Login({ setToken }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(
        "https://auth-rg69.onrender.com/api/auth/signin",
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
        setToken(data.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} autoComplete="off" onSubmit={handleLogin}>
        <h1>Login</h1>
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

        {errors.general && <p className={styles.errorText}>{errors.general}</p>}

        <button type="submit" className={styles.button}>
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
