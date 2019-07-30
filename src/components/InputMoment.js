import cx from 'classnames';
import React, {Component} from 'react';
import Calendar from './Calendar.js';
import Time from './Time.js';
import moment from 'moment';

class InputMoment extends Component {
	static defaultProps = {
		prevMonthIcon: 'ion-ios-arrow-left',
		nextMonthIcon: 'ion-ios-arrow-right',
		minStep: 1,
		hourStep: 1,
		type: "datetime",
		theme: "default",
		labels: {
			save: "Save",
			cancel: "Cancel",
			date: "Date",
			time: "Time",
			hours: "Hours",
			minutes: "Minutes",
		},
		firstDayOfWeek: 1,
		locale: 'en',
	};

	constructor(props) {
		super(props);
		this.state = {
			value: null,
			tab: props.type == "time" ? 1 : 0
		};
	}
	handleChange = (m) => {
		this.setState({value: m});
		if(this.props.showButtons) return;
		this.props.onChange(this.props.name, m);
	}
	handleClickTab = (e, tab) => {
		e.preventDefault();
		this.setState({tab: tab});
	}
	handleSave = e => {
		e.preventDefault();
		this.props.onChange(this.props.name, this.state.value);
	}
	render() {
		const {tab} = this.state;

		const {
			type,
			theme,
			className,
			prevMonthIcon,
			nextMonthIcon,
			minStep,
			hourStep,
			firstDayOfWeek,
			locale,
			labels,
			...props
		} = this.props;

		const cls = cx('m-input-moment', className, theme !== 'default' ? theme : null);

		const m = this.state.value ? this.state.value : this.props.moment ? this.props.moment : moment();
		m.locale(locale);

		return (
			<div className={cls} {...props}>
				<div className="options">
					{['datetime'].indexOf(type) > -1 &&
					<button
						type="button"
						className={cx('ion-calendar im-btn', {'is-active': tab === 0})}
						onClick={e => this.handleClickTab(e, 0)}
					>
						{labels.date}
					</button>}
					{['datetime'].indexOf(type) > -1 &&
					<button
						type="button"
						className={cx('ion-clock im-btn', {'is-active': tab === 1})}
						onClick={e => this.handleClickTab(e, 1)}
					>
						{labels.time}
					</button>}
				</div>

				<div className="tabs">
					{['datetime', 'date'].indexOf(type) > -1 &&
					<Calendar
						className={cx('tab', {'is-active': tab === 0})}
						moment={m}
						onChange={this.handleChange}
						prevMonthIcon={this.props.prevMonthIcon}
						nextMonthIcon={this.props.nextMonthIcon}
						firstDayOfWeek={firstDayOfWeek}
						labels={this.props.labels}
						locale={locale}
					/>}
					{['datetime', 'time'].indexOf(type) > -1 &&
					<Time
						className={cx('tab', {'is-active': tab === 1})}
						moment={m}
						onChange={this.handleChange}
						minStep={this.props.minStep}
						hourStep={this.props.hourStep}
						locale={locale}
						labels={this.props.labels}
					/>}
				</div>
				{this.props.showButtons === true ?
					<div className="btn-container">
						<button
							type="button"
							className="im-btn btn-save ion-checkmark"
							onClick={this.handleSave}
						>
							{labels.save}
						</button>
						<button
							type="button"
							className="im-btn btn-cancel ion-close"
							onClick={this.props.onCancel && this.props.onCancel}
						>
							{labels.cancel}
						</button>

					</div>
					: null
				}
			</div>
		);
	}
}

export default InputMoment;
