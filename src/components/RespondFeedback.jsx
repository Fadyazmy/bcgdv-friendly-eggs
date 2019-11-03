import React from "react";
import Select from "react-select";
import { Form, Button, Accordion, Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { faUserPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "../firebase";
import { UserContext } from "../providers/UserProvider";

class RespondFeedback extends React.Component {
  state = {
    loaded: false,
    requests: [],
    responses: {}
  };
  static contextType = UserContext;

  unsubscribeFromPost = null;
  unsubscribeFromComments = null;
  // Get where /users/{user_id}/ where type === 'unsolicited' && status !== "completed"

  collectIdsAndDocs = doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  };

  //   componentDidMount = async () => {
  //     this.unsubscribeFromPost = firestore.doc(`users/${this.context.id}`).onSnapshot(snapshot => {
  //       const requests = this.collectIdsAndDocs(snapshot);
  //       this.setState({ requests, loaded: true });
  //     });
  //   };

  handleSubmit = e => {
    e.preventDefault();
    const { title, frequency, selectedUsers, question_list } = this.state;
    console.log(
      "frequency: ",
      frequency,
      "selectedUsers: ".selectedUsers,
      "questions: ",
      question_list
    );

    let sender = {
      type: "solicited",
      title,
      frequency,
      selectedUsers,
      question_list
    };

    let reciever = {
      type: "requested",
      title,
      frequency,
      selectedUsers,
      question_list
    };

    console.log("this.context: ", this.context);
    firestore
      .doc(`/users/${this.context.id}`)
      .collection("forms")
      .add(sender);
    this.state.selectedUsers.forEach(obj => {
      console.log("SENDING", `/users/${obj.value}`);
      firestore
        .doc(`/users/${obj.value}`)
        .collection("forms")
        .add(reciever);
    });
  };

  handleRatingChange = event => {
    const { name, value } = event.target;
    // name = 0
    let obj = this.state.responses;
    let index = name.split('-')[0];
    let skill = name.split('-')[1];
    let uid = name.split('-')[2];
    let title = name.split('-')[3];

    if(obj[index] == undefined){
        obj[index] = {};
    }

    obj[index].rating = value;
    obj[index].skill = skill;
    obj[index].uid = uid;
    obj[index].title = title;

    this.setState({ responses: obj });
  };

  handleResponseChange = event => {
    const { name, value } = event.target;
    // name = 0
    /**
     * [comms, writing, ]
     */

    let obj = this.state.responses;
    let index = name.split('-')[0];
    let skill = name.split('-')[1];
    let uid = name.split('-')[2];
    let title = name.split('-')[3];
    if(obj[index] == undefined){
        obj[index] = {};
    }
    obj[index].responses = value;
    obj[index].skill = skill;
    obj[index].uid = uid;
    obj[index].title = title;

    // console.log("index: ", index, "val: ", value)
    this.setState({ responses: obj });
  };

  handleSubmit = event => {
    event.preventDefault();

    // this.state.selectedUsers.forEach((obj)=> {
    //     console.log("SENDING", `/users/${obj.value}`);
    //     firestore.doc(`/users/${obj.value}`).collection('forms').add(reciever);
    //   })

    console.log("[this.state.responses]: ", this.state.responses);
    for (var resp in this.state.responses){
        let rating = this.state.responses[resp].rating;
        let text = this.state.responses[resp].responses;
        // console.log("resp:::: ", this.state.responses[resp]);
        // console.log("SENDING TO: ", this.state.responses[resp].uid, 'rating: ', rating, 'TEXT: ', text)
        let obj = {
            rating,
            text
        }
        firestore.doc(`/users/${this.state.responses[resp].uid}`).collection('responses').doc(this.state.responses[resp].skill).set(obj);
        
        // update question has been answered
        // firestore.doc(`/users/${this.state.responses[resp].uid}`).collection('responses').doc(this.state.responses[resp].skill).set(obj);
        // let uid = this.state.responses[resp].uid
        // firestore
        // .doc(`users/${this.context.id}`)
        // .collection("forms").where('title', '==', this.state.responses[resp].title).get().then(function(querySnapshot) {
        //     // .update({answered: true})
        //     querySnapshot.forEach(function(doc) {
        //         firestore.doc(`users/${uid}`).collection("forms").doc(doc.id).update({answered: true});
        //     });
        // })

    }
    // this.state.responses.map((resp) =>{
    //     // add skill
    //     let rating = resp.rating;
    //     let text = resp.responses;
    //     let obj = {
    //         rating,
    //         text
    //     }
    //     firestore.doc(`/users/${resp.uid}`).collection('responses').doc(resp.skill).add(obj);

    //     // firestore.doc(`/users/${resp.uid}/responses/${resp.skill}`).collection('forms').add(reciever);
    // });

  };

  render() {
    let { questions, allUsers, userSearchQuery, selectedUsers } = this.state;
    const rendered_questions = [];

    if (this.context && this.context.id && !this.state.loaded) {
      console.log("this.context.id: ", this.context.id);
      firestore
        .doc(`users/${this.context.id}`)
        .collection("forms").where('answered', '==', false)
        .onSnapshot(snapshot => {
          // const requests = this.collectIdsAndDocs(snapshot);
          let requests = snapshot.docs.map(this.collectIdsAndDocs);
          // console.log("SNAPSHOT: ", snapshot.docs.map(this.collectIdsAndDocs));
          this.setState({ requests, loaded: true });
        });
    }

    console.log("this.state.responses: ", this.state.responses);

    return (
      <div>
        <h2 style={{ margin: "20px" }}>
          Your colleages have asked for your help
        </h2>
        <Accordion>
          {this.state.requests.map((req,id) => {
          {/* {[{title: 'gd', skill: 'writing', uid: '3587bb443'},{title: 'gd', skill: 'speaking', uid: '3587gg443'},{title: 'gd', skill: 'speaking', uid: '3587ff443'},{title: 'gd', skill: 'speaking', uid: '35874rr43'}].map((req,id) => { */}

            return (
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={id}>
                    {req.title}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={id}>
                  <Form onSubmit={this.handleSubmit} style={{margin: '20px'}}>
                  <Form.Group onChange={this.handleRatingChange} controlId="exampleForm.ControlSelect1">
                        <Form.Label>Skill score</Form.Label>
                        <Form.Control name={id+'-' + req.skill+'-'+req.uid+ '-'+req.title} as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </Form.Control>
                    </Form.Group>
                  <Form.Group onChange={this.handleResponseChange} controlId="exampleForm.ControlTextarea1">
                        <Form.Label> Text response</Form.Label>
                        <Form.Control name={id + '-' + req.skill+'-' + req.uid+ '-'+ req.title} as="textarea" rows="3" />
                  </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
      </div>
    );
  }
}
export default withRouter(RespondFeedback);
