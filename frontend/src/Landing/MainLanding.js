import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import BottomBar from './BottomBar'
import Sidebar from './Sidebar'
import Toolbar from './Toolbar'
import MainArea from './MainArea'
import './MainLanding.css';


class LandingScreen extends Component {
  render() {
    return (
      <div className='whole'>
        <Sidebar />
        <Col xs={12} sm={10} lg={10} className='mainArea'>
          <Toolbar />

          <MainArea />

          <BottomBar />
        </Col>
      </div>
    );
  }
}

export default LandingScreen;