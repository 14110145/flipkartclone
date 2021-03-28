import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getInitialData, isUserLoggedIn } from "./actions";
import "./App.css";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Category from "./containers/Categorys";
import Home from "./containers/Home";
import Orders from "./containers/Orders";
import Page from "./containers/Page";
import Products from "./containers/Products";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/page" component={Page} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/orders" component={Orders} />

          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
