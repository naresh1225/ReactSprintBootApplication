import axios from 'axios'

class HelloWorldService {
    
    executeHelloWorldService() {
        console.log('executed service')
        return axios.get('http://localhost:8081/hello-world');        
    }

    executeHelloWorldBeanService() {
        //console.log('executed service')
        return axios.get('http://localhost:8081/hello-world-bean');        
    }
    executeHelloWorldPathVariableService(name) {
        //console.log('executed service')
        return axios.get(`http://localhost:8081/hello-world/path/${name}`);        
    }

}

export default new HelloWorldService()