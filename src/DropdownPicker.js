import React, { Component } from 'react';
import InputMoment from './InputMoment.js';

class DropdownPicker extends Component {
	constructor(props){
		super(props);
		this.state = {
			open: false
		};
	}
	open() {
		this.setState({
			open: !this.state.open,
		})
	}

	render() {
		return(
			<div>Test
				<input className="form-control" type="text" onClick={this.open.bind(this)}/>

				{this.state.open === true ?
					<React.Fragment>
						<InputMoment
							moment={this.props.moment}
							type={this.props.type}
							theme={this.props.theme}
							onChange={this.props.onChange}
							minStep={this.props.minStep}
							onSave={this.props.onSave}
						/>
					</React.Fragment>
					: null
				}
			</div>
		)
	}
}
export default DropdownPicker;