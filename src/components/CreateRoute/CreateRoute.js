import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';

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

  changeOwnerName = (event) => {
    let inputValue = event.target.value;
    this.setState(prevState => ({ request: { ...prevState.request, owner: inputValue }}));
  }

  changeEndDate = (event) => {
    let inputValue = event.target.value;
    this.setState(prevState => ({ request: { ...prevState.request, endDate: inputValue }}));
  }

  changeStartDate = (event) => {
    let inputValue = event.target.value;
    this.setState(prevState => ({ request: { ...prevState.request, startDate: inputValue }}));
  }

  render() {
    let { request } = this.state;
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
              <span className="icon is-small is-left">
                <i className="fas fa-calendar-alt"></i>
              </span>
              <input
                className="input"
                type="text"
                value={request.startDate}
                onChange={this.changeStartDate}
                data-test-start-date
              />
            </div>
          </div>

          <div className="field">
            <label className="label">End Date</label>
            <div className="control">
              <span className="icon is-small is-left">
                <i className="fas fa-calendar-alt"></i>
              </span>
              <input
                className="input"
                type="text"
                value={request.endDate}
                onChange={this.changeEndDate}
                data-test-end-date
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