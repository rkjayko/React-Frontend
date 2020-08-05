import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/api';

class StageService {

    fetchStages() {
        return axios.get(USER_API_BASE_URL + '/stages');
    }

    fetchStageById(stageId) {
        return axios.get(USER_API_BASE_URL + '/stage/' + stageId);
    }

    deleteStage(stageId) {
        return axios.delete(USER_API_BASE_URL + '/stage/' + stageId);
    }

    addStage(stage) {
        return axios.post("" + USER_API_BASE_URL + '/createstage', stage);
    }

    editStage(stage) {
        return axios.put(USER_API_BASE_URL + '/editstage/' + stage.id);
    }
}

export default new StageService();