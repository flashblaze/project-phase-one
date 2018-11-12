import React, { Component } from "react";

class INKVideo extends Component {
  state = {};

  render() {
    return (
      <div className="uploaded-videos">
        <video controls={true} width="50%" height="50%">
          <source src={this.props.src} />
        </video>
      </div>
    );
  }
}

export default INKVideo;
