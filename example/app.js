import '../src/less/input-moment.less';
import '../src/less/theme-dark.less';
import '../src/less/theme-light.less';
import '../src/less/dropdown-picker.less';
import '../src/less/modal-picker.less';

import './app.less';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from '../src/InputMoment.js';
import packageJson from '../package.json';

import DropdownPicker from "../src/DropdownPicker.js";
import ModalPicker from "../src/ModalPicker.js";

//moment.locale(props.locale);

class App extends Component {
  state = {
    m: moment()
  };
  handleChange = m => {
    this.setState({ m });
  };

  handleSave = () => {
    console.log('saved', this.state.m.format('llll'));
  };

  render() {
    return (
      <div className="app">
        <h1>
          {packageJson.name}: {packageJson.version}
        </h1>
        <h2>{packageJson.description}</h2>
        <form>

          <div className="m-t">
            <ModalPicker
                moment={this.state.m}
                type={"datetime"}
                theme={"dark"}
                onChange={this.handleChange}
                minStep={5}
                onSave={this.handleSave}
            />
          </div>

          {/* <div className="input m-t">
            <input type="text" value={this.state.m.format('llll')} readOnly />
          </div>
          <div className="m-b">
            <InputMoment
              locale={"it"}
              type={"datetime"}
              theme={"dark"}
              moment={this.state.m}
              onChange={this.handleChange}
              minStep={5}
              onSave={this.handleSave}
            />
          </div> */}
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
