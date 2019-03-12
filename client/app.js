import React from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import Calendar from './calendar.js'
import {Navbar, Container, Row, Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import moment from 'moment';

const header = {
  borderBottom: 'black',
  paddingBottom: '30px'
}

const footer = {
  marginTop: '40px',
  paddingTop: '30px',
  paddingBottom: '30px',
  borderTop: '1px solid green',
  fontSize: '10px',
  color: 'black'
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
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

  handleClick (to, from) {
    let fromRequest = moment(from, "LLLL").format("YYYY-MM-DD")
    let toRequest = moment(to, "LLLL").format("YYYY-MM-DD")
    this.setState({
      from: fromRequest,
      to: toRequest
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if ((this.state.to !== prevState.to) || (this.state.from !== prevState.from)){
      axios.get('/bitDates', {
        params: {
          from: this.state.from,
          to: this.state.to
        }
      })
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
  }


  render() {
    return (
    <div>
    <div>
        <Navbar bg="success" style={header} className="justify-content-center">
          <Navbar.Brand href="#home">
            <h2 text="white">Navigate Bitcoin Prices</h2>
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
            <Calendar click={this.handleClick.bind(this)}/>
          </Col>
        </Row>
      </Container>
      </div>

      <Navbar bg="light" style={footer} className="footer">
            <a href="https://www.coindesk.com/price/bitcoin">
            “Powered by CoinDesk”
            </a>
      </Navbar>
    </div>
    )
  }
}
export default App;
