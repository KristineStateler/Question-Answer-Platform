import React from 'react';

const QuestionForm = props => {


  return(
    <div>
      <form onSubmit={props.handleFormSubmit} className="form">
      <input type="text" placeholder="question" value={props.question} onChange={props.handleQuestionChange}/>
      <input type="text" placeholder="answer" value={props.answer} onChange={props.handleAnswerChange}/>

      <input type="submit" value="Submit!" />
      </form>
    </div>
  )
}


export default QuestionForm;
