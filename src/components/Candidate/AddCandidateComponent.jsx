import React, { Component } from "react";
import CandidateService from "../../services/CandidateService";
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
    this.saveCandidate = this.saveCandidate.bind(this);

    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      programmingLanguage: "JAVA",
      salary: "",
      softSkill: "",
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
      softSkill: e.target.value,
    });
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
            text: response.data.message + ": " + candidate.firstName,
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
        console.log(e);
        if (e === "Error: Request failed with status code 409") {              
          swal({
            title: "Se ha ingresado mal los datos",
            text:
              "verificar todos los datos y volver a intentar",
            icon: "error",
          });
      } else {
        swal({
          title: "Ocurrio un error inesperado",
          text:
            "verificar todos los datos y volver a intentar",
          icon: "error",
        });
      }
      });
  }

  render() {
    const isEnabled = this.state.firstName.length > 0 && this.state.lastName.length > 0 
    && this.state.email.length > 0 && this.state.salary.length > 0 
    && this.state.softSkill.length > 0;
    return (
      <div className="submit-form">
        <div>
          <div className="form-group" id="create-announcement-form">
            <label htmlFor="title">Nombres del candidato</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              required
              placeholder="Ingrese el nombre del candidato "
              value={this.state.firstName}
              onChange={this.onChangeFirstName}
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Apellidos del candidato</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              required
              placeholder="Ingrese los apellido del candidato"
              value={this.state.lastName}
              onChange={this.onChangeLastName}
              name="lastName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              placeholder="Ingrese el correo del candidato"
              value={this.state.email}
              onChange={this.onChangeEmail}
              name="email"
            />
          </div>

          <div className="form-group">
              <label htmlFor="job">Lenguaje de programacion esperado</label>
              <select className="form-control" value={this.state.programmingLanguage} onChange={this.onChangeProgrammingLanguage}>
              <option value="JAVA">JAVA</option>
              <option value="PLSQL">PLSQL</option>
              <option value="GROOVY">GROOVY</option>
              <option value="SWIFT">SWIFT</option>
              </select>
            </div>

          <div className="form-group">
            <label htmlFor="description">Expectativa de salario</label>
            <input
              type="number"
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
            <textarea
              type="textarea"
              className="form-control"
              id="softskill"
              required
              placeholder="Ingrese las habiidades basicas"
              value={this.state.softSkill}
              onChange={this.onChangeSoftSkill}
              name="softskill"
            />
          </div>

          <div className="form-group">
              <label htmlFor="english">Necesidad de saber ingles</label>
              <select className="form-control" value={this.state.english} onChange={this.onChangeEnglish}>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
              </select>
          </div>

          <button onClick={this.saveCandidate} button disabled={!isEnabled} className="btn btn-success">
            Subir candidato
          </button>
        </div>
      </div>
    );
  }
}
