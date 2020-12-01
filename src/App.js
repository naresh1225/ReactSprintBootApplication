import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FirstComponent from './components/learning-examples/FirstComponent'
import ThirdComponent from './components/learning-examples/ThirdComponent'
import Counter from './components/counter/Counter'
import PatientApp from './components/patient/PatientApp'
// import PatientInfo from './co'
import './bootstrap.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Counter /> */}
        <PatientApp/>
      </div>
    );
  }
}


export default App;
