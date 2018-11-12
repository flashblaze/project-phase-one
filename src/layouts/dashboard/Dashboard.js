import React, { Component } from "react";
import "./Dashboard.css";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { CardMedia, CardContent, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router";
import UploadVideo from "../uploadVideo/UploadVideo";

const styles = theme => ({
  card: {
    maxWidth: 275,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="container-fluid" style={{ paddingTop: "5%" }}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              component="p"
              style={{ textAlign: "center", marginTop: 8, fontSize: 16 }}
            >
              Welcome <strong>{this.props.authData.name}</strong>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Dashboard);
