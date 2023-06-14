import React, { useState } from "react";

//@ts-ignore
function RadioForm({ selectedOption, setSelectedOption }) {
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };

  return (
    <form
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        zIndex: 100,
      }}
    >
      <div>
        <label>
          <input
            type="radio"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={handleOptionChange}
          />
          Option 1
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={handleOptionChange}
          />
          Option 2
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="option3"
            checked={selectedOption === "option3"}
            onChange={handleOptionChange}
          />
          Option 3
        </label>
      </div>
      <p>Selected option: {selectedOption}</p>
    </form>
  );
}

export default RadioForm;
