import React from 'react';
import TokenService from '../../Helpers/TokenService';
import QuizService from '../../Helpers/QuizService';
import { Link } from 'react-router-dom';
import Context from '../../Components/Context/Context';
import './Quiz.css';

export default class Quiz extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      quizStatus: null,
      quiz: {},
      quizAnswers: [],
      isLoading: true
    };
  }

  componentDidMount() {
    // runs a api call to the api with the question id & user's id to check if the user has completed the quiz before
    QuizService.checkIfQuizCompleted(
      this.props.match.params.question_id,
      TokenService.getAuthToken()
    ).then(result => {
      if (result) {
        this.setState({
          quizStatus: 'completed',
          isLoading: false
        });
      }
      // if the user hasn't completed the given quiz before it will run another api call to grab the questions and answer selections
      // so the user can complete the quiz
      else {
        this.setState({ quizStatus: 'incomplete' });
        QuizService.getQuiz(
          this.props.match.params.question_id,
          TokenService.getAuthToken()
        )
          .then(result => {
            this.setState({ quiz: result });
          })
          .then(() => {
            QuizService.getQuizAnswers(
              this.props.match.params.question_id,
              TokenService.getAuthToken()
            ).then(result =>
              this.setState({ quizAnswers: result, isLoading: false })
            );
          });
      }
    });
  }

  // when a user successfully submits their answer the app will push them back to the dashboard
  onSuccessfulSubmittion = question_id => {
    const { history } = this.props;
    history.push(`/quiz-stats/${question_id}`);
  };

  submitAnswer = ev => {
    ev.preventDefault();
    const { answerSelection } = ev.target;
    QuizService.postAnswer(
      this.state.quiz.id,
      answerSelection.value,
      TokenService.getAuthToken()
    )
      .then(res => {
        this.onSuccessfulSubmittion(this.state.quiz.id);
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  ifLoading = () => {
    // while the app is making it api call and processing all the data it will inform the user its loading
    // so they're not wondering why the page is blank
    if (this.state.isLoading) {
      return (
        <div>
          <h5>Loading...</h5>
        </div>
      );
    }
    // if the user has completed the quiz before it will inform the user and instruct them to go back to the dashboard
    // so they can choose a new quiz
    else if (this.state.quizStatus === 'completed') {
      return (
        <div>
          <h5>Sorry you've already completed this quiz</h5>
          <Link to='/Dashboard'>Back to the dashboard</Link>
        </div>
      );
    }
    // if the user hasn't completed the quiz before it will start the quiz
    else {
      return (
        <div>
          <form onSubmit={this.submitAnswer}>
            <h1 className='quizH1'>{this.state.quiz.question}</h1>
            <select required name='answerSelection' className='quizSelect'>
              <option selected disabled value=''>
                Choose an option
              </option>
              {this.state.quizAnswers.map(answer => {
                return <option value={answer.id}>{answer.answer}</option>;
              })}
            </select>
            <br />
            <button type='submit' className='quizSubmit'>
              submit
            </button>
          </form>
        </div>
      );
    }
  };

  render() {
    return <div className='Quiz'>{this.ifLoading()}</div>;
  }
}
