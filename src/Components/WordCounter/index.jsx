import { useState, useEffect } from "react";
import "./styles.css";

function WordCounter() {
  const [text, setText] = useState("");
  const [count, setCount] = useState([]);

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleCount = () => {
    const cleanedText = text
      .toLowerCase()
      .replace(/[^a-zA-Z\s]/g, "")
      .trim();

    const words = cleanedText.split(/\s+/).filter((word) => word.length > 0);

    const wordMap = new Map();

    words.forEach((word) => {
      wordMap.set(word, (wordMap.get(word) || 0) + 1);
    });

    const sortedArr = Array.from(wordMap.entries()).sort((a, b) => b[1] - a[1]);

    setCount(sortedArr);
  };

  useEffect(() => {
    // Function Call
    handleCount();
  }, [text]);

  return (
    <div className="wordCounter">
      <h1>Word Counter</h1>

      <div className="container">
        <textarea
          className="textarea"
          placeholder="Type your text here"
          data-testid="textarea"
          value={text}
          onChange={handleOnChange}
        ></textarea>

        {/* Display result on if there are any characters or words */}

        {count.length > 0 && (
          <div className="results">
            <h3>Word Frequencies</h3>
            <ul data-testid="result-list">
              {count.map(([word, count], index) => (
                <li key={word} data-testid={`word-${word}`}>
                  <strong>{word}</strong>: {count} Times
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default WordCounter;

//     function handleCount() {
//       // Count Logic

//       let copyText = text;

//       copyText = copyText
//         .toLowerCase()
//         .split(" ")
//         .filter((word) => word !== " " && word !== "")
//         .map((word) =>  word.match(/[a-zA-Z]+/g)).filter(word => word !== null).map(word =>  word[0] )

//     //   copyText = copyText;

//     //   console.log(copyText);
//       const objArr = []
//       copyText.forEach(word => {
//         if(objArr[word]) {
//             objArr[word] = objArr[word] + 1
//         }
//         else{
//             objArr.push({[word] : 1})
//         }
//       } )
//   console.log(objArr)
//       //   const filterText = [];
//       //   text
//       //     .toLowerCase()
//       //     .split(" ")
//       //     .forEach((word) => {
//       //         let cleanWord = word.match(/[a-zA-Z]+/g)
//       //       if (word !== " " && word) {
//       //         filterText.push(cleanWord);
//       //       }
//       //     });
//       //   console.log(filterText);
//     }
