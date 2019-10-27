import React, { Component } from 'react'
import { subscribeToDrawings } from '../api'

export class DrawingList extends Component {
  state = {
    drawings: []
  }

  constructor(props) {
    super(props)

    subscribeToDrawings(drawing => {
      this.setState(prevState => ({
        drawings: [...prevState.drawings, drawing]
      }))
    })
  }

  render() {
    const { drawings } = this.state
    const drawingsList = drawings.map(drawing => (
      <li className='DrawingList-item' key={drawing.id}>
        {drawing.name}
      </li>
    ))
    return <ul className='DrawingList'>{drawingsList}</ul>
  }
}

export default DrawingList
