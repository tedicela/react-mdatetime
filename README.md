# react-mdatetime
[![npm](https://img.shields.io/npm/v/react-mdatetime.svg)](https://www.npmjs.com/package/react-mdatetime)
[![Build Status](https://travis-ci.org/tedicela/react-mdatetime.svg?branch=master)](https://travis-ci.org/tedicela/react-mdatetime)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This is a fork of the github project [input-moment](https://github.com/wangzuo/input-moment)

React datetime/date/time picker powered by [momentjs](http://momentjs.com)

The design is from https://dribbble.com/shots/1439965-Due-Date-and-Time-Picker.

Icons are from [ionicons](http://ionicons.com/).

### Features
- [x] Just datepicker
- [x] Just timepicker
- [x] DateTime picker
- [x] Built in themes (dark/light/default)
- [x] Multi-language and Locales
- [x] First day of the week
- [x] Inline picker
- [x] Dropdown picker
- [x] Modal picker
- Native picker input on mobile devices (iOS, Android and other mobile OS)


### Installation
``` sh
npm i react-mdatetime --save
```

**Notice:** This module requires [moment](https://www.npmjs.com/package/moment) as a [peerDependency](https://docs.npmjs.com/files/package.json#peerdependencies).

### Demo
http://tedicela.github.io/react-mdatetime/example

### Usage
``` javascript

import DateTimePicker from "../src/DateTimePicker";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dropdown_picker1: moment(),
      input_moment: moment(),
      modal_picker: moment(),
      dropdown_picker2: moment(),
    }
  }
  handleChange = (name, m) => {
    this.setState({[name]: m});
  };
  render(){

    return(
      <div>
        <p>Dropdown datetime picker: </p>
        <div className="m-t">
          <DateTimePicker
            mode="dropdown"
            locale={"it"}
            moment={this.state.dropdown_picker1}
            type={"datetime"} // datetime | date | time
            theme={"dark"} // default | dark | light
            name="dropdown_picker1"
            onChange={this.handleChange}
            minStep={5}  // default minStep=1
            hourStep={1} // default hourStep=1
          />
        </div>

        <p>Inline datetime picker: </p>
        <div className="m-t">
          <DateTimePicker
            mode="inline"
            locale={"it"}
            type={"datetime"} // datetime | date | time
            theme={"dark"} // default | dark | light
            moment={this.state.input_moment}
            name="input_moment"
            onChange={this.handleChange}
            minStep={5}  // default minStep=1
            hourStep={1} // default hourStep=1
          />
        </div>

        <p>Modal datetime picker: </p>
        <div className="m-t">
          <DateTimePicker
            //mode="modal"
            locale={"it"}
            value={this.state.modal_picker}
            type={"date"} // datetime | date | time
            theme={"light"} // default | dark | light
            name="modal_picker"
            onChange={this.handleChange}
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
            type={"datetime"} // datetime | date | time
            theme={"dark"} // default | dark | light
            name="dropdown_picker2"
            onChange={this.handleChange}
            minStep={5} // default minStep=1
          />
        </div>
      </div>
    );
  }
}
```
Check [app.js](https://github.com/tedicela/react-mdatetime/blob/master/example/app.js) for a working example.

### Development
- npm install
- npm start
- http://localhost:8080

### License
MIT
