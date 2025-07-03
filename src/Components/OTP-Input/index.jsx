import { useRef, useState } from "react";

function OTPInput({ onChangeOTP }) {
  const length = 4; // Total number of OTP input boxes
  const [otp, setOTP] = useState(Array(length).fill("")); // State to store each digit
  const inputsRef = useRef([]); // Array of input refs to control focus

  const focusInput = (index) => {
    // TODO: Focus the input element at the specified index

    inputsRef.current[index]?.focus();
  };

  const handleChange = (e, index) => {
    // TODO: Implement value validation, state update, auto-focus, and OTP completion check
    const { value } = e.target;

    if (!/^\d*$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < length - 1) {
      focusInput(index + 1);
    }
    const joinedOTP = newOTP.join("");

    if (joinedOTP.length === length && !newOTP.includes("")) {
      // second check is a double check in case of some empty string not being ""
      onChangeOTP(joinedOTP);
    }
  };

  const handleKeyDown = (e, index) => {
    // TODO: Handle backspace behavior for navigation

    if (e.key === "Backspace" && otp[index] === "" && index > 0)
      focusInput(index - 1);
  };

  const handlePaste = (e) => {
    // TODO: Extract numeric values from pasted string and update inputs accordingly

    e.preventDefault(); // this is necessary to stop browser's default beahvior of paste(browser try to paste all the value in one input and it can differ in diff devices/browser even if maxLength is set to 1)

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (pasted.length === 0) return;
    console.log(pasted);

    const newOTP = [...otp];

    for (let i = 0; i < pasted.length; i++) {
      newOTP[i] = pasted[i];
      // if (inputsRef.current[i]) {       //no need as state is already thier for controlled input
      //   inputsRef.current[i].value = pasted[i];
      // }
    }

    setOTP(newOTP);

    const joinedOTP = newOTP.join("");

    if (joinedOTP.length === length && !newOTP.includes("")) {
      onChangeOTP(joinedOTP);
    }

    const nextFocusIndex = Math.min(pasted.length, length - 1);

    focusInput(nextFocusIndex);
  };

  // Render the OTP input fields
  return (
    <div
      onPaste={handlePaste}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)} // Save input ref for focus management
          type="text" // Use text input for better control over formatting
          maxLength="1" // Limit to 1 character per input
          inputMode="numeric" // Show numeric keyboard on mobile devices
          value={digit} // Controlled input tied to state
          onChange={(e) => handleChange(e, index)} // Handle typing
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace
          style={{
            width: "40px",
            height: "40px",
            fontSize: "20px",
            textAlign: "center",
            marginRight: "10px",
          }}
        />
      ))}
    </div>
  );
}

const OTPInputParent = () => {
  const handleOTPChange = (otp) => {
    console.log("Entered OTP:", otp);
  };

  return <OTPInput onChangeOTP={handleOTPChange} />;
};

export default OTPInputParent;
