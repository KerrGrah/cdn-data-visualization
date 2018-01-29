import React, {Component} from 'react';
import {connect} from 'react-redux';
//import bemCn from 'bem-cn-fast';
import Graph1 from './components/graph1';
import Graph2 from './components/graph2';
import Footer from './components/footer';
import {logIn, logOut, getBandwidthData, getAudienceData} from './actions/actions';
import style from './styles.css';
import { defaults } from 'react-chartjs-2';

defaults.global.animation.duration = 100;


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      identifiant: "",
      password: "",
      //defaultViewRange: [],
      viewRange: []
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
    const sesssionToken = localStorage.getItem('session_token')
    if (sesssionToken)
      this.props.dispatch(logOut(sesssionToken))
      setTimeout(()=> {  this.props.dispatch(logIn('urtoob', 'ToobRU'))}, 500)
  }

  componentWillUnmount() {
    this.props.dispatch(logOut(this.props.user.sessionToken))
  }
  viewRangeChange = (start, stop) => {
   const audience = this.props.user.clientData.audience.data.audience.length
    const rangeStart = audience * start > 0 ? (audience * start).toFixed() : 0;
    const rangeStop = audience * stop > 0 ? (audience * stop ).toFixed() : 200;
  //  console.log(audience, rangeStart, rangeStop);
    this.setState({viewRange: [rangeStart, rangeStop]})
  }

  render() {
    console.log(this.props);
    const users = this.props.users.map(user => <option value={user.identifiant}>{user.identifiant}</option>)
    return (
      <div className="App">
      <div className="select-user-container">  <select onChange={this.logIn.bind(this)}>
          <option>choose user</option>
          {users}
        </select>
        <h3>{this.props.user.currentUserId}</h3>
      </div>


      {this.props.user.clientData.audience && this.props.user.clientData.audience.data.audience.length > 0 &&

        <div className="graphs-container">

        <Graph1 viewRange={this.state.viewRange} capacity={this.props.user.clientData.bandwidth}/>

        <Graph2 viewRange={this.state.viewRange} audience={this.props.user.clientData.audience}/>

        <Footer viewRangeChange={this.viewRangeChange} audience={this.props.user.clientData.audience} currentUserId={this.props.user.currentUserId}/>

      </div>
    }

      </div>
    );
  }
}

const mapStateToProps = store => {

  return {
    ...store
  }
}

export default connect(mapStateToProps)(App);
