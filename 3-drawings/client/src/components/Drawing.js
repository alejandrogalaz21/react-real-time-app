import React, { Component } from 'react'
import Canvas from 'simple-react-canvas'
import { publishLine } from './../api'

export class Drawing extends Component {
  /**
   *
   * @memberof Drawing
   */
  handleDraw = line => {
    const data = { drawingId: this.props.drawing.id, line }
    publishLine(data)
  }

  render() {
    return this.props.drawing ? (
      <div className='Drawing'>
        <div className='Drawing-title'>{this.props.drawing.name}</div>
        <Canvas onDraw={this.handleDraw} drawingEnabled={true} />
      </div>
    ) : null
  }
}

export default Drawing
