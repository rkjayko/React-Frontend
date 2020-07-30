import React, { Component } from 'react'
import AnnouncementService from "../../services/announcement.service";
import swal from 'sweetalert';
class EditAnnouncementComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            announcementName: "",
            job: "",
            salary: "",
            status:"",
            initialAnnouncementDate:"",
            endAnnouncementDate:"", 
        }
        this.saveAnnouncement = this.saveAnnouncement.bind(this);
        this.loadAnnouncement = this.loadAnnouncement.bind(this);
        this.onChangeAnnouncementName = this.onChangeAnnouncementName.bind(this);
        this.onChangeJob = this.onChangeJob.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeInitialAnnouncementDate = this.onChangeInitialAnnouncementDate.bind(this);
        this.onChangeEndAnnouncementDate = this.onChangeEndAnnouncementDate.bind(this);        
    }

    componentDidMount() {
        this.loadAnnouncement();
    }

    loadAnnouncement() {
        AnnouncementService.fetchAnnouncementById(window.localStorage.announcementId)
            .then((res) => {
                let announcement = res.data;
                this.setState({
                id: announcement.id,
                announcementName: announcement.announcementName,
                job: announcement.job,
                salary: announcement.salary,
                status:announcement.status,
                initialAnnouncementDate:announcement.initialAnnouncementDate,
                endAnnouncementDate:announcement.endAnnouncementDate, 
                })
            });
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
        AnnouncementService.editAnnouncement(announcement)
        .then(response => {
          this.setState({
            id: response.data.announcement.id,
            announcementName: response.data.announcement.announcementName,
            job: response.data.announcement.job,
            salary: response.data.announcement.salary,
            status: response.data.announcement.status,
            initialAnnouncementDate: response.data.announcement.initialAnnouncementDate,
            endAnnouncementDate: response.data.announcement.endAnnouncementDate
          });

          swal({
              title: "Se edito el anuncio con exito!",
              text: 'Se edito todo bien todo bonito el anuncio \n' + announcement.announcementName,
              icon: "success",
            });        
        })
        .catch(e => {
          console.log(e)

          swal({
              title: "Error!",
              text: 'No se procesó tu solicitud: \n' + e,
              icon: "error",
            });
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

export default EditAnnouncementComponent;