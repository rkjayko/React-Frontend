import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeAnnouncementName = this.onChangeAnnouncementName.bind(this);
    this.onChangeJob = this.onChangeJob.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeInitialAnnouncementDate = this.onChangeInitialAnnouncementDate.bind(this);
    this.onChangeEndAnnouncementDate = this.onChangeEndAnnouncementDate.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      announcementName: "prueba",
      job:"JAVA",
      salary: "300",
      status:"OPEN",
      initialAnnouncementDate:"2020-06-26",
      endAnnouncementDate:"2020-06-26", 
      published: false,

      submitted: false
    };
  }

  onChangeAnnouncementName(e) {
    this.setState({
      announcementName: e.target.value
    });
  }

  onChangeJob(e) {
    this.setState({
      job: e.target.value
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value
    });
  }  

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }  

  onChangeInitialAnnouncementDate(e) {
    this.setState({
      initialAnnouncementDate: e.target.value
    });
  }  
  
  onChangeEndAnnouncementDate(e) {
    this.setState({
      endAnnouncementDate: e.target.value
    });
  }  

  saveTutorial() {
    var data = {
      announcementName: this.state.announcementName,
      job: this.state.job,
      salary: this.state.salary,
      status: this.state.status,
      initialAnnouncementDate: this.state.initialAnnouncementDate,
      endAnnouncementDate: this.state.endAnnouncementDate,
    };
    console.log(data)
    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          announcementName: response.data.announcementName,
          job: response.data.job,
          salary: response.data.salary,
          status: response.data.status,
          initialAnnouncementDate: response.data.initialAnnouncementDate,
          endAnnouncementDate: response.data.endAnnouncementDate,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      announcementName: "",
      job: "",
      salary: "",
      status:"",
      initialAnnouncementDate:"",
      endAnnouncementDate:"",       
      published: false,

      submitted: false
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Has ingresado una nueva convocatoria correctamente</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Agregar Convocatoria
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Nombre de la convocatoria</label>
              <input
                type="text"
                className="form-control"
                id="announcementName"
                required
                value={this.state.announcementName}
                onChange={this.onChangeAnnouncementName}
                name="announcementName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Lenguaje de programacion</label>
              <input
                type="text"
                className="form-control"
                id="job"
                required
                value={this.state.job}
                onChange={this.onChangeJob}
                name="job"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Salario a convenir</label>
              <input
                type="text"
                className="form-control"
                id="salary"
                required
                value={this.state.salary}
                onChange={this.onChangeSalary}
                name="salary"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Estado de la convocatoria</label>
              <input
                type="text"
                className="form-control"
                id="status"
                required
                value={this.state.status}
                onChange={this.onChangeStatus}
                name="status"
              />
            </div>  

             <div className="form-group">
              <label htmlFor="description">Fecha inicial de la convocatoria</label>
              <input
                type="text"
                className="form-control"
                id="initialAnnouncementDate"
                required
                value={this.state.initialAnnouncementDate}
                onChange={this.onChangeInitialAnnouncementDate}
                name="initialAnnouncementDate"
              />
            </div>    

             <div className="form-group">
              <label htmlFor="description">Fecha inicial de la convocatoria</label>
              <input
                type="text"
                className="form-control"
                id="endAnnouncementDate"
                required
                value={this.state.endAnnouncementDate}
                onChange={this.onChangeEndAnnouncementDate}
                name="endAnnouncementDate"
              />
            </div>                                         

            <button onClick={this.saveTutorial} className="btn btn-success">
              Subir convocatoria
            </button>
          </div>
        )}
      </div>
    );
  }
}
