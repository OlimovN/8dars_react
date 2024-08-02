import React, { useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (formData.username.length < 3)
      newErrors.username = "Username isn't valid";
    if (formData.password.length < 3)
      newErrors.password = "Password isn't valid";

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

      if (data.message === "Invalid Password!") {
        setErrors({ password: data.message });
        return;
      }
      if (data.message === "User Not found.") {
        setErrors({ username: data.message });
        return;
      }
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(formData));
        localStorage.setItem("accessToken", data.accessToken);
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

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
