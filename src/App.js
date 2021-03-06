import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import firebase from 'firebase';
import { BrowserRouter, Route, Link, Redirect, NavLink } from 'react-router-dom'


import Firebaselogin from './components/firebaselogin'


import { cardrefresh, getfontcolor } from './actions/userActions';

import SettingIcon from 'material-ui/svg-icons/action/settings';
import Caticon from 'material-ui/svg-icons/action/bookmark';
import Addbox from 'material-ui/svg-icons/content/add-box';
import CardsIcon from 'material-ui/svg-icons/image/grid-on';
import Dialog from 'material-ui/Dialog';
import {grey50, red500, blue500, green500} from 'material-ui/styles/colors';

import CardList from './components/cardlist';
import NewCard from './components/newcard';
import Settings from './components/settings';
import Categories from './components/categories'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newcardopen: false,
      opensettings: false

    };
  }

  componentDidMount(){
    this.props.cardrefresh()
    this.props.getfontcolor()
  }

  opensettings = () => {
    const user = firebase.auth().currentUser;
    if (user !=null){
    this.setState({opensettings: true})
    }
  }

  opennewcard = () => {
    const user = firebase.auth().currentUser;
    if (user !=null){
    this.setState({newcardopen: true})
    }
  }

  closecard = () => {
    this.setState({opensettings: false, newcardopen: false})
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="navbar">
              <div className="navcontainer">
                <NavLink activeClassName="selected" to="/"><span className="title">ZUPCARD </span></NavLink>
                <span className="filler"/>
                <Addbox style={style.small} onClick={this.opennewcard} color={blue500} />
                <Link to="/cards"><CardsIcon color={red500} style={style.small} /></Link>
                <Link to="/categories"><Caticon style={style.small} color={green500} /></Link>
                <SettingIcon style={style.small} color={grey50} onClick={this.opensettings}/>
              </div>
          </div>

          <Dialog modal={false} open={this.state.opensettings} onRequestClose={this.closecard} autoDetectWindowHeight={true}>
                <Settings/>
          </Dialog>

          
          <Dialog modal={false} open={this.state.newcardopen} onRequestClose={this.closecard} autoScrollBodyContent={true}  >
                  <NewCard closeloginform={this.closecard}/>
          </Dialog>

          <Route exact path={"/"} component={() => <Firebaselogin/>}/>
          <Route exact path={"/categories"} component={() => <Categories/>}/>
          <Route exact path={"/cards"} render={() => (this.props.isloggedin ? ( <CardList/>) : (<Redirect to="/"/>))}/>
        </div>
      </BrowserRouter>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        userid: state.user.userid,
        isloggedin: state.user.isloggedin
    };
}

const mapDispatchToProps = dispatch => ({
  cardrefresh: () => dispatch(cardrefresh()),
  getfontcolor: () => dispatch(getfontcolor()),
});


const style = {
  small: {
    width: 35,
    height: 35,
    padding: 10,
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
