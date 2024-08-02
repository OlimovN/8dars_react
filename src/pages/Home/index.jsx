import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

function Home() {
  const [user, setUser] = useState({});
  const [isGreetingVisible, setIsGreetingVisible] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGreetingVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.greeting}>
        {isGreetingVisible && (
          <h1 className={styles.greetingText}>
            Welcome back, {user.username}!
          </h1>
        )}
      </div>
      <div className={styles.content}>
        <h2>Explore the latest updates and features:</h2>
      </div>
    </div>
  );
}

export default Home;
