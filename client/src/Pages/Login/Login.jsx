import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import { login } from "../../api/ilmApi";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const { setToken, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("✅ Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      navigate("/");
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || "❌ Invalid credentials!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.group}>
          <label>Email / Username</label>
          <input
            type="text"
            required
            value={formData.identifier}
            onChange={(e) =>
              setFormData({
                ...formData,
                identifier: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.group}>
          <label>Password</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <button className={styles.button}>Login</button>

        <p className={styles.bottomText}>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
