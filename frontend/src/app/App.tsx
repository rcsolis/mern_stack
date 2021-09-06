import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./routes/routes";
import Header from "./components/Header";
import store from "./store";
import { Provider } from "react-redux";

function App () {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header/>
                <Switch>
                    {
                        routes.map((el, idx) => (
                            <Route key={`route${idx}`} exact path={el.path} component={el.component}/>
                        ))
                    }
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
