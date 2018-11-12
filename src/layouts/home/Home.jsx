import React, { Component } from "react";
import {
  applicationID,
  applicationKey,
  API_PATH
} from "../../keys/bigchaindbKey";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "../../util/wrappers";
import { createNode } from "ipfs";
const driver = require("bigchaindb-driver");
import "./Home.css";
import Lottie from "react-lottie";
import * as animationData from "./data.json";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { browserHistory } from "react-router";
import PreviewVideo from "../../components/PreviewVideo";
import Autosuggest from "react-autosuggest";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    maxWidth: 345
  },
  media: {
    // height: 140,
    width: "100%"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestHash:
        "https://ipfs.io/ipfs/QmTKZgRNwDNZwHtJSjCp6r5FYefzpULfy37JvMt9DwvXse/video.mp4",
      isStopped: false,
      isPaused: false,
      conn: null
    };
  }

  componentWillMount() {}

  getUUID = hash => {
    const conn = new driver.Connection(API_PATH, {
      app_id: applicationID,
      app_key: applicationKey
    });
    console.log(conn);
    conn.searchAssets(hash).then(assets => {
      console.log(assets[0].data.uuid);
      return assets[0].data.uuid;
    });
  };

  getHash = hash => {
    const conn = new driver.Connection(API_PATH, {
      app_id: applicationID,
      app_key: applicationKey
    });
    conn.searchAssets(hash).then(assets => {
      return assets[0].data.videoHashes["720p"];
    });
  };

  redirectToWatchVideo = uuid => {
    browserHistory.push("/watchVideo?uuid=" + uuid);
  };

  render() {
    const node = createNode();
    node.on("ready", () => {
      console.log(node);
    });
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    const { classes } = this.props;
    const links = [
      "id:798f5fe3:Movie:7427b723-8950-4486-8bc2-e938f081346d",
      "id:798f5fe3:Movie:7eadde76-257a-41e1-a10e-777085620176",
      "id:798f5fe3:Movie:010a1f89-8b09-4adc-844a-3ed9a22d7447"
    ];

    const AuthOnlyPlayer = VisibleOnlyAuth(() => (
      <div style={{ paddingTop: "5%" }}>
        <div className={classes.root}>
          <Grid container spacing={8}>
            {" "}
            {links.map(vid => (
              <PreviewVideo
                onClick={() => {
                  console.log(vid);
                  this.redirectToWatchVideo(vid);
                }}
                key={vid}
                uuid={vid}
              />
            ))}
          </Grid>
        </div>
      </div>
    ));
    const GuestVideoPlayer = HiddenOnlyAuth(() => (
      <div className="home-animation">
        <Lottie
          options={defaultOptions}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
      </div>
    ));

    return (
      <div>
        <AuthOnlyPlayer />
        <GuestVideoPlayer />
      </div>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Home);
