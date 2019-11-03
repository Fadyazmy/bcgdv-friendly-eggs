import React from "react";
import Select from "react-select";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

/*
TODO: limit the amount of questions you can ask
*/
class RequestFeedback extends React.Component {
  state = {
    questions: [{skill:""}],
    frequency: "one_time",
    userSearchQuery: "",
    selectedUsers: [],
    allUsers: [{label: "Fadi", value: "fadi@dvhacks.com"},{label: "Matan", value: "matan@dvhacks.com"}, {label: "Jacqui", value: "jacqui@dvhacks.com"}, {label: "Julie", value: "julie@dvhacks.com"}]
  }
handleChange = (e) => {
    if (["question", "type"].includes(e.target.className) ) {
      let questions = [...this.state.questions]
      questions[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ questions }, () => console.log(this.state.questions))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
handleQuestionChange = idx => e => {
  console.log(idx);
  const newQuestions = this.state.questions.map((question, qidx) => {
      if (idx !== qidx) return question;
      return { ...question, question: e.target.value };
    });

  this.setState({ questions: newQuestions });
}
addQuestion = () => {
    this.setState((prevState) => ({
      questions: [...prevState.questions, {question:"", type:"free_response"}],
    }));
  }
removeQuestion = (idx) => {
  this.setState({
    questions: this.state.questions.filter((q, qidx) => idx !== qidx)
  });
}
addUser = (user) => {
  this.setState({selectedUsers: [...this.state.selectedUsers, user]});
}
removeUser = (idx) => {
  this.setState({
    selectedUsers: this.state.selectedUsers.filter((u, uidx) => idx !== uidx)
  });
}
handleSubmit = (e) => { console.log(e); e.preventDefault() }
render() {
    let { questions, allUsers, userSearchQuery, selectedUsers} = this.state
    const rendered_questions = []
    for (const [index, value] of questions.entries()) {
      rendered_questions.push(
        <Form.Group controlId="formGroupQuestion" key={index}>
          <Form.Label>What could be improved about my ...?</Form.Label>
          <Form.Control as="select">
            <option value="communication_skills">Communication Skills</option>
            <option value="presentation_skills">Presentation Skills</option>
            <option value="time_management">Time Management</option>
            <option value="storytelling">Storytelling</option>
            <option value="leadership">Leadership</option>
            <option value="active_listening">Active Listening</option>
            <option value="ask_questions">Willingness to Ask Questions</option>
            <option value="work_ethic">Work Ethic</option>
            <option value="creativity">Creativity</option>
          </Form.Control>

          <Button onClick={() => this.removeQuestion(index)}>Remove Question</Button>
        </Form.Group>)
    }
    const selectedUserList =  selectedUsers.map((user, idx) => {
      return <div><li key={idx}>{user.label} {user.value}</li> <button onClick={()=>this.removeUser(idx)}>Remove</button></div>;
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formGroupTitle">
          <Form.Label>Form Title</Form.Label>
          <Form.Control size="lg" type="title" placeholder="Enter form title" />
        </Form.Group>
        <Form.Group controlId="formGroupFrequency">
          <Form.Label>Frequency</Form.Label>
            <Form.Control as="select">
              <option value="one_time">One Time</option>
              <option value="monthly">Monthly</option>
            </Form.Control>
        </Form.Group>
        { rendered_questions }
        <Button variant="secondary" type="button" onClick={this.addQuestion}>
          Add Question
        </Button>
        <Select
          value={userSearchQuery}
          options={allUsers}
          onChange={this.addUser}
          placeholder= "Search..."
          openMenuOnClick={false}
        />
        { selectedUserList }
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>

    )
  }
}
export default withRouter(RequestFeedback)
