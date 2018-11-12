import React, { Component } from "react";
import Avatar from "avataaars";
import "./Profile.css";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import { CardMedia, CardContent, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    maxWidth: 275,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null
    };
  }

  componentWillMount() {
    this.setState({ avatar: this.renderAvatar() });
  }

  renderAvatar = () => {
    if (this.props.authData.avatar) {
      return (
        <img
          className="avatar"
          alt="Avatar"
          src={this.props.authData.avatar.uri}
        />
      );
    } else {
      return (
        <Avatar
          style={{ width: "200px", height: "200px", margin: 10 }}
          avatarStyle="Circle"
          topType="ShortHairShortCurly"
          accessoriesType="Prescription02"
          hairColor="BrownDark"
          // facialHairType="BeardLight"
          facialHairColor="BrownDark"
          clotheType="BlazerSweater"
          eyeType="Default"
          eyebrowType="Default"
          mouthType="Smile"
          skinColor="Light"
        />
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ paddingTop: "5%" }} className="container-fluid">
        <Card className={classes.card}>
          <CardContent>
            <center>{this.state.avatar}</center>
            <Divider />

            <Typography
              style={{ marginTop: 10 }}
              gutterBottom
              variant="headline"
              component="h2"
            >
              {this.props.authData.name}
            </Typography>
            <Divider />
            <Typography
              style={{ marginTop: 10, marginBottom: 10 }}
              component="p"
            >
              {this.props.authData.phone}
            </Typography>
            <Divider />
            <Typography style={{ marginTop: 10 }} component="p">
              {this.props.authData.country}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Profile);
