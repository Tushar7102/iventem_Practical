import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/loginUser", { email, password });
      const { token, user } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userName", user?.name || "");
        navigate("/");
      }
    } catch (err) {
      alert("Login error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <h3 className="mb-4 text-center">Login</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" disabled={loading}>
          Login
        </button>
      </form>
      <p className="mt-3 text-center">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;
