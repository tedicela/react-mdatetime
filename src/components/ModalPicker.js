import React, { Component } from 'react';
import InputMoment from './InputMoment.js';

class ModalPicker extends Component {
	constructor(props){
		super(props);
		this.state = {
			open: false,
		};
	}
	handleChange = (name, m)=>{
		this.close();
		this.props.onChange(name, m);
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
		const readableValue = this.props.value ? this.props.value.format(format) : null;

		return(
			<div>
				<input className="form-control" type="text" onClick={this.open.bind(this)} value={readableValue} />
				{this.state.open === true &&
				<React.Fragment>
				<div className={"modal-picker"}>
					<InputMoment
						locale={this.props.locale}
						moment={this.state.value ? this.state.value : this.props.value}
						type={this.props.type}
						theme={this.props.theme}
						name={this.props.name}
						onChange={this.handleChange}
						minStep={this.props.minStep}
						onCancel={this.toggle.bind(this)}
						labels={this.props.labels}
						showButtons={true}
					/>
				</div>
					<div className="back-layer-modal" onClick={this.close.bind(this)} ></div>
				</React.Fragment>
				}
			</div>
		)
	}
}
export default ModalPicker;