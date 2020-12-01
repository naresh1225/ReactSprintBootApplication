import React, { Component } from 'react'
import PatientDataService from '../../api/patientinfo/PatientDataService.js'
import AuthenticationService from './AuthenticationService.js'

class PatientDetialsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: [],
            message: null
        }
        this.refreshDetails = this.refreshDetails.bind(this);
        this.updateInfoClicked = this.updateInfoClicked.bind(this)   
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
        this.refreshDetails();
        //console.log(this.state)
    }

    refreshDetails() {
        let username = AuthenticationService.getLoggedInUserName()
        PatientDataService.retrievePatientInfo(username)
            .then(
                response => {
                    //console.log(response);
                    this.setState({ details: response.data })
                    //console.log("testing" + JSON.stringify(this.state.details));
                }
            )
    }


    updateInfoClicked(id) {
        //console.log("inside the click"+id)

        this.props.history.push(`/updateinfo/${id}`)
        // let username = AuthenticationService.getLoggedInUserName()
        // //console.log(id + " " + username);
        // PatientDataService.deleteTodo(username, id)
        //  .then (
        //      response => {
        //         this.setState({message : `Delete of todo ${id} Successful`})
        //         this.refreshTodos()
        //      }
        //  )
        
    }

    render() {
        return (
            <div>
                <h1>Patient Detials</h1>
                <div className="container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Patient Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Policy Number</th>
                                <th>UserName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.details.map(
                                    info =>
                                        <tr key={info.id}>
                                            <td>{info.id}</td>
                                            <td>{info.firstname}</td>
                                            <td>{info.lastname}</td>
                                            <td>{info.email}</td>
                                            <td>{info.phonenumber}</td>
                                            <td>{info.policynumber}</td>
                                            <td>{info.username}</td>
                                            <td><button className="btn btn-warning" onClick={() => this.updateInfoClicked(info.id)}>Update</button></td>

                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }

}

export default PatientDetialsComponent