import React, { Component } from "react";
import AnnouncementService from "../../services/AnnouncementService";
import swal from "sweetalert";
export default class AddAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.onChangeAnnouncementName = this.onChangeAnnouncementName.bind(this);
    this.onChangeJob = this.onChangeJob.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEnglish = this.onChangeEnglish.bind(this);
    this.saveAnnouncement = this.saveAnnouncement.bind(this);

    this.state = {
      id: "",
      announcementName: "",
      job: "JAVA",
      salary: "",
      status: "OPEN",
      english: "YES",
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
    console.log(announcement)
    AnnouncementService.addAnnouncement(announcement)
      .then((response) => {
        this.setState({
          announcementName: response.data.announcement.announcementName,
          job: response.data.announcement.job,
          salary: response.data.announcement.salary,
          status: response.data.announcement.status,
          english: response.data.announcement.english,
        });
        if (response.data.status === "SUCCESS") {
          swal({
            title: "Se creo anuncio con exito!",
            text: response.data.message,
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
  
  render() {
    const isEnabled = this.state.announcementName.length > 0 && this.state.salary.length > 0;
    return (
      <div className="submit-form">
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
              <label htmlFor="job">Lenguaje de programacion de la convocatoria</label>
              <select className="form-control" value={this.state.job} onChange={this.onChangeJob}>
              <option value="JAVA">JAVA</option>
              <option value="PLSQL">PLSQL</option>
              <option value="GROOVY">GROOVY</option>
              <option value="SWIFT">SWIFT</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Salario a convenir</label>
              <input
                type="number"
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
              <label htmlFor="status">Estado de la convocatoria</label>
              <select className="form-control" value={this.state.status} onChange={this.onChangeStatus}>
              <option value="OPEN">OPEN</option>
              <option value="CLOSED">CLOSED</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="english">Necesidad de saber ingles</label>
              <select className="form-control" value={this.state.english} onChange={this.onChangeEnglish}>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
              </select>
            </div>
                    
            <button onClick={this.saveAnnouncement} button disabled={!isEnabled} className="btn btn-success" >
              Subir convocatoria
            </button>                 
          </div>
      </div>
    );
  }
}
