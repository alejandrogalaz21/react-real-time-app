import './App.css'
import React, { Component } from 'react'
import DrawingForm from './components/DrawingForm'
import DrawingList from './components/DrawingList'

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Our awesome drawing app</h2>
        </div>
        <DrawingForm />
        <DrawingList />
      </div>
    )
  }
}
