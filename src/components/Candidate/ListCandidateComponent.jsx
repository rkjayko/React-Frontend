import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import "bootstrap/dist/css/bootstrap.min.css";
import Candidateservice from "../../services/CandidateService";
import { Alert, AlertTitle } from '@material-ui/lab';
import Pagination from '../form/Pagination';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

class ListCandidateComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            candidates: [],
            message: null,
            currentOffset: 0,
            pageCounter: 1,            
        }
        this.deleteCandidate = this.deleteCandidate.bind(this);
        this.editCandidate = this.editCandidate.bind(this);
        this.addCandidate = this.addCandidate.bind(this);
        this.reloadCandidateList = this.reloadCandidateList.bind(this);    
    }

    componentDidMount() {
        this.reloadCandidateList();
    }
    
    fetchData = (offset = 0) => {
        let params = {
          offset: offset,
          limit: 20
        }
    }
   
      increment= () => {
        const { currentOffset, pageCounter } = this.state;
        this.setState({
          currentOffset: currentOffset + 1,
          pageCounter: pageCounter + 1,
        });
      }
    
      decrement= () => {

        const { currentOffset, pageCounter } = this.state;
        this.setState({
          currentOffset: currentOffset - 1,
          pageCounter: pageCounter - 1,
        });
      }
    
    componentDidUpdate(prevState) {
        if (this.state.currentOffset !== prevState.currentOffset) {
          if (this.state.currentOffset < 0 ) {
            this.setState({
              currentOffset: 0,
              pageCounter: 1,
            });
            this.fetchData(prevState.this.state.currentOffset);
          }
          this.fetchData(this.state.currentOffset);
        }
      }

    getSummaryStatusOpen(arrayStatus){
        var summary = 0;
        for (var count in arrayStatus){
            if (arrayStatus[count].status === 'OPEN') {
                summary = summary + 1;
            }
        }
        return summary;
    }

    getSummaryStatusClosed(arrayStatus){
        var summary = 0;
        for (var count in arrayStatus){
            if (arrayStatus[count].status === 'CLOSED') {
                summary = summary + 1;
            }
        }
        return summary;
    }   

    reloadCandidateList() {
        Candidateservice.fetchCandidates()
        .then((response) => {
            this.setState({
              candidates: response.data,
            });            
          })
          .catch((e) => {
            console.log(e);
          });
    }

    deleteCandidate(candidateId) {
        Candidateservice.deleteCandidate(candidateId)
           .then(res => {
               this.setState({message : 'Candidate deleted successfully.'});
               this.setState({candidates: this.state.candidates.filter(candidate => candidate.id !== candidateId)});
           })
    }

    editCandidate(id) {
        window.localStorage.setItem("candidateId", id);
        this.props.history.push('/edit-candidate');
    }

    addCandidate() {
        window.localStorage.removeItem("candidateId");
        this.props.history.push('/add-candidate');
    }
 
    
    
    render() {   
        
        const StyledTableCell = withStyles((theme) => ({
            head: {
              backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
            },
            body: {
              fontSize: 14,
            },
          }))(TableCell);
          
          const StyledTableRow = withStyles((theme) => ({
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
              },
            },
          }))(TableRow);

        return (
        <div>
        {this.state.candidates.length > 0 ?       
            <Alert severity="success">
                <AlertTitle>Exitoso</AlertTitle>
                Se ha cargado los registros correctamente
             </Alert> :
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
                'No existen registros asociados/No se ha cargado la base de datos'                    
            </Alert>         
        }                 
        <Pagination 
         increment={this.increment} 
         decrement={this.decrement} 
         page={this.state.pageCounter} 
       />                    
        <Typography variant="h4" style={style}>Detalles de Candidatos</Typography>
                <Table class="striped" component={Paper}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell>Nombres</StyledTableCell>
                            <StyledTableCell>Apellidos</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell align="right">Lenguaje de convocatoria</StyledTableCell>
                            <StyledTableCell align="right">Salario</StyledTableCell>
                            <StyledTableCell align="right">Habilidades blandas</StyledTableCell>
                            <StyledTableCell align="right">sabe ingles?</StyledTableCell>
                            <StyledTableCell align="right">Aspirando a</StyledTableCell>
                            <StyledTableCell align="right">editar</StyledTableCell>
                            <StyledTableCell align="right">Eliminar</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.candidates.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.firstName}</TableCell>
                                <TableCell align="left">{row.lastName}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="right">{row.programmingLanguage}</TableCell>
                                <TableCell align="right">{row.salary}</TableCell>
                                <TableCell align="right">{row.softSkill}</TableCell>
                                <TableCell align="right">{row.english}</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right" onClick={() => this.editCandidate(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deleteCandidate(row.id)}><DeleteIcon /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
     
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListCandidateComponent;