import React, { Component } from "react"
import { subscribeToTimer } from "./api"

export default class App extends Component {
  constructor(props) {
    super(props)
    subscribeToTimer(timesstamp => this.setState({ timesstamp }))
  }

  state = {
    timesstamp: "no time stamp"
  }
  render() {
    return <div>{this.state.timesstamp}</div>
  }
}
