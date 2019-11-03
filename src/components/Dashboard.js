import "./Dashboard.css"
import React, {Component} from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, Form} from 'react-bootstrap';


import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

const data = [
    {
        name: 'Jan \'17',
        monthly_avg: 2,
        amt: 2400
    }, {
        name: 'Feb \'17',
        monthly_avg: 1,
        amt: 2210
    }, {
        name: 'Mar \'17',
        monthly_avg: 2,
        amt: 2290
    }, {
        name: 'Apr \'17',
        monthly_avg: 3,
        amt: 2000
    }, {
        name: 'May \'17',
        monthly_avg: 3,
        amt: 2181
    }, {
        name: 'Jun \'17',
        monthly_avg: 3.5,
        amt: 2500
    }, {
        name: 'Jul \'17',
        monthly_avg: 4,
        amt: 2100
    },
];


class Dashboard extends Component {

    constructor(props) {
        super(props);

        // TODO: get the available skills for the given user

        this.state = {
            focusedSkill: "Communication skills"
        }
    };


    handleSelect = (eventKey) => {
        this.setState({focusedSkill: eventKey});
    }

    render() {
        const skill1 = "Communication Skills";
        const skill2 = "Collaboration";
        const skill3 = "Work Ethic";

        return (
            <div className="wrapper">
                <div className="dataPanel">
                    <DropdownButton id="dropdown-basic-button"
                        title={
                            this.state.focusedSkill
                        }
                        onSelect={
                            (evt) => this.handleSelect(evt)
                    }>
                        <Dropdown.Item eventKey={skill1}>
                            {skill1}</Dropdown.Item>
                        <Dropdown.Item eventKey={skill2}>
                            {skill2}</Dropdown.Item>
                        <Dropdown.Item eventKey={skill3}>
                            {skill3}</Dropdown.Item>
                    </DropdownButton>
                    <div style={
                        {
                            paddingLeft: '60px',
                            paddingRight: '60px'

                        }
                    }>
                        <div style={
                            {
                                backgroundColor: 'white',
                                padding: '20px',
                                paddingLeft: '120px',
                                display: 'flex',
                                flexFlow: 'row',
                                alignItems: 'center'
                            }
                        }>
                            <div>

                                <div style={
                                    {fontSize: '90px'}
                                }>
                                    3.5
                                </div>
                                <div>
                                    <span style={
                                        {
                                            color: 'green',
                                            fontWeight: 'bold'
                                        }
                                    }>+0.3</span>
                                    since March (3 months)
                                </div>
                            </div>
                            <LineChart width={500}
                                height={300}
                                data={data}
                                margin={
                                    {
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }
                            }>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Line type="monotone" dataKey="monthly_avg" stroke="#8884d8"
                                    activeDot={
                                        {r: 8}
                                    }/>
                            </LineChart>
                        </div>
                    </div>
                    <div style={
                        {
                            paddingLeft: '60px',
                            paddingRight: '60px'
                        }
                    }>
                        <h2 style={
                            {marginTop: '20px'}
                        }>
                            Feedback
                        </h2>
                        {/* 
    flex: auto;
    max-width: 100%!important;
 */}

                        <div>
                            <div class="row"
                                style={
                                    {
                                        width: '50%',
                                        backgroundColor: 'white',
                                        maxWidth: '100%!important',
                                        flex: 'auto'
                                    }
                            }>
                                <div style={
                                    {margin: '12px'}
                                }>
                                    <h3>
                                        Communication
                                    </h3>
                                    <small>Hey Jessica! I think you are an amazing speaker, one thing I would suggest is to take small pauses to let the audience process the information. It's a powerful tool I find.</small>
                                    <small class="smallest mute">
                                        <strong style={{fontSize: '15px'}}>
                                            - Matan
                                        </strong>
                                    </small>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                        <div class="row"
                                style={
                                    {
                                        width: '50%',
                                        backgroundColor: 'white',
                                        maxWidth: '100%!important',
                                        flex: 'auto'
                                    }
                            }>
                                <div style={
                                    {margin: '12px'}
                                }>
                                    <h3>
                                        Communication
                                    </h3>
                                    <small>Hey Jessica! I think you are an amazing speaker, one thing I would suggest is to take small pauses to let the audience process the information. It's a powerful tool I find.</small>
                                    <small class="smallest mute">
                                        <strong style={{fontSize: '15px'}}>
                                            - Jacqui
                                        </strong>
                                    </small>
                                </div>
                            </div>
                        </div>
 */}

                    </div>
                </div>
                <div className="actionPanel">
                    <div style={
                        {margin: '40px'}
                    }>
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check label="Watch Will Smith inspiration video" type="checkbox"/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check label="Read 12 tips to be more productive at work" type="checkbox"/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check label="Watch Lynda video about presentation" type="checkbox"/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check label="Message Emily for coffee to talk about improving communication" type="checkbox"/>
                            </Form.Group>
                        </Form>
                    </div>
                    {/* <p>insert A C T I O N checklist</p> */} </div>
            </div>
        );
    }
}

export default Dashboard;
