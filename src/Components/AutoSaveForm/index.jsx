import { useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  message: "",
};

const FORM_LOCAL_STORAGE_KEY = "autosave";

const getFormDataFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : initialFormData;
};

const setFormDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// const clearFormDataFromLocalStorage = (key) => {
//   localStorage.removeItem(key);
// };

// for scalability use useeffect with debounce also keep the handlers only for setting state and use useeffect to save to localstorage

function AutoSaveForm() {
  const [formData, setFormData] = useState(() =>
    getFormDataFromLocalStorage(FORM_LOCAL_STORAGE_KEY)
  );

  const handleInputChange = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      setFormDataToLocalStorage(FORM_LOCAL_STORAGE_KEY, updatedData);
      return updatedData;
    });
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
    // clearFormDataFromLocalStorage(FORM_LOCAL_STORAGE_KEY);
    setFormDataToLocalStorage(FORM_LOCAL_STORAGE_KEY, initialFormData);
  };

  return (
    <div>
      <h1>Auto Save Form</h1>

      <form className="form">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          data-testid="form-input"
        />
        <br />
        <br />
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          data-testid="form-email"
        />
        <br />
        <br />
        <label>Message: </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          data-testid="form-message"
        />

        <br />
        <br />
        <button type="button" onClick={handleClearForm} data-testid="clear-btn">
          Clear
        </button>
      </form>
    </div>
  );
}

export default AutoSaveForm;
