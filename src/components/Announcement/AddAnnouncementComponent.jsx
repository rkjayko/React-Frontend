import React, { Component } from "react";
import AnnouncementService from "../../services/announcement.service"
import swal from 'sweetalert';
export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeAnnouncementName = this.onChangeAnnouncementName.bind(this);
    this.onChangeJob = this.onChangeJob.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeInitialAnnouncementDate = this.onChangeInitialAnnouncementDate.bind(this);
    this.onChangeEndAnnouncementDate = this.onChangeEndAnnouncementDate.bind(this);
    this.saveAnnouncement = this.saveAnnouncement.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: 5,
      announcementName: "prueba",
      job:"JAVA",
      salary: "300",
      status:"OPEN",
      initialAnnouncementDate:"2020-06-26",
      endAnnouncementDate:"2020-06-26", 
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

  saveAnnouncement() {
    var announcement = {
      announcementName: this.state.announcementName,
      job: this.state.job,
      salary: this.state.salary,
      status: this.state.status,
      initialAnnouncementDate: this.state.initialAnnouncementDate,
      endAnnouncementDate: this.state.endAnnouncementDate,
    };
    AnnouncementService.addAnnouncement(announcement)
      .then(response => {
        this.setState({
          id: announcement.id,
          announcementName: announcement.announcementName,
          job: announcement.job,
          salary: announcement.salary,
          status: announcement.status,
          initialAnnouncementDate: announcement.initialAnnouncementDate,
          endAnnouncementDate: announcement.endAnnouncementDate
        });
        swal({
            title: "Se creo anuncio con exito!",
            text: 'Se creo todo bien todo bonito el anuncio \n' + announcement.announcementName,
            icon: "success",
          });        
      })
      .catch(e => {
        swal({
            title: "Error!",
            text: 'No se procesó tu solicitud: \n' + e,
            icon: "error",
          });
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

            <button onClick={this.saveAnnouncement} className="btn btn-success">
              Subir convocatoria
            </button>
          </div>
        )}
      </div>
    );
  }
}
