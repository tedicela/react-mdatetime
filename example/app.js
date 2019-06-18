import '../src/less/input-moment.less';
import '../src/less/theme-dark.less';
import '../src/less/theme-light.less';
import './app.less';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from '../src/InputMoment.js';
import packageJson from '../package.json';
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
          <div className="input">
            <input type="text" value={this.state.m.format('llll')} readOnly />
          </div>
          <InputMoment
            locale={"it"}
			      type={"datetime"}
			      theme={"dark"}
            moment={this.state.m}
            onChange={this.handleChange}
            minStep={5}
            onSave={this.handleSave}
          />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
