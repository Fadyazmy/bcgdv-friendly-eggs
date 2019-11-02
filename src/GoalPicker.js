import React, {Component} from "react";
import './GoalPicker.css';

class GoalPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    };

    render() {
        return (
            <div className="wrapper">
                <div className="title">
                    <h1>Hi there, select your top 3 goals for improvement</h1>
                </div>
                <div className="skills">
                    <div className="square">
                        <div className="content">
                            Communication skills
                        </div>
                    </div>
                    <div className="square">
                        <div className="content">
                            Presentation skills
                        </div>
                    </div>
                    <div className="square">
                        <div className="content">
                            Collaboration
                        </div>
                    </div>

                    {/* row 2 */}
                    <div className="square">
                        <div className="content">
                            Time management
                        </div>
                    </div>
                    <div className="square">
                        <div className="content">
                            Storytelling
                        </div>
                    </div>
                    <div className="square">
                        <div className="content">
                            Leadership
                        </div>
                    </div>
                    <div className="square">
                        <div className="content">
                            Active Listening
                        </div>
                    </div>
                    <div className="square">
                        <div className="content">
                            Willingness to ask questions
                        </div>
                    </div>
                    <div className="square">
                        <div className="content">
                            Work ethic
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default GoalPicker;
