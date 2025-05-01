import { useState } from "react";

const initialObject = {
  fname: "John",
  lname: "Doe",
};

const ObjectUseState = () => {
  const [person, setPerson] = useState(initialObject);

  const changeName = (person) => {
    //  person.fname === "Bob"
    //  person.lname === "Smith"
    
    //  setPerson(person);

    setPerson({ ...person, fname: "Bob", lname: "Smith" });
  };

  return (
    <div>
      <button onClick={() => changeName(person)}>
        {person.fname} {person.lname}
      </button>
    </div>
  );
};

export default ObjectUseState;
