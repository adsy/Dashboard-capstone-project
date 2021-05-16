import React from "react";
import "./App.css";
import "./body.css";
import "antd/dist/antd.css";
import cubejs from "@cubejs-client/core";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Listings from "./pages/ListingDashboard";
import Login from "./pages/Login2";
import Commission from "./pages/Commission";
import SideBar from "./components/SideBar";
import HeaderItem from "./components/Header";
import { CubeProvider } from "@cubejs-client/react";
import { Layout } from "antd";

const { Content } = Layout;

// setup context to register login
export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  isRegistered: false,
  token: null
};

// reducer with a switch case, used to set state of context
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("jwt", JSON.stringify(action.payload.data.areas));
      return {
        ...state,
        isAuthenticated: true,
        isRegistered: false,
        token: action.payload.data.areas
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        isRegistered: false,
        token: null
      };
    default:
      return state;
  }
};

// top level application layout
function AppLayout({ children, state }) {
  return (
    <div>
      {!state.isAuthenticated ? (
        <Login />
      ) : (
        <Layout>
          <HeaderItem state={state.isAuthenticated} />
          <Layout>
            <Layout.Sider width={80}>
              <SideBar state={state} />
            </Layout.Sider>
            <Layout.Content>
              <Content style={{ padding: "40px 70px" }}>{children}</Content>
            </Layout.Content>
          </Layout>
        </Layout>
      )}
    </div>
  );
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  let hostname = window.location.hostname;
  // cube js provider setup
  const CUBEJS_TOKEN = JSON.parse(localStorage.getItem("jwt"));
  const cubejsApi = cubejs(CUBEJS_TOKEN, {
    apiUrl: "http://" + hostname + process.env.REACT_APP_API_URL
  });

  return (
    <Router>
      <CubeProvider cubejsApi={cubejsApi}>
        <AuthContext.Provider
          value={{
            state,
            dispatch
          }}
        >
          <AppLayout state={state}>
            <Switch>
              <Route exact path="/">
                <div className="App">
                  {!state.isAuthenticated ? (
                    <Login />
                  ) : (
                    <Redirect to="/listings" />
                  )}
                </div>
              </Route>
              <Route path="/listings">
                <Listings state={state} />
              </Route>
              <Route path="/commissions">
                <Commission />
              </Route>
              <Route path="/logout">
                <Redirect to="/" />
              </Route>
            </Switch>
          </AppLayout>
        </AuthContext.Provider>
      </CubeProvider>
    </Router>
  );
}

export default App;
