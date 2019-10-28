import './App.css'
import React, { Component, Fragment } from 'react'
import DrawingForm from './components/DrawingForm'
import DrawingList from './components/DrawingList'
import Drawing from './components/Drawing'

export default class App extends Component {
  state = {}

  selectDrawing = drawing => {
    console.log('cliuck')
    this.setState({ selectedDrawing: drawing })
  }

  render() {
    let ctrl = (
      <Fragment>
        <DrawingForm />
        <DrawingList selectDrawing={this.selectDrawing} />
      </Fragment>
    )

    if (this.state.selectedDrawing) {
      ctrl = (
        <Drawing
          drawing={this.state.selectedDrawing}
          key={this.state.selectedDrawing.id}
        />
      )
    }

    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Our awesome drawing app</h2>
        </div>
        {ctrl}
      </div>
    )
  }
}
