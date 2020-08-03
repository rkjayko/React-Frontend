import React, { Component } from "react";
import AnnouncementService from "../../services/announcement.service";
import swal from "sweetalert";
export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeAnnouncementName = this.onChangeAnnouncementName.bind(this);
    this.onChangeJob = this.onChangeJob.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEnglish = this.onChangeEnglish.bind(this);
    this.saveAnnouncement = this.saveAnnouncement.bind(this);
    this.newAnnouncement = this.newAnnouncement.bind(this);

    this.state = {
      id: "",
      announcementName: "",
      job: "JAVA",
      salary: "",
      status: "OPEN",
      english: "NO",
    };
  }

  onChangeAnnouncementName(e) {
    this.setState({
      announcementName: e.target.value,
    });
  }

  onChangeJob(e) {
    this.setState({
      job: e.target.value,
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value,
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
    });
  }

  onChangeEnglish(e) {
    this.setState({
      english: e.target.value,
    });
  }

  saveAnnouncement() {
    var announcement = {
      announcementName: this.state.announcementName,
      job: this.state.job,
      salary: this.state.salary,
      status: this.state.status,
      english: this.state.english,
    };
    AnnouncementService.addAnnouncement(announcement)
      .then((response) => {
        this.setState({
          announcementName: response.data.announcement.announcementName,
          job: response.data.announcement.job,
          salary: response.data.announcement.salary,
          status: response.data.announcement.status,
          english: response.data.announcement.english,
        });
        console.log(response);
        if (response.data.status === "SUCCESS") {
          swal({
            title: "Se creo anuncio con exito!",
            text: response.data.message + ": " + announcement.announcementName,
            icon: "success",
          });
        } else {
          swal({
            title: "hubo un error con el servicio!",
            text: "hay un error",
            icon: "error",
          });
        }
      })
      .catch((e) => {
        console.log(e)
        swal({
          title: "Se creo anuncio con exito!",
          text: "se agrego tu anuncio con exito",
          icon: "success",
        });
      });
  }

  cancelCourse(){ 
    this.setState({
      id: null,
      announcementName: "",
      job: "",
      salary: "",
      status: "",
      english: "",
    });
  }

  newAnnouncement() {
    this.setState({
      id: null,
      announcementName: "",
      job: "",
      salary: "",
      status: "",
      english: "",
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
            <div className="form-group" id="create-announcement-form">
              <label htmlFor="title">Nombre de la convocatoria</label>
              <input
                type="text"
                className="form-control"
                id="announcementName"
                required
                placeholder="Ingrese el nombre de la convocatoria"
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
                placeholder="Ingrese el salario a convenir"
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
              <label htmlFor="description">Necesidad de saber ingles?</label>
              <input
                type="text"
                className="form-control"
                id="english"
                required
                value={this.state.english}
                onChange={this.onChangeEnglish}
                name="english"
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
