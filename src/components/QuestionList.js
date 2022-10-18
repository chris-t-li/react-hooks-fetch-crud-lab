import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ qList, handleClick, updateQuestionAnswer }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{qList.map(q => <QuestionItem key={q.id} handleClick={handleClick} question={q} updateQuestionAnswer={updateQuestionAnswer} />)}</ul>
    </section>
  );
}

export default QuestionList;
