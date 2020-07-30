import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/api';

class CandidateService {

    fetchCandidates() {
        return axios.get(USER_API_BASE_URL + '/candidates');
    }

    fetchCandidateById(candidateId) {
        return axios.get(USER_API_BASE_URL + '/candidate/' + candidateId);
    }

    deleteCandidate(candidateId) {
        return axios.delete(USER_API_BASE_URL + '/candidate/' + candidateId);
    }

    addCandidate(candidate) {
        return axios.post("" + USER_API_BASE_URL + '/createcandidate', candidate);
    }

    editCandidate(candidate) {
        return axios.put(USER_API_BASE_URL + '/editcandidate/' + candidate.id);
    }

}

export default new CandidateService();