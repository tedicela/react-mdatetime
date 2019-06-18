import cx from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import Calendar from './Calendar.js';
import Time from './Time.js';

class InputMoment extends Component {
  static defaultProps = {
    prevMonthIcon: 'ion-ios-arrow-left',
    nextMonthIcon: 'ion-ios-arrow-right',
    minStep: 1,
    hourStep: 1,
    type: "datetime",
    theme: "default"
  };
  
  constructor(props){
	  super(props);
	  this.state = {
		tab: props.type == "time" ? 1 : 0
	  };  
  }

  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  handleSave = e => {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
  };

  render() {
    const { tab } = this.state;
    const {
	  type,
	  theme,
      moment: m,
      className,
      prevMonthIcon,
      nextMonthIcon,
      minStep,
      hourStep,
      onSave,
      ...props
    } = this.props;
    
    const cls = cx('m-input-moment', className, theme !== 'default' ? theme : null);
	
    return (
      <div className={cls} {...props}>
        <div className="options">
          
          {['datetime'].indexOf(type) > - 1 &&
          <button
            type="button"
            className={cx('ion-calendar im-btn', { 'is-active': tab === 0 })}
            onClick={e => this.handleClickTab(e, 0)}
          >
            Date
          </button>}
          {['datetime'].indexOf(type) > - 1 &&
          <button
            type="button"
            className={cx('ion-clock im-btn', { 'is-active': tab === 1 })}
            onClick={e => this.handleClickTab(e, 1)}
          >
            Time
          </button>}
        </div>

        <div className="tabs">
          {['datetime','date'].indexOf(type) > - 1 &&
          <Calendar
            className={cx('tab', { 'is-active': tab === 0 })}
            moment={m}
            onChange={this.props.onChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
          />}
          {['datetime','time'].indexOf(type) > - 1 &&
          <Time
            className={cx('tab', { 'is-active': tab === 1 })}
            moment={m}
            minStep={this.props.minStep}
            hourStep={this.props.hourStep}
            onChange={this.props.onChange}
          />}
        </div>

		<div className="btn-container" >
			{this.props.onSave ? (
			  <button
				type="button"
				className="im-btn btn-save ion-checkmark"
				onClick={this.handleSave}
			  >
				Save
			  </button>
			) : null}
			  <button
				type="button"
				className="im-btn btn-cancel ion-close"
				onClick={this.props.onCancel && this.props.onCancel}
			  >
				Cancel
			  </button>
          </div>
      </div>
    );
  }
}
export default InputMoment;
