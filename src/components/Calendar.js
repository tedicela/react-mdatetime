import moment from 'moment';
import React, { Component } from 'react';
import cx from 'classnames';
import range from 'lodash/range';
import chunk from 'lodash/chunk';

const Day = ({ i, w, d, m, className, ...props }) => {
  const prevMonth = w === 0 && i > 7;
  const nextMonth = w >= 4 && i <= 14;
  
  let today = moment(new Date());
  
  const cls = cx({
    'prev-month': prevMonth,
    'next-month': nextMonth,
    'current-day': !prevMonth && !nextMonth && i === d,
    'actual-day': today.date() == i && today.month() == m.month(),
  });

  return <td className={cls} {...props}>{i}</td>;
};

export default class Calendar extends Component {
  
  static defaultProps = {
    firstDayOfWeek: 1,
  }
  constructor(props){
    super(props);
    this.state = {
      open_yearUI: false,
      moment: props.moment,
    };
    moment.locale(props.locale);
    this.handleShortKeys = this.handleShortKeys.bind(this);
    document.addEventListener("keydown", this.handleShortKeys);
  }
  handleShortKeys(event){
    switch(event.keyCode){ 
      case 13: // Enter
        this.props.onChange(this.state.moment);
      break;
      case 37: // arrow-left
        if(event.shiftKey){
          this.setState({moment:this.state.moment.subtract(1, 'month')});
        }else{
          this.setState({moment:this.state.moment.subtract(1, 'day')});
        }
      break;
      case 38: // arrow-up
        if(event.shiftKey){
          this.setState({moment:this.state.moment.add(1, 'year')});
        }else{
          this.setState({moment:this.state.moment.subtract(1, 'week')});
        }
      break;
      case 39: // arrow-right
        if(event.shiftKey){
          this.setState({moment:this.state.moment.add(1, 'month')});
        }else{
          this.setState({moment:this.state.moment.add(1, 'day')});
        }
      break;
      case 40: // arrow-down
        if(event.shiftKey){
          this.setState({moment:this.state.moment.subtract(1, 'year')});
        }else{
          this.setState({moment:this.state.moment.add(1, 'week')});
        }
      break;
		}
	}
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleShortKeys); 
  }
  selectDate = (i, w) => {
    const prevMonth = w === 0 && i > 7;
    const nextMonth = w >= 4 && i <= 14;
    const m = this.state.moment;

    if (prevMonth) m.subtract(1, 'month');
    if (nextMonth) m.add(1, 'month');

    m.date(i);

    this.props.onChange(m);
  };

  prevMonth = e => {
    e.preventDefault();
    // this.props.onChange(this.props.moment.subtract(1, 'month'));
    this.setState({moment:this.state.moment.subtract(1, 'month')});
  };

  nextMonth = e => {
    e.preventDefault();
    // this.props.onChange(this.props.moment.add(1, 'month'));
    this.setState({moment:this.state.moment.add(1, 'month')});
  };
  handleToggleYear(event){
    this.setState({open_yearUI: !this.state.open_yearUI});
  }
  handleSelectYear = year => event => {
    let m = this.state.moment.clone();
    this.setState({moment: m.year(year)});
    this.handleToggleYear(event);
  }
  generateYears(){
    let years = [];
    let is_current_year = false;
    for(let i = 1900; i<2100; i++){
      is_current_year = i ==parseInt(this.state.moment.format("YYYY")) ? true : false;
      years.push(<li key={"year-"+i} 
        id={is_current_year ? "year-current-year" : null}  
        onClick={this.handleSelectYear(i)} 
        className={is_current_year ? "current-year" :""}
        >
          {i}
        </li>);
    }
    return years;
  }
  componentDidUpdate(){
    if(this.state.open_yearUI){
      let el_current_year = document.getElementById("year-current-year");
      let year_list = document.getElementById("year-list");
      if(el_current_year && year_list){
        let offsetTop = el_current_year.offsetTop - 170;
        year_list.scroll(0, offsetTop);
      }
    }
  }
  render() {
    
    let deltaDayOfWeek = this.props.firstDayOfWeek < 7 ? this.props.firstDayOfWeek : this.props.firstDayOfWeek - 7;

    const m = this.state.moment;
    const d = m.date();
    const d1 = m.clone().subtract(1, 'month').endOf('month').date();
    let d2 = m.clone().date(1).day() - deltaDayOfWeek;
    d2 = d2 < 0 ? 7 + d2 : d2;
    const d3 = m.clone().endOf('month').date();

    const days = [].concat(
      range(d1 - d2 + 1, d1 + 1),
      range(1, d3 + 1),
      range(1, 42 - d3 - d2 + 1)
    );
    
    let weeks = [];
    for(let i=0; i<7; i++){
      weeks.push(moment.weekdaysShort(this.props.firstDayOfWeek+i));
    }

    let currentMonth = m.format('MMMM YYYY');
    currentMonth = currentMonth.toLowerCase().charAt(0).toUpperCase() + currentMonth.slice(1);

    return (
      this.state.open_yearUI ?
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button type="button" className="go-back" onClick={this.handleToggleYear.bind(this)}>
            <i className={this.props.prevMonthIcon} />
          </button>
          <span className="current-date" onClick={this.handleToggleYear.bind(this)}>{currentMonth}</span>
          <span/>
        </div>
        <ul className="year-list" id="year-list">
          {this.generateYears()}
        </ul>
      </div>
      :
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button type="button" className="prev-month" onClick={this.prevMonth}>
            <i className={this.props.prevMonthIcon} />
          </button>
          <span className="current-date" onClick={this.handleToggleYear.bind(this)}>{currentMonth}</span>
          <button type="button" className="next-month" onClick={this.nextMonth}>
            <i className={this.props.nextMonthIcon} />
          </button>
        </div>
        
        <table>
          <thead>
            <tr>
              {weeks.map((w, i) => <td key={i}>{w}</td>)}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) =>
              <tr key={w}>
                {row.map(i =>
                  <Day
                    key={i}
                    i={i}
                    d={d}
                    w={w}
                    m={m}
                    onClick={() => this.selectDate(i, w)}
                  />
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
