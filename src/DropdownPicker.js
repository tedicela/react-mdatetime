import React, { Component } from 'react';
import InputMoment from './InputMoment.js';

const randomStr = (length = 5)=>{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};
const elementPosition = (el)=>{
	
	return{
		top: 100
	};
	
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
		const readableValue = this.props.moment.format(format);

		return(
			<div>
				<input className="form-control" type="text" onClick={this.open.bind(this)} value={readableValue} />
				{this.state.open === true &&
				<React.Fragment>
				<div style={{position: "relative"}}>
					<InputMoment
						className={"dropdown "+(elementPosition(document.getElementById(this.input_id)).top < 500 ? "arrow-up" : "arrow-down")}
						moment={this.props.moment}
						type={this.props.type}
						theme={this.props.theme}
						onChange={this.props.onChange}
						minStep={this.props.minStep}
						onSave={this.props.onSave}
						onCancel={this.toggle.bind(this)}
					/>
				</div>
				<div className="back-layer" onClick={this.close.bind(this)} ></div>
				</React.Fragment>
				}
			</div>
		)
	}
}
export default DropdownPicker;