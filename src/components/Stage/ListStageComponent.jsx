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
import Card from '../card/card';
import StageService from "../../services/StageService";
import { Alert, AlertTitle } from '@material-ui/lab';
import Pagination from '../form/Pagination';
import swal from "sweetalert";

class ListStageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stages: [],
            message: null,
            currentOffset: 0,
            pageCounter: 1,            
        }
        this.deleteStage = this.deleteStage.bind(this);
        this.editStage = this.editStage.bind(this);
        this.addStage = this.addStage.bind(this);
        this.reloadStageList = this.reloadStageList.bind(this);
        this.aggregatedCard = React.createRef();
        this.activeCard = React.createRef(); 
        this.recoveredCard = React.createRef();       
    }

    componentDidMount() {
        this.reloadStageList();
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

    reloadStageList() {
        StageService.fetchStages()
        .then((response) => {
            this.setState({
              stages: response.data,
            });
            this.aggregatedCard.current.changeValue(this.state.stages.length);
            this.activeCard.current.changeValue(this.getSummaryStatusOpen(this.state.stages)); 
            this.recoveredCard.current.changeValue(this.getSummaryStatusClosed(this.state.stages));               
          })
          .catch((e) => {
            console.log(e);
          });
    }

    deleteStage(stageId) {
        StageService.deleteStage(stageId)
           .then(res => {
                swal({
                    title: "Se elimino anuncio con exito!",
                    text: res.data.message,
                    icon: "success",
                });
            this.setState({stages: this.state.stages.filter(stage => stage.id !== stageId)});
            this.reloadStageList()
           })
    }

    editStage(id) {
        window.localStorage.setItem("stageId", id);
        this.props.history.push('/edit-stage');
    }

    addStage() {
        window.localStorage.removeItem("stageId");
        this.props.history.push('/add-stage');
    }
    
    render() {       
        return (
        <div>
        {this.state.stages.length > 0 ?       
            <Alert severity="success">
                <AlertTitle>Exitoso</AlertTitle>
                Se ha cargado los registros correctamente
             </Alert> :
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
                'No existen registros asociados/No se ha cargado la base de datos'                    
            </Alert>         
        }                 
        {/* Cards */}
        <div className="row col-12 mx-auto">
          <Card 
          ref={this.aggregatedCard}
          title="Convocatorias agregadas" 
          value={0}
          color='#F9345E'/>
          <Card 
          ref={this.activeCard}
          title="Convocatorias abiertas" 
          value={0}
          color='#FA6400'/>
          <Card 
          ref={this.recoveredCard}
          title="Convocatorias finalizadas" 
          value={0}
          color='#1CB142'/>
          <Card 
          ref={this.deathsCard}
          title="Ultima convocatoria" 
          value={0}
          color='#6236FF'/>
        </div>
        <Pagination 
         increment={this.increment} 
         decrement={this.decrement} 
         page={this.state.pageCounter} 
       />                    
        <Typography variant="h4" style={style}>Detalles de las etapas</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre de la etapa</TableCell>
                            <TableCell align="right">editar</TableCell>
                            <TableCell align="right">Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.stages.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="right" onClick={() => this.editStage(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deleteStage(row.id)}><DeleteIcon /></TableCell>
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

export default ListStageComponent;