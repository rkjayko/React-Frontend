import React, { Component } from "react";
import CandidateService from '../../services/CandidateService'
import swal from "sweetalert";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmailName = this.onChangeEmail.bind(this);
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
    console.log(candidate)
    CandidateService.addCandidate(candidate)
      .then((response) => {
        this.setState({
          firstName: response.data.announcement.firstName,
          lastName: response.data.announcement.lastName,
          email: response.data.announcement.email,
          programmingLanguage: response.data.announcement.programmingLanguage,
          salary: response.data.announcement.salary,
          softSkill: response.data.announcement.softSkill,
          english: response.data.announcement.english,
        });
        console.log(response);
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
    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));
    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles.paper}>
        <Typography component="h1" variant="h5" align="center">
          Sign up
        </Typography>
        <form className={useStyles.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nombres"
                variant="outlined"
                required
                fullWidth
                id="nombres"
                label="nombres"
                value={this.state.firstName}
                onChange={this.onChangeFirstName}                
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="apellidos"
                label="apellidos"
                name="apellidos"
                value={this.state.lastName}
                onChange={this.onChangeLastName}                
                autoFocus                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.onChangeEmail}                 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="lenguaje de programacion"
                label="programmingLanguage"
                id="programmingLanguage"
                value={this.state.programmingLanguage}
                onChange={this.onChangeProgrammingLanguage}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="softskill"
                label="¿Cuales son tus habilidades blandas?"
                id="soft skill"
                value={this.state.softSkill}
                onChange={this.onChangeSoftSkill}/>
            </Grid>            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="english"
                label="sabe ingles?"
                name="english"
                value={this.state.english}
                onChange={this.onChangeEnglish}/>                
                   
            </Grid>   
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="salary"
                label="expectativa de salario"
                name="salary"
                value={this.state.salary}
                onChange={this.onChangeSalary}/>                
              
            </Grid>                   
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
            onClick={this.saveCandidate}
          >
            Registrar usuario
          </Button>           
          </Grid>

        </form>
      </div>
      </Container>
    );
  }
}