import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from './InputMoment.js';
import moment from 'moment';

const randomStr = (length = 5)=>{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};
const elementPosition = (el_id)=>{
	let el = document.getElementById(el_id);
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

class DropdownPicker extends Component {
	constructor(props){
		super(props);
		this.state = {
			open: false
		};
		this.input_id = "mdatetime-"+randomStr(6);
	}
	handleChange(name, m){
		if(( this.props.type =='date' && this.props.autoOk) || this.props.showButtons){
			this.close();
		}
		this.props.onChange(name, m);
	}
	handleKeyDown(event){
		if(event.keyCode == 8){ // backspace
			this.props.onChange(this.props.name, null);
			this.close();
		}
	}
	handleClickOut(event){
		if(event.target.id == event.currentTarget.id){
			this.close();
		}
	}
	handleClear(event){
		this.props.onChange(this.props.name, null);
	}
	handleShortKeys(event){
		if(event.keyCode == 27){
			this.close(event);
		}
	}
	open(){
		this.setState({open: true})
		document.addEventListener("keydown", this.handleShortKeys.bind(this)); 
	}
	close(){
		this.setState({open: false});
		document.removeEventListener("keydown", this.handleShortKeys.bind(this)); 
	}
	toggle(){
		this.setState({open: !this.state.open});
	}

	render() {

		const format = this.props.format ? this.props.format : "LLLL";
		let value = this.props.value ? this.props.value : null;
		if(value instanceof Date){
			value = moment(value);
		}
		if(value){
			value.locale(this.props.locale);
		}
		const readableValue = value ? value.format(format) : "";
		
		return(
			<React.Fragment>
				<input 
					id={this.input_id} 
					className={this.props.className ? this.props.className : "form-control"} 
					type="text" 
					onClick={this.open.bind(this)} 
					onFocus={this.open.bind(this)} 
					value={readableValue} 
					placeholder={this.props.placeholder} 
					// readOnly
					onKeyDown={this.handleKeyDown.bind(this)}
				/>
				
				{this.props.value && <span className={"x-remove"} onClick={this.handleClear.bind(this)} />}

				{this.state.open === true &&
				
				<React.Fragment>
					<div style={{position: "relative"}}>
						<InputMoment
							className={"dropdown "+(elementPosition(this.input_id).top < 500 ? "arrow-up" : "arrow-down")}
							autoOk={this.props.type!='date' ? false : this.props.autoOk}
							showButtons={this.props.showButtons}
							prevMonthIcon={this.props.prevMonthIcon}
							nextMonthIcon={this.props.nextMonthIcon}
							minStep={this.props.minStep}
							hourStep={this.props.hourStep}
							type={this.props.type}
							theme={this.props.theme}
							labels={this.props.labels}
							firstDayOfWeek={this.props.firstDayOfWeek}
							locale={this.props.locale}

							value={this.props.value}
							name={this.props.name}
							onChange={this.handleChange.bind(this)}
							onCancel={this.toggle.bind(this)}
						/>
					</div>
					<div id={this.input_id} className="back-layer" onClick={this.close.bind(this)} ></div>
				</React.Fragment>}
			</React.Fragment>
		)
	}
}
DropdownPicker.defaultProps = {
	format: "LLLL",
	autoOk: true,
	showButtons: false,
};
export default DropdownPicker;
