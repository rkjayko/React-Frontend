import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("announcements");
  }

  get(id) {
    return http.get(`announcements/${id}`);
  }

  create(data) {
    return http.post("createannouncement", data);
  }

  update(id, data) {
    return http.put(`announcements/${id}`, data);
  }

  delete(id) {
    return http.delete(`announcements/${id}`);
  }

  deleteAll() {
    return http.delete(`announcements`);
  }

  findByAnnouncementName(title) {
    return http.get(`announcements?AnnouncementName=${title}`);
  }
}

export default new TutorialDataService();