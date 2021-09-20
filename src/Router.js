import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/_home";
import NewPosts from "./pages/_newPost";
import Log from "./pages/_log";
import View from "./pages/_view";
import NotFound from "./pages/_pageNotFound";
import {useState} from "react";
import React from "react";


const GetCorrectPage = ()=>{
    const [username_, setUsername] = useState("");
    const [isLoggedin, setLoggedin] = useState(false);
    return(
        <Router>
            <div className="Router">
                <Switch>
                    <Route exact path="/">
                        <Home filt={""}/>
                    </Route>
                    <Route exact path="/home">
                        <Home filt={""}/>
                    </Route>
                    <Route exact path="/newPost">
                        <NewPosts/>
                    </Route>
                    <Route exact path="/home/older">
                        <Home filt={"older"}/>
                    </Route>
                    <Route exact path="/home/new">
                        <Home filt={"new"}/>
                    </Route>
                    <Route exact path="/home/myPosts">
                        <Home filt={"myPost"}/>
                    </Route>
                    <Route exact path="/create">
                        <Log/>
                    </Route>
                    <Route path="/view/:id">
                        <View/>
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default GetCorrectPage;