import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {AppBar,Toolbar,IconButton,Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FaHeart, FaCircle } from 'react-icons/fa';
import Card from '../src/components/card';
import TutorialDataService from "../src/services/tutorial.service";
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import NavBar from '../src/components/navbar/NavBar'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorials: [],
      data: {        
        chartData: {
          country: "",
          data: []
        }
      }
    }
    this.aggregatedCard = React.createRef();
    this.activeCard = React.createRef();
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then((response) => {
        this.setState({
          tutorials: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async componentDidMount() {
    try {
      this.retrieveTutorials();

      this.aggregatedCard.current.changeValue(2);
      this.activeCard.current.changeValue(1);

    } catch (err) {
      console.log(err.message);
    }
  }

  render() {       
    return (
      <Router>
      <div style={{backgroundColor: '#F1F3FB'}} className="col-12 py-3 px-0 mx-0">   
      <div className="row pl-5">
          <h2 style={{color: '#1A1053', fontSize: 30}}>PNC 2.0</h2>
          <span style={{fontSize: 25}} className="text-muted ml-3">Aplicacion Hoja de vida</span>
        </div>
        <div>
        <NavBar/>
        </div>
        {/* Cards */}
        <div className="row col-12 mx-auto">
          <Card 
          ref={this.aggregatedCard}
          title="Convocatorias agregadas" 
          value={0}
          color='#F9345E'/>
          <Card 
          ref={this.activeCard}
          title="Convocatorias abiertas" 
          value={0}
          color='#FA6400'/>
          <Card 
          ref={this.recoveredCard}
          title="Convocatorias finalizadas" 
          value={0}
          color='#1CB142'/>
          <Card 
          ref={this.deathsCard}
          title="Ultima Convocatoria" 
          value={0}
          color='#6236FF'/>
        </div>               
        <div>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/announcements"]} component={TutorialsList} />
              <Route exact path="/add" component={AddTutorial} />
              <Route path="/announcements/:id" component={Tutorial} />
            </Switch>
          </div>
        </div>

        <div className="text-center pt-4">
          <code className="text-muted" style={{color: 'black'}}>
            Made with <FaHeart /> by <a href="https://github.com/rkjaime">Jaime Mejia</a>
            / Design taken from Dribbble
          </code>
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
