import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
const weekData = require('../assets/schedule.json'); 
const availYearKeys = Object.keys(weekData).reverse(); 

let range = (start, end) => Array.from(Array(end + 1).keys()).slice(start); 
let yrRange = range(2002, 2021).reverse();

export default class SeasonSelect extends React.Component {
    state = {}

    constructor(props) {
        super(props)
        this.state = {
            season: 2021,
            weekComposite: "2;-1",
            week: -1,
            seasonType: 2,
            weekOptions: this.populateWeekSelect(2021)
        }
    };

    updateWeekComposite(result) {
        var cleanWeekItems = result.split(';')
        console.log(result)
        this.setState({
            weekComposite: result,
            week: cleanWeekItems[1],
            seasonType: cleanWeekItems[0]
        })
    };

    handleWeekChange(e) {
        // e.preventDefault()
        updateWeekComposite(e.target.value)
    };

    handleSubmit(e) {
        e.preventDefault()
        props.callback(this.state.season, this.state.seasonType, this.state.week)
    };

    populateWeekSelect(szn) {
        var options = []
        // clearSelect("weekSelect")
        console.log("Selected year: " + szn);
        if (parseInt(szn) != -1) {
            console.log("is valid yr");
            if (szn == null) {
                szn = availYearKeys[availYearKeys.length - 1];
                console.log("edited yr bc null: " + szn);
            }
            let selWeeks = weekData[`${szn}`] || [];
            console.log("avail weeks: " + selWeeks.length);
            // let weekSelect = document.getElementById("weekSelect");
            
            // var selIndex = -1;
            selWeeks.forEach((wk, idx) => {
                console.log("adding week: " + wk.label);
                if (!wk.label.includes("Bowls")) {
                    let text = wk.label;
                    let value = `${wk.type};${wk.value}`
                    
                    options.push(<option key={value} value={value}>{text}</option>);
                }
            })

            options.push(<option key="3;1" value="3;1">Bowls</option>);
        }
        return options;
    };

    handleSeasonChange(e) {
        // e.preventDefault()
        updateWeekComposite("2;-1")
        this.setState({
            season: e.target.value,
            weekOptions: this.populateWeekSelect(this.state.season)
        })
    };

    render() {
        return (
            <Form id="dropdown-form" className="gx-3 row-cols-sm-auto mb-3 align-items-center form-picker" onSubmit={this.handleSubmit}>
                <Row>
                    <Col xs="auto">
                        <Form.Select size="lg" id="yearSelect" onChange={this.handleSeasonChange} value={this.state.season}>
                            {yrRange.map((yr) => <option key={yr} value={yr}>{yr}</option>)}
                        </Form.Select>
                    </Col>
                    <Col xs="auto">
                        <Form.Select size="lg" id="weekSelect" onChange={this.handleWeekChange} value={this.state.weekComposite}>
                            <option value="-1">Choose Week...</option>
                            {this.state.weekOptions}
                        </Form.Select>
                    </Col>
                    <Col xs="auto" className="mb-xs-3 mb-sm-0">
                        <Button size="lg" variant="primary" type="submit">
                            View
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}