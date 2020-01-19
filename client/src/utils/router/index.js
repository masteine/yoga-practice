import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import { Sugar } from 'react-preloaders';
import RenderRoute from './routes';
import Home from '../../views/Home/_routes';
// import Login from '../../views/Login/_routes';
// import Register from '../../views/Register/_routes';

const mergedRoutes = [...Home];

class AppRouter extends React.Component {
  render() {
    // const authStatus = localStorage.getItem('access-token');
    const authStatus = false;
    return (
      <Router history={this.props.history}>
        <div>
          <main>
            <Switch>
              {mergedRoutes.map((route, i) => (
                <RenderRoute key={i} auth={authStatus} {...route} />
              ))}
            </Switch>
          </main>

          <Sugar />
        </div>
      </Router>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(AppRouter);
