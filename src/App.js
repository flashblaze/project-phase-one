import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import { browserHistory } from "react-router";
import Drawer from "@material-ui/core/Drawer";
import classNames from "classnames";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SearchIcon from "@material-ui/icons/Search";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { fade } from "@material-ui/core/styles/colorManipulator";
import InputBase from "@material-ui/core/InputBase";

// // Styles
import "./css/oswald.css";
import "./App.css";

import { Link } from "react-router";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "./util/wrappers.js";

// UI Components
import LoginButtonContainer from "./user/ui/loginbutton/LoginButtonContainer";
import LogoutButtonContainer from "./user/ui/logoutbutton/LogoutButtonContainer";
import { ListItem } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Image } from "semantic-ui-react";
import red from "@material-ui/core/colors/red";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: window.innerHeight,
    zIndex: 1,
    overflow: "auto",
    position: "relative",
    display: "flex"
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius * 5,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.1)
    // },
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 10,
    marginTop: 5,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      // marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  inputRoot: {
    color: "inherit",
    width: "100%"
  },

  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginBottom: "20px"
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      avatar: null,
      selectedIndex: -1
    };
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  componentDidMount() {
    this.renderAvatar();
  }

  renderAvatar = () => {
    const userData = JSON.parse(localStorage.getItem("uPortUserCredentials"));
    if (userData != null) {
      this.setState({
        avatar: (
          <img
            alt="Your avatar"
            selected={this.state.selectedIndex === 1}
            onClick={() => {
              browserHistory.push("/profile");
              this.handleListItemClick(event, 1);
            }}
            className={this.props.classes.toolbar}
            style={{
              height: 30,
              width: 60,
              padding: 10,
              borderRadius: "50%"
            }}
            src={userData.avatar.uri}
          />
        )
      });
    }
  };

  setDrawerState = open => () => {
    this.setState({
      drawerOpen: open
    });
  };

  render() {
    const { classes, theme } = this.props;
    const OnlyAuthLinks = VisibleOnlyAuth(() => (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !this.state.drawerOpen && classes.drawerPaperClose
          )
        }}
        open={this.state.drawerOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.setDrawerState(false)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List>
          {" "}
          <ListItem
            button
            selected={this.state.selectedIndex === 0}
            title="Dashboard"
            onClick={() => {
              browserHistory.push("/dashboard");
              this.handleListItemClick(event, 0);
            }}
          >
            <ListItemIcon>
              <i className="material-icons">dashboard</i>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            title="Profile"
            selected={this.state.selectedIndex === 1}
            onClick={() => {
              browserHistory.push("/profile");
              this.handleListItemClick(event, 1);
            }}
          >
            <ListItemIcon>
              <i className="material-icons">account_circle</i>
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>{" "}
          <ListItem
            button
            title="Upload"
            selected={this.state.selectedIndex === 2}
            onClick={() => {
              browserHistory.push("/uploadVideo");
              this.handleListItemClick(event, 2);
            }}
          >
            <ListItemIcon>
              <i className="material-icons">cloud_upload</i>
            </ListItemIcon>
            <ListItemText primary="Upload Video" />
          </ListItem>
        </List>
      </Drawer>
    ));
    const LogoutButton = VisibleOnlyAuth(() => <LogoutButtonContainer />);
    const OnlyGuestLinks = HiddenOnlyAuth(() => <LoginButtonContainer />);
    return (
      <div className={classes.root} style={{ backgroundColor: "#ffffff" }}>
        <AppBar
          className={classNames(
            classes.appBar,
            this.state.drawerOpen && classes.appBarShift
          )}
          position="absolute"
        >
          <Toolbar disableGutters={!this.state.drawerOpen}>
            <IconButton
              className={classNames(
                "App",
                classes.menuButton,
                this.state.drawerOpen && classes.hide
              )}
              color="inherit"
              onClick={this.setDrawerState(true)}
              aria-label="Open Drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              noWrap
              className={classes.grow}
              onClick={() => {
                browserHistory.push("");
              }}
            >
              INK Player
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            {this.state.avatar}
            <OnlyGuestLinks />
            <LogoutButton />
          </Toolbar>
        </AppBar>
        <OnlyAuthLinks />
        <div className={classes.content}>{this.props.children}</div>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
