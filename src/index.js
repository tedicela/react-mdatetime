import './less/input-moment.less';
import './less/theme-dark.less';
import './less/theme-light.less';
import './less/dropdown-picker.less';
import './less/modal-picker.less';

import React from 'react';
import InputMoment from './components/InputMoment.js';
import DropdownPicker from "./components/DropdownPicker.js";
import ModalPicker from "./components/ModalPicker.js";

const DateTimePicker = (props)=>{
	return (
		props.mode == "inline" ? 
			<InputMoment {...props} />
		: props.mode == "dropdown" ?
			<DropdownPicker {...props} />
		: <ModalPicker {...props} />
	);
}
export default DateTimePicker;
