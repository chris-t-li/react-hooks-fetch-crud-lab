import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [qList, setQList] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(qns => setQList(qns))
  }, [])

  //console.log(qList)
  function addNewQuestion(newQ) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "prompt": newQ.prompt,
        "answers": [newQ.answer1, newQ.answer2, newQ.answer3, newQ.answer4],
        "correctIndex": newQ.correctIndex,
      })
    })
      .then(res => res.json())
      .then(newQ => setQList([...qList, newQ]))
  }

  function onDeleteClick(q) {
    fetch(`http://localhost:4000/questions/${q.id}`, {
      method: "DELETE"
    }).then(() => setQList(qList.filter(qn => qn.id !== q.id)))
  }

  function updateQuestionAnswer(qObj) {
    fetch(`http://localhost:4000/questions/${qObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ "correctIndex": qObj.correctIndex })
    })
      .then(res => res.json())
      .then(console.log)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm qList={qList} setQList={setQList} addNewQuestion={addNewQuestion} /> : <QuestionList qList={qList} handleClick={onDeleteClick} updateQuestionAnswer={updateQuestionAnswer} />}
    </main>
  );
}

export default App;
