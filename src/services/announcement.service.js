import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/api/announcements';

class AnnouncementService {

    fetchAnnouncements() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchAnnouncementById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    deleteAnnouncement(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    addAnnouncement(user) {
        return axios.post(""+USER_API_BASE_URL, user);
    }

    editAnnouncement(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }

}

export default new AnnouncementService();