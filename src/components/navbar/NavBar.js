import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const style = {
    flexGrow: 1
}
const NavBar = () => {
    return (
        <div>
            <AppBar position="static"  style={{ boxShadow: 'none'}}>
                <Toolbar>
                    <Typography variant="h6" style={style} href="#">
                        Convocatorias Cidenet
                    </Typography>
                    <Button color="inherit" href="/announcements">Lista Convocatoria</Button>
                    <Button color="inherit" href="/add">Añadir Convocatoria</Button>
                    <Button color="inherit" href="/candidates">Lista Candidatos</Button>
                    <Button color="inherit" href="/add-candidate">añadir Candidato</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
