import React from 'react';
		import Question from '../components/Question';
		import QuestionForm from './QuestionForm';

		class FAQContainer extends React.Component {
		 constructor(props){
		   super(props)
		   this.state = {
		     selectedQuestion: null,
		     questions: [],
		     question: '',
	       answer: ''
		   }
		   this.toggleQuestionSelect = this.toggleQuestionSelect.bind(this)
		   this.handleFormSubmit = this.handleFormSubmit.bind(this)
		   this.handleQuestionChange = this.handleQuestionChange.bind(this)
	    this.handleFormClear = this.handleFormClear.bind(this)
	    this.handleAnswerChange = this.handleAnswerChange.bind(this)
		 }

		 handleFormSubmit(event) {
		   event.preventDefault()
		   let newId = this.state.questions.length + 1
		   let newQuestion = {
		     id: newId,
		     question: this.state.question,
	       answer: this.state.answer
		    }

	    fetch('/api/v1/questions', {
		      method: 'POST',
		      body: JSON.stringify(newQuestion)
		    })
		    .then(response => response.json())
		    .then(body => {
		      this.setState({ questions: this.state.questions.concat(newQuestion) })
		    })
		    this.handleFormClear(event)
		  }




		 handleQuestionChange(event) {
		   let newQuestion = event.target.value
		   this.setState({ question: newQuestion})
		 }


	  handleAnswerChange(event) {
	    let newAnswer = event.target.value
	    this.setState({ answer: newAnswer})
	  }

		 handleFormClear(event) {
		   event.preventDefault()
		   this.setState({ question: '', answer: ''})
		 }


		 componentDidMount() {
		   console.log("** componentDidMount **")
		   console.log("render was just called")
		   fetch('/api/v1/questions')
		   .then(response => {
		     if (response.ok) {
		       return response;
		     } else {
		       let errorMessage = `${response.status} (${response.statusText})`,
	        error = new Error(errorMessage);
		       throw(error);
		     }
		   })
		   .then(response => response.json())
		   .then(body => {
		     let nextQuestions = body;
		     this.setState({ questions: nextQuestions });
		   })
		   .catch(error => console.error(`Error in fetch: ${error.message}`));
		 }


		 toggleQuestionSelect(id) {
		   if (id === this.state.selectedQuestion) {
		     this.setState({ selectedQuestion: null})
		   } else {
		     this.setState({ selectedQuestion: id })
		   }
		 }

		 render() {
		   let questions = this.state.questions.map(question => {
		     let selected;
		     if (this.state.selectedQuestion === question.id) {
	        selected = true
		     }

		     let handleClick = () => { this.toggleQuestionSelect(question.id) }
		     return(
		       <div>
		         <Question
	           key={question.id}
		           question={question.question}
		           answer={question.answer}
		           selected={selected}
		           handleClick={handleClick}
		         />
		       </div>
		     )
		   })

		   return(
		     <div className='page'>
		       <h1>Frequently Asked Questions!</h1>
		       <div className='question-list'>
		         {questions}
		       </div>
		       <div>
		         <QuestionForm
		           handleFormSubmit={this.handleFormSubmit}
	           handleQuestionChange={this.handleQuestionChange}
	           question={this.state.question}
	             answer={this.state.answer}
	             handleAnswerChange={this.handleAnswerChange}
	             key={this.state.id}
		         />
		       </div>
		     </div>
		   )
		 }
		}

		export default FAQContainer;
