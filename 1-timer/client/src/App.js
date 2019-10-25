import React, { Component } from "react"
import { subscribeToTimer } from "./api"

export default class App extends Component {
  state = {
    timestamp: "no timestamp"
  }

  constructor(props) {
    super(props)
    subscribeToTimer(timestamp => this.setState({ timestamp }))
  }

  render() {
    return (
      <div>
        This is the value of the timer timestamp : {this.state.timestamp}
      </div>
    )
  }
}
