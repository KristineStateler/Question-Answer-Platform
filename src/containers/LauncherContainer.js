import React, { Component } from 'react';

class LauncherContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      launcherInfo: {}
    }
  }

  componentDidMount(){
    let launcherId = this.props.params.id
    fetch(`/api/v1/launchers/${launcherId}`)
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(launcher => {
      this.setState({ launcherInfo: launcher})
    })
  }

  render(){
    return(
        <div>
            <h3>{this.state.launcherInfo.name}</h3>
            <h3>{this.state.launcherInfo.bio}</h3>
          </div>

    )
  }
}

export default LauncherContainer;
