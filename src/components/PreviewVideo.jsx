import React, { Component } from "react";
import PropTypes from "prop-types";
import { applicationID, applicationKey, API_PATH } from "../keys/bigchaindbKey";
import Orm from "bigchaindb-orm";
import { browserHistory } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
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
    maxWidth: 345,
    maxHeight: 500
  },
  media: {
    width: "100%"
  }
});
class PreviewVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      hash: "",
      uuid: this.props.uuid,
      gif: null
    };
  }
  componentDidMount = () => {
    const bdbOrm = new Orm(API_PATH, {
      app_id: applicationID,
      app_key: applicationKey
    });
    bdbOrm.define("Movie", "https://schema.org/v1/Movie");
    bdbOrm.models.Movie.retrieve(this.state.uuid).then(assets => {
      console.log(assets);
      this.setState({
        hash: assets[0]["data"]["videoHashes"]["720p"]
      });
      this.setState({
        title: assets[0]["data"]["title"]
      });
      this.setState({
        description: assets[0]["data"]["description"]
      });
      this.setState({ category: assets[0]["data"]["category"] });
    });
  };
  redirectToWatchVideo = () => {
    console.log("click");
    browserHistory.push("/watchVideo?uuid=" + this.state.uuid);
  };
  render = () => {
    const { classes } = this.props;
    return (
      <Grid item key={this.state.uuid}>
        <Card onClick={this.redirectToWatchVideo} className={classes.card}>
          <CardActionArea>
            {" "}
            <CardMedia
              component="video"
              className={classes.media}
              src={"https://ipfs.io/ipfs/" + this.state.hash}
            />
          </CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.state.title}
            </Typography>
            <Typography variant="subheading">
              {this.state.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
}
PreviewVideo.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(PreviewVideo);
