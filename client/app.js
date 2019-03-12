import React from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import Calendar from './startDate.js'
import {Navbar, Container, Row, Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
      date: null,
      focused: null,
      data: {},
      options: {
        theme: 'dark',
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Bitcoin Price (USD)",
          fontFamily: "Roboto",
          fontSize: 20,
        }
      }
    }
  }

  componentDidMount () {
    axios.get('/bitcoin')
    .then((payload) => {
      console.log('today\'s data', payload.data.bpi)
    })
    .catch((err) => console.log('error in axios request', err))

    axios.get('/bitHistory')
    .then((payload) => {
      let month = payload.data.bpi;
      let labels = [];
      let prices = [];
      for (let day in month) {
        labels.push(day);
        prices.push(month[day])
      }
      let data = {
        labels: labels,
        datasets: [{
          label: 'Price (USD)',
          fill: 'false',
          backgroundColor: 'rgb(60, 68, 76)',
          borderColor: 'rgb(60, 68, 76)',
          borderWidth: 3,
          data: prices,
        }]
      }
      return data
    })
    .then((data) => {
      this.setState({
        data: data
      })
    })
    .catch((err) => console.log('error in axios request ', err))
  }


  render() {
    return (
    <div>
    <div>
        <Navbar bg="success" className="justify-content-center">
          <Navbar.Brand href="#home">
            <h2>Navigate Bitcoin Prices</h2>
          </Navbar.Brand>
        </Navbar>
      </div>



      <div>
        <Line 
         data={this.state.data}
         options={this.state.options}
         height={500}
         width={700}/>
      </div>
      <div className="calendars" className="justify-content-center">
      <Container className="justify-content-center">
      <Row className="justify-content-md-center">
      <Col md="auto">
        <Calendar/>
        <Button variant="success">Select Dates</Button>
      </Col>
      </Row>
      </Container>
      </div>
    </div>
    )
  }
}
export default App;
