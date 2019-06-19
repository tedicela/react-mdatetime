import React, { Component } from 'react';
import InputMoment from './InputMoment.js';

class ModalPicker extends Component {
	constructor(props){
		super(props);
		this.state = {
			open: false
		};
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
				<div className={"modal-picker"}>
					<InputMoment
						moment={this.props.moment}
						type={this.props.type}
						theme={this.props.theme}
						onChange={this.props.onChange}
						minStep={this.props.minStep}
						onSave={this.props.onSave}
						onCancel={this.toggle.bind(this)}
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