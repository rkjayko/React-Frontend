import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddAnnouncementComponent from '../Announcement/AddAnnouncementComponent'
import {
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const currencies = [
    {
      value: 'JAVA',
      label: 'JAVA',
    },
    {
      value: 'PL/SQL',
      label: 'PL/SQL',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

const SignUp = () => {

    const classes = useStyles();
    const [currency, setCurrency] = React.useState('JAVA');
    const handleChange = (event) => {
        setCurrency(event.target.value);
      };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                Añadir usuario
                </Typography>
                <form className={classes.form}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="announcementName"
                            label="Nombre de la convocatoria"
                            name="announcementName"
                            autoFocus
                        />
                    </Grid>                        
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Aspirante a"
                            value={currency}
                            onChange={handleChange}
                            SelectProps={{
                            native: true,
                            }}
                            helperText="Seleccione el lenguaje"
                        variant="outlined"
                        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="salary"
                                label="Salario"
                                name="salary"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="status"
                                label="status"
                                type="status"
                                id="status"
                            />
                        </Grid>   
                        <Grid item xs={12} sm={6}>
                        <TextField
                            id="date"
                            label="Inicio Convocatoria"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        </Grid>    
                        <Grid item xs={12} sm={6}>
                        <TextField
                            id="date"
                            label="Final Convocatoria"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        </Grid>                                                                     
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={AddAnnouncementComponent.saveAnnouncement}
                    >
                        Agregar convocatoria
                    </Button>
                    </MuiPickersUtilsProvider>
                </form>
            </div>
        </Container>
    );
};

export default SignUp;
