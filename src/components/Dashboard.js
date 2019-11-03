import "./Dashboard.css"
import React, {Component} from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        // TODO: get the available skills for the given user
        
        this.state = {
            focusedSkill: "Communication skills",
        }
    };

<<<<<<< 643147873d800d5fd3f753598b1d16da0790cbf5
    handleSelect = (eventKey) => {
        this.setState({focusedSkill: eventKey});
    }

    render () {
        const skill1 = "Communication Skills";
        const skill2 = "Collaboration";
        const skill3 = "Work Ethic";
        
        return (
        <div className="wrapper">
            <div className="header">
                <div className="feedback-button">
                    <div className="feedback-content">
                        Give feedback
                    </div>
                </div>
                <div className="feedback-button">
                    <div className="feedback-content">
                        Request feedback
                    </div>
                </div>
            </div>
            <div className="dataPanel">
                <DropdownButton id="dropdown-basic-button" 
                                title={this.state.focusedSkill} 
                                onSelect={(evt) => this.handleSelect(evt)}>
                    <Dropdown.Item eventKey={skill1}>{skill1}</Dropdown.Item>
                    <Dropdown.Item eventKey={skill2}>{skill2}</Dropdown.Item>
                    <Dropdown.Item eventKey={skill3}>{skill3}</Dropdown.Item>
                </DropdownButton>
                <p> insert  G R A P H</p>
                <p> insert Scrolling stream of feedback comments</p>
            </div>
            <div className="actionPanel">
                <p>insert A C T I O N checklist</p>    
            </div>
=======
    render () {
        return (
        <div>
            <div className="header">
                <div className="feedback-button">
                    <div className="feedback-content">
                        Give feedback
                    </div>
                </div>
                <div className="feedback-button">
                    <div className="feedback-content">
                        Request feedback
                    </div>
                </div>
            </div>
            <p> hellow o rl d</p>
>>>>>>> begin making a header
        </div>
        );
    }
}

export default Dashboard;