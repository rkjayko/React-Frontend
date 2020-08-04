import React, { Component } from "react";
import CandidateService from "../../services/CandidateService";
import swal from "sweetalert";

class EditCandidateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        programmingLanguage: "",
        salary: "",
        softSkill: "",
        english: "",
    };
    this.editCandidate = this.editCandidate.bind(this);
    this.loadCandidate = this.loadCandidate.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeProgrammingLanguage = this.onChangeProgrammingLanguage.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeSoftSkill = this.onChangeSoftSkill.bind(this);
    this.onChangeEnglish = this.onChangeEnglish.bind(this);
  }

  componentDidMount() {
    this.loadCandidate();
  }

  loadCandidate() {
    CandidateService.fetchCandidateById(window.localStorage.candidateId
    ).then((res) => {
      let candidate = res.data;
      this.setState({
        id: candidate.id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        programmingLanguage: candidate.programmingLanguage,
        salary: candidate.salary,
        softSkill: candidate.softSkill,
        english: candidate.english,
      });
    });
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

  editCandidate() {
    var candidate = {
        id: this.state.id,
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
        this.setState({
          id: response.data.candidate.id,
          firstName: response.data.candidate.firstName,
          lastName: response.data.candidate.lastName,
          email: response.data.candidate.email,
          programmingLanguage: response.data.candidate.programmingLanguage,
          salary: response.data.candidate.salary,
          softSkill: response.data.candidate.softSkill,
          english: response.data.candidate.english,
        });

        swal({
          title: "Se edito el anuncio con exito!",
          text:"Se edito todo bien todo bonito el anuncio \n" + candidate.firstName + candidate.lastName,
          icon: "success",
        });
      })
      .catch((e) => {
        swal({
          title: "Error!",
          text: e.response.data.ERROR,
          icon: "error",
        });
      });
  }

  render() {
    const isEnabled = this.state.firstName.length > 0 && this.state.lastName.length > 0 
    && this.state.email.length > 0 && this.state.softSkill.length > 0;
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

          <button onClick={this.editCandidate} button="true" disabled={!isEnabled} className="btn btn-success">
            Subir candidato
          </button>
        </div>
      </div>
    );
  }
}

export default EditCandidateComponent;
