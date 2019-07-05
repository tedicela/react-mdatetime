import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import packageJson from '../package.json';
import DateTimePicker from "../src/index";

import './app.less';

//moment.locale(props.locale);

class App extends Component {
  state = {
    dropdown_picker1: moment(),
    input_moment: moment(),
    modal_picker: moment(),
    dropdown_picker2: moment(),
  };
  handleChange = (name, m) => {
    this.setState({[name]: m});
  };

  render() {
    return (
      <div className="app">
        <h1>
          {packageJson.name}: {packageJson.version}
        </h1>
        <h2>{packageJson.description}</h2>
        <form>
       
        <p>Dropdown datetime picker: </p>
        <div className="m-t">
          <DateTimePicker
            mode="dropdown"
            locale={"it"}
            moment={this.state.dropdown_picker1}
            type={"datetime"}
            theme={"dark"}
            name="dropdown_picker1"
            onChange={this.handleChange}
            minStep={5}
          />
        </div>

        <p>Inline datetime picker: </p>
        <div className="m-t">
            <DateTimePicker
              mode="inline"
              locale={"it"}
              type={"datetime"}
              theme={"dark"}
              moment={this.state.input_moment}
              name="input_moment"
              onChange={this.handleChange}
              minStep={5}
            />
          </div>

          <p>Modal datetime picker: </p>
          <div className="m-t">
            <DateTimePicker
              //mode="modal"
              locale={"it"}
              value={this.state.modal_picker}
              type={"date"}
              theme={"light"}
              name="modal_picker"
              onChange={this.handleChange}
              minStep={5}
              labels={{
                save: "Salva",
                cancel: "Annulla",
                date: "Data",
                time: "Ora",
                hours: "Ore",
                minutes: "Minuti",
              }}
            />
          </div>

          <p>Dropdown datetime picker: </p>
          <div className="m-t">
            <DateTimePicker
              mode="dropdown"
              locale={"it"}
              moment={this.state.dropdown_picker2}
              type={"datetime"}
              theme={"dark"}
              name="dropdown_picker2"
              onChange={this.handleChange}
              minStep={5}
            />
          </div>
          
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
