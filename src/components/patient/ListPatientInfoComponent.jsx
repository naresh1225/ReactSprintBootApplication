import React, {Component} from 'react'

import PatientDataService from '../../api/patientinfo/PatientDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListPatientInfoComponent extends Component {

    constructor(props){
        //console.log('constructor')
        super(props)
        this.state = {
            todos : [],
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)   
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    // componentWillUnmount() {
    //     console.log('componentWillUnmount')
    // }
    
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('shouldComponentUpdate')
    //     console.log(nextProps)
    //     console.log(nextState)
    //     return true
    // }

    componentDidMount() {
        //console.log('componentDidMount')
        this.refreshTodos();
        //console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        PatientDataService.retrieveAllTodos(username)
          .then(
              response => {
                  //console.log("info detials"+response);
                  this.setState({todos : response.data})
              }
          ) 
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        PatientDataService.deleteTodo(username, id)
         .then (
             response => {
                this.setState({message : `Delete of todo ${id} Successful`})
                this.refreshTodos()
             }
         )
        
    }

    render() {
        //console.log('render')
        return (
            <div>
                 <h1>Prescription Detials</h1>
                 {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Medication</th>
                                <th>Description</th>
                                <th>ToRefill</th>
                                <th>Refill Date</th>       
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.medication}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.refill.toString()}</td>
                                        {/* <td>{todo.targetDate.toString()}</td> */}
                                        <td>{moment(todo.targetDate).format('DD-MM-YYYY')}</td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                 </div>
            </div>
        )
    }
}

export default ListPatientInfoComponent