import { useEffect, useState } from "react";
import "./styles.css";

const validate = {
  name: (val) => {
    let err;
    if (!val.trim()) {
      err = "Name is required";
    }
    return err;
  },
  message: (val) => {
    let err;
    if (!val.trim()) {
      err = "Message is required";
    }
    return err;
  },
  email: (val) => {
    let err;
    if (!val.trim()) {
      err = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      err = "Invalid email format";
    }
    return err;
  },
};

const initialState = {
  name: {
    value: "",
    errorMessage: "",
  },
  email: {
    value: "",
    errorMessage: "",
  },
  message: {
    value: "",
    errorMessage: "",
  },
};

const ContactForm = () => {
  const [data, setData] = useState(initialState);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => {
    const savedData = sessionStorage.getItem("contactForm");
    if (savedData) setData(JSON.parse(savedData));
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setData((prev) => {
      const updatedData = { ...prev, [name]: { ...prev[name], value } };
      sessionStorage.setItem("contactForm", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;
    const updatedData = { ...data };

    Object.keys(updatedData).forEach((key) => {
      const field = updatedData[key];
      const errorMessage = validate[key](field.value);

      updatedData[key] = {
        ...field,
        errorMessage,
      };
      if (errorMessage) isValid = false;
    });

    setData(updatedData);
    if (isValid) {
      setIsSubmitted(true);
      setSubmittedName(data.name.value);
      setData(initialState);
      sessionStorage.removeItem("contactForm");
    }

    console.log(event.target);
  };

  return (
    <div className="container">
      {isSubmitted ? (
        <div className="submit-page">{`Thank you, ${submittedName}!`}</div>
      ) : (
        <form className="form" action="" onSubmit={handleSubmit}>
          <div className="field-container">
            <label className="label" htmlFor="name">
              Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleOnChange}
              value={data.name.value}
              className="field"
            />
            {data.name.errorMessage && (
              <p className="error">{data.name.errorMessage}</p>
            )}
          </div>
          <div className="field-container">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleOnChange}
              value={data.email.value}
              className="field"
            />
            {data.email.errorMessage && (
              <p className="error">{data.email.errorMessage}</p>
            )}
          </div>
          <div className="field-container">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              onChange={handleOnChange}
              value={data.message.value}
              className="field"
            />
            {data.message.errorMessage && (
              <p className="error">{data.message.errorMessage}</p>
            )}
          </div>
          <button className="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
