import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';


export default class EditForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialState: PropTypes.object.isRequired
  }

  state = {
    request: this.props.initialState
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.request);
  }

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

  get formHasChanged() {
    let current = this.state.request;
    return Object
      .keys(this.props.initialState)
      .reduce((acc, key) => {
        if (acc) {
          return acc;
        }
        return this.props.initialState[key] !== current[key];
      }, false);
  }


  render() {
    let { request } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
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
          <div className="control" data-test-start-date>
            <DayPickerInput
              value={request.startDate}
              placeholder="Start date"
              format="MM-DD-YYYY"
              formatDate={formatDate}
              parseDate={parseDate}
              onDayChange={this.changeStartDate}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">End Date</label>
          <div className="control" data-test-end-date>
            <DayPickerInput
              value={request.endDate}
              placeholder="End date"
              format="MM-DD-YYYY"
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
              disabled={!this.formHasChanged}
            />
          </div>
          <div className="control">
            <Link to="/">
              <button className="button is-text" data-test-cancel>Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    );
  }
}