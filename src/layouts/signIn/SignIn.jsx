import React, { Component } from "react";
import {
  Card,
  TextField,
  Button,
  CardContent,
  CardActions
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { browserHistory } from "react-router";
const bip39 = require("bip39");
import Orm from "bigchaindb-orm";
import {
  applicationID,
  applicationKey,
  API_PATH
} from "../../keys/bigchaindbKey";
import PropTypes from "prop-types";
const BigchainDB = require("bigchaindb-driver");
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    // objectFit: "cover",
  },
  formControl: {
    margin: theme.spacing.unit
  },
  card: {
    marginLeft: "auto",
    marginRight: "auto",
    height: "auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uportCredentials: null,
      username: "",
      name: "",
      phoneNumber: "",
      avatar: null,
      email: "",
      address: ""
    };
  }
  componentWillMount() {
    var currentLocation = browserHistory.getCurrentLocation();
    if ("user" in currentLocation.query) {
      const user = JSON.parse(currentLocation.query.user);
      this.setState({
        uportCredentials: user
      });
      this.setState({ address: user.address });
      this.setState({
        name: user.name
      });
      this.setState({
        phoneNumber: user.phone
      });
      this.setState({
        avatar: user.avatar
      });
      this.setState({
        email: user.email
      });
    }
  }
  onUserNameChange = e => {
    this.setState({ username: e.target.value });
  };
  onSubmitForm = e => {
    const bdbOrm = new Orm(API_PATH, {
      app_id: applicationID,
      app_key: applicationKey
    });
    bdbOrm.define("User", "https://schema.org/v1/User");
    const assets = {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      username: this.state.username,
      avatar: this.state.avatar,
      address: this.state.address
    };
    const aliceKeypair = new bdbOrm.driver.Ed25519Keypair();
    bdbOrm.models.User.create({
      keypair: aliceKeypair,
      data: assets
    }).then(asset => {
      console.log(asset);
      browserHistory.push("/");
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="container-fluid" style={{ padding: "5%" }}>
        <Card className={classes.card}>
          <CardContent>
            {" "}
            <form className={classes.container}>
              <fieldset>
                <div className="form-group">
                  <TextField
                    id="UserName"
                    label="Username"
                    margin="normal"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.onUserNameChange}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="Name"
                    label="Name"
                    margin="normal"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={e => {
                      this.setState({ name: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="Phone"
                    label="Phone"
                    margin="normal"
                    className={classes.textField}
                    value={this.state.phoneNumber}
                    onChange={e => {
                      this.setState({ phoneNumber: e.target.value });
                    }}
                  />
                </div>
              </fieldset>
            </form>
          </CardContent>
          <CardActions>
            <Button role="role" color="primary" onClick={this.onSubmitForm}>
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SignIn);
