import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllAnnouncements = this.removeAllAnnouncements.bind(this);
    this.searchAnnouncementName = this.searchAnnouncementName.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchAnnouncementName: "",
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
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

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllAnnouncements() {
    TutorialDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchAnnouncementName() {
    TutorialDataService.findByAnnouncementName(this.state.searchAnnouncementName)
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

  render() {
    const {
      searchTitle,
      tutorials,
      currentTutorial,
      currentIndex,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por una convocatoria"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de convocatorias</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.announcementName}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllAnnouncements}
          >
            Quitar Todas
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Convocatoria</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentTutorial.announcementName}
              </div>
              <div>
                <label>
                  <strong>Lenguaje de programacion:</strong>
                </label>{" "}
                {currentTutorial.job}
              </div>
              <div>
                <label>
                  <strong>Estado:</strong>
                </label>{" "}
                {currentTutorial.status}
              </div>
              <div>
                <label>
                  <strong>Salario:</strong>
                </label>{" "}
                {currentTutorial.salary}
              </div>
              <div>
                <label>
                  <strong>Fecha de inicio:</strong>
                </label>{" "}
                {currentTutorial.initialAnnouncementDate}
              </div>
              <div>
                <label>
                  <strong>Fecha de terminacion:</strong>
                </label>{" "}
                {currentTutorial.endAnnouncementDate}
              </div>                                
              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Para iniciar,presionar alguna de las Convocatorias</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
