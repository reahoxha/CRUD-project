import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddIndModal} from './AddIndModal';
import {EditIndModal} from './EditIndModal';

export class Ngjyrat extends Component{

    constructor(props){
        super(props);
        this.state={inds:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'ngjyrat')
        .then(response=>response.json())
        .then(data=>{
            this.setState({inds:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteInd(indid){
        if(window.confirm('Are you sure')){
            fetch(process.env.REACT_APP_API+'ngjyrat/'+indid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {inds, indid, indname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
               <Table className="mt-4" striped borderd hover size="sm">
                   <thead>
                       <tr>
                        <th>NgjyraId</th>
                       <th>NgjyraLloji</th>
                       <th>Options</th>
                       </tr>
                   </thead>
                   <tbody>
                       {inds.map(ind=>
                         <tr key={ind.NgjyraID}>
                             <td>{ind.NgjyraID}</td>
                             <td>{ind.NgjyraLloji}</td>
                             <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        indid:ind.NgjyraID,indname:ind.NgjyraLloji})}>
           Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteInd(ind.NgjyraID)}>
           Delete
        </Button>

    <EditIndModal show={this.state.editModalShow}
    onHide={editModalClose}
    indid={indid}
    indname={indname}/>

</ButtonToolbar>
                             </td>
                         </tr>)}
                   </tbody>
               </Table>

               <ButtonToolbar>
                   <Button variant='primary'
                   onClick={()=>this.setState({addModalShow:true})}>
                    Shto Ngjyren</Button>

                    <AddIndModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
               </ButtonToolbar>
            </div>
        )
    }
}