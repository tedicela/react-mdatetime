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
http://tedicela.github.io/react-mdatetime

### Usage
``` javascript
<InputMoment
  type={"datetime"} // datetime | date | time
  theme={"dark"} // default | dark | light
  moment={this.state.moment}
  onChange={this.handleChange}
  onSave={this.handleSave}
  minStep={1} // default
  hourStep={1} // default
  prevMonthIcon="ion-ios-arrow-left" // default
  nextMonthIcon="ion-ios-arrow-right" // default
/>
```
Check [app.js](https://github.com/tedicela/react-mdatetime/blob/master/example/app.js) for a working example.

### Development
- npm install
- npm start
- http://localhost:8080

### License
MIT
