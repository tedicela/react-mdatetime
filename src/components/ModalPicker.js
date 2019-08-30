import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from './InputMoment.js';

const randomStr = (length = 5)=>{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};
class ModalPicker extends Component {
	constructor(props){
		super(props);
		this.state = {
			open: false,
		};
		this.input_id = "mdatetime-modal-"+randomStr(6);
	}
	handleKeyDown(event){
		if(event.keyCode == 8){
			this.props.onChange(this.props.name, null);
			this.setState({open: false});
		}
	}
	handleChange(name, value){
		this.props.onChange(this.props.name, value);
		this.close();
	}
	open(){
		this.setState({open: true})
	}
	close(event){
		this.setState({open: false});
	}
	handleClickOut(event){
		if(event.target.id == event.currentTarget.id){
			this.close();
		}
	}
	toggle(){
		this.setState({open: !this.state.open});
	}

	render() {

		const format = this.props.format ? this.props.format : "LLLL";
		const readableValue = this.props.value ? this.props.value.format(format) : "";

		return(
			<div>
				<input 
					id={this.props.id ? this.props.id : this.input_id}
					className={this.props.className ? this.props.className : "form-control"} 
					type="text" 
					onClick={this.open.bind(this)} 
					value={readableValue}
					placeholder={this.props.placeholder} 
					readOnly
					onKeyDown={this.handleKeyDown.bind(this)}
				/>
				{this.state.open === true &&
				ReactDOM.createPortal(
				<div  id={this.input_id+"-layer"} className="back-layer-modal" >
					<div id={this.input_id} className={"modal-picker"} onClick={this.handleClickOut.bind(this)}>
						<InputMoment
							locale={this.props.locale}
							value={this.state.value ? this.state.value : this.props.value}
							type={this.props.type}
							theme={this.props.theme}
							name={this.props.name}
							onChange={this.handleChange.bind(this)}
							minStep={this.props.minStep}
							onCancel={this.close.bind(this)}
							labels={this.props.labels}
							showButtons={true}
						/>
					</div>
				</div>, document.body)}
			</div>
		)
	}
}
export default ModalPicker;