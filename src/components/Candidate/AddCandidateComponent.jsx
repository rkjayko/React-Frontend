import React, { Component } from "react";
import CandidateService from '../../services/CandidateService'
import swal from "sweetalert";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onProgrammingLanguage = this.onChangeProgrammingLanguage.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeSoftSkill = this.onChangeSoftSkill.bind(this);
    this.onChangeEnglish = this.onChangeEnglish.bind(this);
    this.saveCandidate= this.saveCandidate.bind(this);

    this.state = {
      id: "",
      firstName: "jaykin",
      lastName: "hatakin",
      email:"jdmejia@gmail.com",
      programmingLanguage: "JAVA",
      salary: "20000",
      softSkill: "prueba",
      english: "YES",
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }  

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeProgrammingLanguage(e) {
    this.setState({
      programmingLanguage: e.target.value,
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value,
    });
  }

  onChangeSoftSkill(e) {
    this.setState({
      softSkill:e.target.value,
    })
  }

  onChangeEnglish(e) {
    this.setState({
      english: e.target.value,
    });
  }

  saveCandidate() {
    var candidate = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,               
      programmingLanguage: this.state.programmingLanguage,
      salary: this.state.salary,
      softSkill: this.state.softSkill,
      english: this.state.english,
    };
    CandidateService.addCandidate(candidate)
      .then((response) => {
        console.log(response);
        this.setState({
          firstName: response.data.candidate.firstName,
          lastName: response.data.candidate.lastName,
          email: response.data.candidate.email,
          programmingLanguage: response.data.candidate.programmingLanguage,
          salary: response.data.candidate.salary,
          softSkill: response.data.candidate.softSkill,
          english: response.data.candidate.english,
        });
        if (response.data.status === "SUCCESS") {
          swal({
            title: "Se ha creado candidato con exito!",
            text: response.data.message + ": " + candidate.candidateName,
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
          title: "Se ha creado candidato con exito",
          text: "se agrego tu candidato con exito",
          icon: "success",
        });
      });
  }

  render() {
    return (
      <div className="submit-form">
          <div>            
            <div className="form-group" id="create-announcement-form">
              <label htmlFor="title">Nombre del candidato</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                placeholder="Ingrese el nombre del candidato convocatoria"
                value={this.state.firstName}
                onChange={this.onChangeFirstName}
                name="firstName"
              />
            </div>            

            <div className="form-group" id="create-announcement-form">
              <label htmlFor="title">Apellidos del candidato</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                placeholder="Ingrese los apellido del candidato"
                value={this.state.LastName}
                onChange={this.onChangeLastName}
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Lenguaje de programacion</label>
              <input
                type="text"
                className="form-control"
                id="job"
                required
                value={this.state.programmingLanguage}
                onChange={this.onChangeProgrammingLanguage}
                name="job"
              />
            </div>            

            <div className="form-group">
              <label htmlFor="description">Expectativa de salario</label>
              <input
                type="text"
                className="form-control"
                id="salary"
                required
                placeholder="Ingrese el salario esperado"
                value={this.state.salary}
                onChange={this.onChangeSalary}
                name="salary"
              />
            </div>            

            <div className="form-group">
              <label htmlFor="description">Habilidades blandas</label>
              <input
                type="text"
                className="form-control"
                id="softskill"
                required
                value={this.state.softSkill}
                onChange={this.onChangeSoftSkill}
                name="softskill"
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

            <button onClick={this.saveCandidate} className="btn btn-success">
              Subir candidato
            </button>                 
          </div>
      </div>
    );
  }
}