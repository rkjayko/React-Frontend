import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TutorialDataService from "../../services/tutorial.service";
import SignUp from "../form/SignUp"


class AddAnnouncementComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        }
        this.saveAnnouncement = this.saveAnnouncement.bind(this);
    }

    saveAnnouncement = (e) => {
        e.preventDefault();
        let announcement = {username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, salary: this.state.salary};
        TutorialDataService.addAnnouncement(announcement)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/announcements');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>Añadir usuario</Typography>
                <SignUp/>
    </div>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default AddAnnouncementComponent;