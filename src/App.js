import React, {Component} from 'react';
import {connect} from 'react-redux';
//import bemCn from 'bem-cn-fast';
import Graph1 from './components/graph1';
import Graph2 from './components/graph2';
import Footer from './components/footer';
import Header from './components/header';
import Message from './components/message';
import {logIn, logOut} from './actions/actions';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      identifiant: "",
      password: "",
      windowHeight: null,
      viewRange: [],
    }
  }

  handleChange = (e) => {
    if (e.target.name === "username")
      this.setState({identifiant: e.target.value})
    else
      this.setState({password: e.target.value})
  }

  logOut = () => {
    this.props.dispatch(logOut(this.props.user.sessionToken))
  }

  logIn = (e) => {
    const value =  e.target.value
    if (value === "choose user") return;
    if (this.props.user.sessionToken) {
      this.props.dispatch(logOut(this.props.user.sessionToken))
    }
    this.setState(() => {
      const password = this.props.users.filter(user => user.identifiant === value)[0].password;
      return {identifiant: value, password: password}
    }, () => {
      this.props.dispatch(logIn(this.state.identifiant, this.state.password))
    })
  }

  componentDidMount() {
    this.setState({windowHeight: window.innerHeight})
    const sesssionToken = localStorage.getItem('session_token')
    if (sesssionToken)
      this.props.dispatch(logOut(sesssionToken))
  }

  componentWillUnmount() {
    this.props.dispatch(logOut(this.props.user.sessionToken))
  }
  viewRangeChange = (start, stop) => {
   const audience = this.props.user.clientData.audience.data.audience.length
    const rangeStart = audience * start > 0 ? (audience * start).toFixed() : 0;
    const rangeStop = audience * stop > 0 ? (audience * stop ).toFixed() : 0;
  //  console.log(audience, rangeStart, rangeStop);
    this.setState({viewRange: [rangeStart, rangeStop]})
  }

  render() {
    // console.log(this.props);
    if (this.props.user.clientData.audience && this.props.user.clientData.audience.data && this.props.user.clientData.audience.data.audience.length > 0) {
    return (
      <div className="App">
        <Header users={this.props.users} logIn={this.logIn} currentUser={this.props.user.currentUserId}/>
        <div className="graphs-container">
        <Graph1 height={this.state.windowHeight} viewRange={this.state.viewRange} capacity={this.props.user.clientData.bandwidth}/>
        <Graph2 height={this.state.windowHeight} viewRange={this.state.viewRange} audience={this.props.user.clientData.audience}/>
        <Footer viewRangeChange={this.viewRangeChange} audience={this.props.user.clientData.audience} currentUserId={this.props.user.currentUserId}/>
      </div>
      </div>
      )
    }
    else if (this.props.user.fetching) {
      return (
        <div className="App">
          <Header users={this.props.users} logIn={this.logIn} currentUser={this.props.user.currentUserId}/>
          <Message msgClass={"loading"} msgText={"loading..."} />
        </div>
      )
    }

    else if (this.props.user.currentUserId) {
      return (
        <div className="App">
          <Header users={this.props.users} logIn={this.logIn} currentUser={this.props.user.currentUserId}/>
          <Message msgClass={"not-data"} msgText={`There is currently no data for ${this.props.user.currentUserId}'s account`} />
        </div>
      )
    }
    else if (this.props.user.logInError) {
      return (
        <div className="App">
          <Header users={this.props.users} logIn={this.logIn} currentUser={this.props.user.currentUserId}/>
          <Message msgClass={"login-error"} msgText={`It seems you may already be logged in on another device`} />
        </div>
      )
    }
    else {
      return (
      <div className="App">
        <Header users={this.props.users} logIn={this.logIn} currentUser={this.props.user.currentUserId}/>
        <Message msgClass={"not-loggedin"} msgText={`Please log in to access your account`} />
      </div>)
    }
  }
}

const mapStateToProps = store => {

  return {
    ...store
  }
}

export default connect(mapStateToProps)(App);
