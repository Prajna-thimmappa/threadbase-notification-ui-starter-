
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../context/ToastContext.jsx";
import { login } from "../api/mockApi.js";

export default function LoginForm() {
  const [username, setUsername] = useState("ada");
  const [password, setPassword] = useState("password");
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: login,

    onSuccess: () => {
      showToast("Welcome back!", "success");
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ||
        "Something went wrong";

      showToast(message, "error");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({ username, password });
  }

  return (
    <form
      className="card"
      onSubmit={handleSubmit}
    >
      <h2>Login</h2>

      <p className="hint">
        Use ada / password to log in successfully.
      </p>

      <input
        className="input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn"
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
