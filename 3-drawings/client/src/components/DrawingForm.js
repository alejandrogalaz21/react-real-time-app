import React, { Component } from 'react'
import { createDrawing } from '../api'

export class DrawingForm extends Component {
  state = {
    drawingName: ''
  }

  /**
   *
   * @memberof DrawingForm
   * @description handle the changes of the input's and
   * set the value in the estate.
   */
  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  /**
   *
   * @memberof DrawingForm
   * @description handle the changes of the input and
   * set the value in the estate.
   */
  handleInput = event =>
    this.setState({ [event.target.name]: event.target.value })

  /**
   *
   * @memberof DrawingForm
   * @description handle the submit form
   * and clean the state.
   */
  handleSubmit = event => {
    event.preventDefault()
    const { drawingName } = this.state
    createDrawing(drawingName)
    this.setState({ drawingName: '' })
  }

  render() {
    const { drawingName } = this.state
    return (
      <div className='Form'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='drawingName'
            value={drawingName}
            onChange={this.handleInput}
            placeholder='Drawing name'
            className='Form-drawingInput'
            required
          />
          <button type='submit' className='Form-drawingInput'>
            Create
          </button>
        </form>
      </div>
    )
  }
}

export default DrawingForm
