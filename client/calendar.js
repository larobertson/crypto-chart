import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import {CardDeck, Card} from 'react-bootstrap';

import Helmet from 'react-helmet';

import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
    };
  }
  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }
  handleDayClick(day) {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day,
      });
    }
  }
  handleDayMouseEnter(day) {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  }
  handleResetClick() {
    this.setState(this.getInitialState());
  }
  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.state.from };
    const selectedDays = [from, { from, to: enteredTo }];
    return (
      <div>
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Header className="bg-success" text="white">Select Dates</Card.Header>
              <Card.Text>
                <DayPicker
                  className="Range"
                  numberOfMonths={2}
                  fromMonth={from}
                  selectedDays={selectedDays}
                  disabledDays={disabledDays}
                  modifiers={modifiers}
                  onDayClick={this.handleDayClick}
                  onDayMouseEnter={this.handleDayMouseEnter}
                />
              </Card.Text>
            </Card.Body>
        <div>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from &&
            to && (
              <Card.Footer>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Button variant="success" onClick={this.handleResetClick}>Reset</Button>
                </Col>
                <Col md="auto">
                  <Button
                  variant="success"
                  onClick={() => {this.props.click(this.state.to, this.state.from)}}>Select Dates</Button>
                </Col>
              </Row>
              </Card.Footer>
            

            )}
        </div>
        </Card>
        </CardDeck>
        <Helmet>
          <style>{`
  .Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Range .DayPicker-Day {
    border-radius: 0 !important;
  }
`}</style>
        </Helmet>
      </div>
    );
  }
}