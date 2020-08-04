import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/api';

class AnnouncementService {

    fetchAnnouncements() {
        return axios.get(USER_API_BASE_URL + '/announcements');
    }

    fetchAnnouncementById(announcementId) {
        return axios.get(USER_API_BASE_URL + '/announcement/' + announcementId);
    }

    deleteAnnouncement(announcementId) {
        return axios.delete(USER_API_BASE_URL + '/announcement/' + announcementId);
    }

    addAnnouncement(announcement) {
       return axios.post(USER_API_BASE_URL + '/createannouncement', announcement) 
    }

    editAnnouncement(announcement) {
        return axios.put(USER_API_BASE_URL + '/editannouncement/' + announcement.id);
    }
}

export default new AnnouncementService();