import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PatientDataService from '../../api/patientinfo/PatientDataService.js'
import AuthenticationService from './AuthenticationService.js'
import {Link} from 'react-router-dom'

class UpdateComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            phonenumber: '',
            // email : '',
            // username : '',
            // policynumber : '',
            // firstname : '',
            // lastname : '',
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName()
        PatientDataService.retrievePatientDetailsId(username, this.state.id)
            //.then(response => console.log(response))
            .then(response => this.setState({
                phonenumber: response.data.phonenumber,
                email: response.data.email,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                policynumber: response.data.policynumber,
                username: response.data.username

            }))

    }

    validate(values) {
        let errors = {}
        if (!values.phonenumber) {
            errors.phonenumber = 'Please enter updated phonenumber'
        } else if (values.phonenumber.length < 10) {
            errors.phonenumber = 'Enter 10 digited phone number'
        }
        return errors
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log("the user name"+this.state.id)
        PatientDataService.updatePatient(username, this.state.id, {
            id: this.state.id,
            phonenumber: values.phonenumber,
            email: values.email,
            firstname: values.firstname,
            lastname: values.lastname,
            username: values.username,
            policynumber: values.policynumber

        })
            .then(
                () =>
                    this.props.history.push(`/patientdetials/`)
            )
        console.log(values);

    }

    render() {
        let phonenumber = this.state.phonenumber
        let email = this.state.email
        let firstname = this.state.firstname
        let lastname = this.state.lastname
        let username = this.state.username
        let policynumber = this.state.policynumber
        return (
            <div>
                <h1>Update Info</h1>
                <div className="container">
                    <Formik
                        initialValues={{ phonenumber, email, firstname, lastname, policynumber, username }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="phonenumber" component="div"
                                        className="alert alert-warning" />

                                    <fieldset className="form">
                                        <label>Phone Number</label>
                                        <Field className="form-control" type="text" name="phonenumber" />
                                    </fieldset>

                                     <fieldset className="form-group">
                                        <label>Email Address</label>
                                        <Field className="form-control" type="text" name="email"/>
                                    </fieldset>
                                   {/* <fieldset className="form-group">
                                        <label>First Name</label>
                                        <Field className="form-control" type="text" name="firstname"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Last Name</label>
                                        <Field className="form-control" type="text" name="lastname"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>User Name</label>
                                        <Field className="form-control" type="text" name="username"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Policy Number</label>
                                        <Field className="form-control" type="text" name="policynumber"/>
                                    </fieldset> */}
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default UpdateComponent