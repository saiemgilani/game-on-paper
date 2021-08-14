import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
let weekData = require('../assets/schedule.json'); 

let range = (start, end) => Array.from(Array(end + 1).keys()).slice(start); 
let yrRange = range(2002, 2021).reverse();

export default function SeasonSelect(props) {
    const [season, setSeason] = useState(props.season || 2021);  
    const [weekComposite, setWeekComposite] = useState(props.week || "2;-1");
    const [week, setWeek] = useState(-1)
    const [seasonType, setSeasonType] = useState(2)

    let handleSeasonChange = (e) => {
        e.preventDefault()
        setSeason(e.target.value)
        setWeekComposite("2;-1")
        populateWeekSelect()
    }

    let handleWeekChange = (e) => {
        e.preventDefault()
        setWeekComposite(e.target.value)

        var cleanWeekItems = weekComposite.split(';')
        setSeasonType(cleanWeekItems[0])
        setWeek(cleanWeekItems[1])
    }

    let handleSubmit = () => {
        props.callback(season, seasonType, week)
    }

    let clearSelect = (id) => {
        var select = document.getElementById(id);
        var length = select.options.length;
        for (var i = length-1; i >= 0; i--) {
            if (parseInt(select.options[i].value) != -1) {
                select.options[i] = null;
            }
        }
        select.selectedIndex = 0;
    }

    let populateWeekSelect = () => {
        clearSelect("weekSelect")
        console.log("Selected year: " + season);
        if (parseInt(season) != -1) {
            console.log("is valid yr");
            if (season == null) {
                season = keys[keys.length - 1];
                console.log("edited yr bc null: " + season);
            }
            let selWeeks = weekData[`${season}`] || [];
            console.log("avail weeks: " + selWeeks.length);
            let weekSelect = document.getElementById("weekSelect");
            
            var selIndex = -1;
            selWeeks.forEach((wk, idx) => {
                console.log("adding week" + wk.label);
                if (!wk.label.includes("Bowls")) {
                    var option = document.createElement("option");
                    option.text = wk.label;
                    option.value = `${wk.type};${wk.value}`
                    if (parseInt(seasonType) == parseInt("2") && parseInt(week) == parseInt(wk.value)) {
                        selIndex = idx + 1;
                    }
                    
                    weekSelect.add(option);
                }
            })

            var option = document.createElement("option");
            option.text = "Bowls";
            option.value = `3;1`
            if (parseInt(seasonType) == parseInt("3")) {
                selIndex = (selWeeks.length - 1) + 1;
            }
            weekSelect.add(option);

            weekSelect.selectedIndex = selIndex;
        }
    }

    return (
        <Form id="dropdown-form" className="gx-3 row-cols-sm-auto mb-3 align-items-center form-picker" onSubmit={handleSubmit}>
            <Row>
                <Col xs="auto">
                    <Form.Select size="lg" id="yearSelect" onChange={handleSeasonChange} value={season}>
                        {yrRange.map((yr) => <option key={yr} value={yr}>{yr}</option>)}
                    </Form.Select>
                </Col>
                <Col xs="auto">
                    <Form.Select size="lg" id="weekSelect" onChange={handleWeekChange} value={weekComposite}>
                        <option value="-1">Choose Week...</option>
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