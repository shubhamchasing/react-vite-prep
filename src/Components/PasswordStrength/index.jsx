import { useState } from "react";
import "./styles.css";

// ✅ Export this so it can be tested
export const checkPasswordStrength = (pwd) => {
  const check = [
    pwd.length >= 8,
    /[A-Z]/.test(pwd),
    /[a-z]/.test(pwd),
    /[0-9]/.test(pwd),
    /[^A-Za-z0-9]/.test(pwd),
  ];

  const passedLevels = check.filter(Boolean).length;

  if (passedLevels === 1) return "Level 1";
  if (passedLevels === 2 || passedLevels === 3) return "Level 2";
  if (passedLevels === 4 || passedLevels === 5) return "Level 3";
  return "Weak Password";
};

const PasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [strengthLevel, setStrengthLevel] = useState("");

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckStrenth = () => {
    const strengthMsg = checkPasswordStrength(password);
    setStrengthLevel(strengthMsg);
  };

  return (
    <div>
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handlePassword}
      />
      <button onClick={handleCheckStrenth}>Check Strength</button>
      {strengthLevel && (
        <div>
          Strength: <strong>{strengthLevel}</strong>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
