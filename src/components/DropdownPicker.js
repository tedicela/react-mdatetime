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
		if(this.props.autoOk) this.close();
		this.props.onChange(name, m);
	}
	handleKeyDown(event){
		if(event.keyCode == 8){
			this.props.onChange(name, m);
			this.close();
		}
	}
	handleClickOut(event){
		if(event.target.id == event.currentTarget.id){
			this.close();
		}
	}
	open(){
		this.setState({open: true})
	}
	close(){
		this.setState({open: false});
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
		const readableValue = value ? value.format(format) : "";
		
		return(
			<div>
				<input 
					id={this.input_id} 
					className={this.props.className ? this.props.className : "form-control"} 
					type="text" 
					onClick={this.open.bind(this)} 
					value={readableValue} 
					placeholder={this.props.placeholder} 
					readOnly
					onKeyDown={this.handleKeyDown.bind(this)}
				/>
				{this.state.open === true &&
				
				<React.Fragment>
					<div style={{position: "relative"}}>
						<InputMoment
							className={"dropdown "+(elementPosition(this.input_id).top < 500 ? "arrow-up" : "arrow-down")}
							value={this.props.value}
							type={this.props.type}
							theme={this.props.theme}
							name={this.props.name}
							// onChange={this.props.onChange}
							onChange={this.handleChange.bind(this)}
							minStep={this.props.minStep}
							locale={this.props.locale}
							labels={this.props.labels}
							onCancel={this.toggle.bind(this)}
						/>
					</div>
					<div id={this.input_id} className="back-layer" onClick={this.close.bind(this)} ></div>
				</React.Fragment>}
			</div>
		)
	}
}
DropdownPicker.defaultPicker = {
	autoOk: true
};
export default DropdownPicker;
