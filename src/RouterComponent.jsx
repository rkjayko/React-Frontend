import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListAnnouncementComponent from "../src/components/Announcement/ListAnnouncementComponent";
import AddAnnouncementComponent from "../src/components/Announcement/AddAnnouncementComponent";
import EditAnnouncementComponent from "../src/components/Announcement/EditAnnouncementComponent";
import ListCandidateComponent from "../src/components/Candidate/ListCandidateComponent";
import AddCandidateComponent from "../src/components/Candidate/AddCandidateComponent";

import React from "react";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact component={ListAnnouncementComponent} />
                        <Route path="/announcements" component={ListAnnouncementComponent}/>
                        <Route path="/add" component={AddAnnouncementComponent} />
                        <Route path="/edit-announcement" component={EditAnnouncementComponent}/>
                        <Route path="/candidates" component={ListCandidateComponent}/>
                        <Route path="/add-candidate" component={AddCandidateComponent}/>
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;