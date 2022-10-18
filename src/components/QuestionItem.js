import React from "react";

function QuestionItem({ question, handleClick, updateQuestionAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleChangeAns(e) {
    const qObj = { ...question, correctIndex: e.target.value };
    updateQuestionAnswer(qObj);
    //console.log(qObj);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChangeAns} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={() => handleClick(question)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
