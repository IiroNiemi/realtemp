import React, { Component } from 'react';
import './App.css';
import SmoothieComponent, { TimeSeries } from 'react-smoothie';
import io from 'socket.io-client';
import linkedin from './linkedin.svg';

const ts1 = new TimeSeries({});
const ts2 = new TimeSeries({
  resetBounds: true,
  resetBoundsInterval: 3000,
});



class App extends Component {
  constructor() {
    super();

    this.state = {
      data: 0
    };
  }

  componentDidUpdate(prevProps, prevState){

    let humidity = this.state.data.humidity;
    let temperature = this.state.data.temperature;
    
    var time = new Date().getTime();

    ts1.append(time, humidity);
    ts2.append(time, temperature);

}
  render() {
    return (
      <div className="App"> 
        <h1>Data</h1>
       
       <div>
        Humidity: {this.state.data.humidity}<br />
        <HumiComponent dataTs1={ts1} /><br></br>
        Temperature: {this.state.data.temperature}<br />
        <TempComponent dataTs2={ts2} />

        <FooterComponent />
       </div>
       
      </div>
    )
  }

  componentWillMount(){
    const socket = io();

    socket.on('firebase-data', (data) => 
    this.setState({data}));
  }
}

function HumiComponent(props){
  return (
    <SmoothieComponent
      responsive
      tooltip
      streamDelay={1500}
      minValue={0}
      maxValue={100}
      height={200}
      series={[
        {
          data: props.dataTs1,
          strokeStyle: { b: 255 },
          fillStyle: { b: 255 },
          lineWidth: 4,
        },
      ]}
    />
  );
};

function TempComponent(props){
  return (
    <SmoothieComponent
      responsive
      tooltip
      streamDelay={1500}
      minValue={0}
      maxValue={30}
      height={200}
      series={[
        {
          data: props.dataTs2,
          strokeStyle: { r: 255 },
          fillStyle: { r: 255 },
          lineWidth: 4,
        },
      ]}
    />
  );
};

function FooterComponent(){
  return(
    <div className="footer-wrapper">
    <div className="footer-info">
      <h3>Stack:</h3>
      <ls>
        <li>Arduino Yun + DHT22 sensor</li>
        <li>Google firebase 'realtime database'</li>
        <li>Websocket library 'Socket.IO'</li>
        <li>Chart used: <a href="http://smoothiecharts.org">Smoothiechart</a></li>
        <li>Deployed to Heroku</li>
      </ls>
      <p><i>Created by <a href="https://www.linkedin.com/in/iiniemi/" className="oma-linkki">Iiro Niemi 
        <img src={linkedin} alt="linkedin" className="linkedin-icon" style={{width: 20, height: 20}}></img></a></i>
      </p>
        
      
    </div>
    <div className="footer-background"></div>
    </div>
    
  )
}

export default App;
