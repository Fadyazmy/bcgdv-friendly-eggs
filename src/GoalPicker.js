import React, {Component} from "react";
import './GoalPicker.css';

class GoalPicker extends Component {

    constructor(props) {
        super(props);
        

        this.state = {
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            s6: false,
            s7: false,
            s8: false,
            s9: false,
            numClicked: 0,
            submitClicked: false,
        }
    };

    boxClick = (skillNum) => {
        if (skillNum === 1) {
            this.setState(
                {s1: this.state.s1 ? false : true,
                numClicked: !this.state.s1 ? this.state.numClicked+1 : this.state.numClicked-1}
            )
        }
        else if (skillNum === 2) {
            this.setState(
                {s2: this.state.s2 ? false : true,
                    numClicked: !this.state.s2 ? this.state.numClicked+1 : this.state.numClicked-1}
            )
        }
        else if (skillNum === 3) {
            this.setState(
                {s3: this.state.s3 ? false : true,
                    numClicked: !this.state.s3 ? this.state.numClicked+1 : this.state.numClicked-1}
            )
        }
        else if (skillNum === 4) {
            this.setState(
                {s4: this.state.s4 ? false : true,
                    numClicked: !this.state.s4 ? this.state.numClicked+1 : this.state.numClicked-1}
            )
        }
        else if (skillNum === 5) {
            this.setState(
                {s5: this.state.s5 ? false : true,
                    numClicked: !this.state.s5 ? this.state.numClicked+1 : this.state.numClicked-1}
            )
        }
        else if (skillNum === 6) {
            this.setState(
                {s6: this.state.s6 ? false : true,
                    numClicked: !this.state.s6 ? this.state.numClicked+1 : this.state.numClicked-1}
            )
        }
        else if (skillNum === 7) {
            this.setState(
                {s7: this.state.s7 ? false : true,
                    numClicked: !this.state.s7 ? this.state.numClicked+1 : this.state.numClicked-1}
            )
        }
        else if (skillNum === 8) {
            this.setState(
                {s8: this.state.s8 ? false : true,
                    numClicked: !this.state.s8 ? this.state.numClicked+1 : this.state.numClicked-1}
            )
        }
        else if (skillNum === 9) {
            this.setState(
                {s9: this.state.s9 ? false : true,
                    numClicked: !this.state.s9 ? this.state.numClicked+1 : this.state.numClicked-1}
            )
        }
    }

    submitClick = () => {
        // TODO: send to database
        if (this.state.numClicked === 3) {
            this.setState({submitClicked: true})
        }
        
    }

    render() {
        
        const clickedColor = "#d47c5f";
        const defaultColor = "#595a5c";
        const sReady = "#d47c5f";
        const sDefault = "#b5b5b5";
        let c = this.state.s1 ? clickedColor : defaultColor;
        let submitC = (this.state.numClicked === 3) ? sReady : sDefault;
        let borderCode = this.state.submitClicked ? "2px solid white" : "";
        return (
            <div className="wrapper">
                <div className="title">
                    <h1>Hi there, select 3 goals for improvement</h1>
                </div>
                <div className="skills">
                    {/* row 1 */}
                    <div className="square"
                    onClick={() => this.boxClick(1)}>
                        <div className="content" 
                            style={{color: this.state.s1 ? clickedColor : defaultColor}}>
                            Communication skills
                        </div>
                    </div>
                    <div className="square"
                    onClick={() => this.boxClick(2)}>
                        <div className="content"
                            style={{color: this.state.s2 ? clickedColor : defaultColor}}>
                            Presentation skills
                        </div>
                    </div>
                    <div className="square"
                    onClick={() => this.boxClick(3)}>
                        <div className="content"
                            style={{color: this.state.s3 ? clickedColor : defaultColor}}>
                            Collaboration
                        </div>
                    </div>

                    {/* row 2 */}
                    <div className="square"
                    onClick={() => this.boxClick(4)}>
                        <div className="content"
                            style={{color: this.state.s4 ? clickedColor : defaultColor}}>
                            Time management
                        </div>
                    </div>
                    <div className="square"
                    onClick={() => this.boxClick(5)}>
                        <div className="content"
                            style={{color: this.state.s5 ? clickedColor : defaultColor}}>
                            Storytelling
                        </div>
                    </div>
                    <div className="square"
                    onClick={() => this.boxClick(6)}>
                        <div className="content"
                            style={{color: this.state.s6 ? clickedColor : defaultColor}}>
                            Leadership
                        </div>
                    </div>

                    {/* row 3 */}
                    <div className="square"
                    onClick={() => this.boxClick(7)}>
                        <div className="content"
                            style={{color: this.state.s7 ? clickedColor : defaultColor}}>
                            Active Listening
                        </div>
                    </div>
                    <div className="square"
                    onClick={() => this.boxClick(8)}>
                        <div className="content"
                            style={{color: this.state.s8 ? clickedColor : defaultColor}}>
                            Willingness to ask questions
                        </div>
                    </div>
                    <div className="square"
                    onClick={() => this.boxClick(9)}>
                        <div className="content"
                            style={{color: this.state.s9 ? clickedColor : defaultColor}}>
                            Work ethic
                        </div>
                    </div>

                </div>
                <div className="centerSubmit"
                onClick={() => this.submitClick()}>
                    <div className="submit"
                        style={{backgroundColor: submitC, border: borderCode}}>
                        Submit
                    </div>
                </div>
            </div>
        );
    }
}

export default GoalPicker;
