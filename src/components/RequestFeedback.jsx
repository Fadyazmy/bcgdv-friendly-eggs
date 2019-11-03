import React from "react";
import Select from "react-select";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { faUserPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "../firebase";
import { UserContext } from "../providers/UserProvider";

class RequestFeedback extends React.Component {
  state = {
    questions: [{ skill: "" }],
    title: "",
    question_list: [],
    frequency: "",
    selectedUsers: [],
    userSearchQuery: "",
    allUsers: [
      { label: "Fadi", value: "fadi_user_id" },
      { label: "Matan", value: "matan_user_id" },
      { label: "Jacqui", value: "jacqui_user_id" },
      { label: "Julie", value: "julie_user_id" }
    ]
  };
  static contextType = UserContext

  handleQuestionChange = (event) => {
    this.setState({question_list: [...this.state.question_list, event]});
    console.log("question_list: ", this.state.question_list);
  }

  handleChange = event => {
    const { name, value } = event.target;
    console.log("[name]: ", name, "value: ", value)
    this.setState({ [name]: value });
  };

  addQuestion = () => {
    this.setState(prevState => ({
      questions: [
        ...prevState.questions,
        { question: "", type: "free_response" }
      ]
    }));
  };

  removeQuestion = idx => {
    this.setState({
      questions: this.state.questions.filter((q, qidx) => idx !== qidx)
    });
  };

  addUser = user => {
    this.setState({ selectedUsers: [...this.state.selectedUsers, user] });
  };

  removeUser = idx => {
    this.setState({
      selectedUsers: this.state.selectedUsers.filter((u, uidx) => idx !== uidx)
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, frequency, selectedUsers, question_list} = this.state;
    console.log("frequency: ", frequency, "selectedUsers: ". selectedUsers, "questions: ", question_list );
    
    let sender = {
      type: 'solicited',
      title, 
      frequency, 
      selectedUsers,
      question_list
    }

    let reciever  = {
      type: 'requested',
      title, 
      frequency, 
      selectedUsers,
      question_list
    }

    console.log("this.context: ", this.context)
    firestore.doc(`/users/${this.context.id}`).collection('forms').add(sender);
    this.state.selectedUsers.forEach((obj)=> {
      console.log("SENDING", `/users/${obj.value}`);
      firestore.doc(`/users/${obj.value}`).collection('forms').add(reciever);
    })
  };

  render() {
    let { questions, allUsers, userSearchQuery, selectedUsers } = this.state;
    const rendered_questions = [];
    
    console.log("selectedUsers: ", this.state.selectedUsers);

    for (let [index, value] of questions.entries()) {
      rendered_questions.push(
        <Form.Group onChange={e =>  this.handleQuestionChange(e.target.value)} controlId="formGroupQuestion" key={index}>
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

          {/* Remove answer */}
          <Button onClick={() => this.removeQuestion(index)}>
            Remove Question
          </Button>
        </Form.Group>
      );
    }

    const selectedUserList = selectedUsers.map((user, idx) => {
      return (
        <div key={idx} style={{ paddingBottom: "10px" }}>
          <li key={idx}>
            {user.label} 
          </li>{" "}
          <button onClick={() => this.removeUser(idx)}>Remove</button>
        </div>
      );
    });

    return (
      <Form
        style={{ width: "800px", margin: "auto" }}
        onSubmit={this.handleSubmit}
      >
        <Form.Group controlId="formGroupTitle">
          <Form.Label style={{fontSize: '30px'}}> Feedback topic</Form.Label>
          <Form.Control name="title" onChange={this.handleChange} size="lg" type="title" placeholder="e.g: My roadmap presentation to Morgan Stanley on Tuesday (6th of Oct)" />
        </Form.Group>
        <Form.Group controlId="formGroupFrequency">
          <Form.Label>Frequency of feedback request</Form.Label>
          <Form.Control name="frequency" onChange={this.handleChange} as="select">
            <option value="one_time">Once</option>
            <option value="monthly">Monthly</option>
          </Form.Control>
        </Form.Group>
        <p> Form questions </p>
        <div>
          Add Question{" "}
          <i className="fas fa-plus">
            <FontAwesomeIcon
              icon={faPlus}
              style={{ color: "blue" }}
              onClick={this.addQuestion}
            />
          </i>
        </div>

        {rendered_questions}
        <Select
          value={userSearchQuery}
          options={allUsers}
          onChange={this.addUser}
          placeholder="Search..."
          openMenuOnClick={false}
        />
        <div style={{ paddingBottom: "5px" }}>{selectedUserList}</div>
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}
export default withRouter(RequestFeedback);
