import { useState } from "react";
import TreeLogo from "../tree.svg";

// Password comes from VITE_PASSWORD env var.
// Set via GitHub Actions secret for production, or .env.local for local dev.
// If unset, the gate is skipped entirely.
const VALID_PASSWORD = import.meta.env.VITE_PASSWORD?.trim().toLowerCase() ?? "";

const SESSION_KEY = "familyTreeAuth";

export function isAuthenticated() {
  return !VALID_PASSWORD || sessionStorage.getItem(SESSION_KEY) === "1";
}

export default function PasswordGate({ onAuthenticated }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === VALID_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onAuthenticated();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="password-gate">
      <div className="password-gate-card">
        <div className="password-gate-logo-circle">
          <img src={TreeLogo} alt="tree logo" className="password-gate-logo" />
        </div>
        <h1 className="password-gate-title">Family Tree</h1>
        <form onSubmit={handleSubmit} className="password-gate-form">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Enter password"
            className={`password-gate-input${error ? " password-gate-input-error" : ""}`}
            autoFocus
          />
          {error && (
            <div className="password-gate-error">Incorrect password</div>
          )}
          <button type="submit" className="password-gate-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
