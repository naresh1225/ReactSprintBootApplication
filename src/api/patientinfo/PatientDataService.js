import axios from 'axios'

class PatientDataService {
    retrieveAllTodos(name) {
        //console.log('executed service')
        return axios.get(`http://localhost:8081/jpa/users/${name}/patientinfo`);

    }
    deleteTodo(name, id) {
        console.log('executed service in delete :' +id)
        return axios.delete(`http://localhost:8081/jpa/users/${name}/patient/${id}`);
    }
    retrievePatientInfo(name) {
        
        //console.log('executed service :'+ name)
        return axios.get(`http://localhost:8081/jpa/users/${name}/patientdetails`);
    }


    // retrievePatientInfoId(name,id) {
    //     //console.log('executed service')
    //     return axios.get(`http://localhost:8081/jpa/users/${name}/patient/{id}`);
    // }


    retrievePatientDetailsId(name, id) {
        console.log('executed service id in retrieve details:'+ id)
        return axios.get(`http://localhost:8081/jpa/users/${name}/patientdetails/${id}`);
    }


    updatePatient(name, id, patientdetials) {
        console.log('executed service  update: '+id )
        return axios.put(`http://localhost:8081/jpa/users/${name}/updatepatient/${id}`, patientdetials);
    }

    createPatient(name,patientdetials) {
        console.log('executed service create')
        return axios.post(`http://localhost:8081/jpa/users/${name}/updatepatient`, patientdetials);
    }

   


}

export default new PatientDataService()







