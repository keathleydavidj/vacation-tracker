import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';

import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

class CreateRoute extends Component {
  _isMounted = false;

  state = {
    request: {
      owner: '',
      startDate: '',
      endDate: '',
      status: 'Pending'
    }
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  createRecord = (e) => {
    e.preventDefault();

    fetch(`https://api.frontside.io/v1/requests`, {
      method: 'POST',
      body: JSON.stringify(this.state.request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => { // eslint-disable-line no-unused-vars
        if (this._isMounted) {
          navigate('/');
        }
      })
      .catch(error => console.error('Error: ', error)); // eslint-disable-line no-console
  }

  get startDate() {
    let { request: { startDate } } = this.state;
    return moment(startDate, "MM-DD-YYYY").toDate();
  }

  get endDate() {
    let { request: { endDate } } = this.state;
    return moment(endDate, "MM-DD-YYYY").toDate();
  }

  // showFromMonth() {
  //   let { request: { startDate, endDate } } = this.state;
  //   if (!startDate) {
  //     return;
  //   }
  //   if (moment(endDate).diff(moment(startDate), 'months') < 2) {
  //     this.endDate.getDayPicker().showMonth(startDate);
  //   }
  // }

  changeOwnerName = (event) => {
    let inputValue = event.target.value;
    this.setState(prevState => ({ request: { ...prevState.request, owner: inputValue }}));
  }

  changeEndDate = (date) => {
    this.setState(prevState => ({ request: { ...prevState.request, endDate: date }}));
  }

  changeStartDate = (date) => {
    this.setState(prevState => ({ request: { ...prevState.request, startDate: date }}));
  }

  render() {
    let { request } = this.state;
    let modifiers = { start: request.startDate, end: request.endDate };
    return (
      <div data-test-create-route>
        <h6>
          Creating new vacation request
        </h6>
        <form onSubmit={this.createRecord}>
          <div className="field">
            <label className="label">Requestee</label>
            <div className="control">
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <input
                className="input"
                type="text"
                value={request.owner}
                onChange={this.changeOwnerName}
                data-test-owner-name
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Start Date</label>
            <div className="control">
              {/* <span className="icon is-small is-left">
                <i className="fas fa-calendar-alt"></i>
              </span>
              <input
                className="input"
                type="text"
                value={request.startDate}
                onChange={this.changeStartDate}
                data-test-start-date
              /> */}
              <DayPickerInput
                value={request.startDate}
                placeholder="Start date"
                format="LL"
                formatDate={formatDate}
                parseDate={parseDate}
                showOverlay
                onDayChange={this.changeStartDate}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">End Date</label>
            <div className="control">
              <DayPickerInput
                ref={el => (this.endDateElement = el)}
                value={request.endDate}
                placeholder="End date"
                format="LL"
                formatDate={formatDate}
                parseDate={parseDate}
                onDayChange={this.changeEndDate}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Status</label>
            <div className="control has-icons-left">
              <span className="icon is-left">
                <i className="fas fa-check-square"></i>
              </span>
              <div className="select">
                <select value={request.status} data-test-status readOnly>
                  {/* <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option> */}
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <input
                className="button is-link"
                data-test-save
                type="submit"
                value="Save"
              />
            </div>
            <div className="control">
              <Link to="/">
                <button className="button is-text" data-test-cancel>Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateRoute;