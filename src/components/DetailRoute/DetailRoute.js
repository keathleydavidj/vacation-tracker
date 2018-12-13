import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

class DetailRoute extends Component {
  static propTypes = {
    requestId: PropTypes.string
  }; 
  
  _isMounted = false;

  state = {
    request: {
      owner: '',
      startDate: '',
      endDate: '',
      status: ''
    }
  };

  componentDidMount() {
    this._isMounted = true;
    fetch(`https://api.frontside.io/v1/requests/${this.props.requestId}`)
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ request: data.request });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateRecord = (e) => {
    fetch(`https://api.frontside.io/v1/requests/${this.props.requestId}`, {
      method: 'PUT',
      body: JSON.stringify(this.state.request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (this._isMounted) {
          this.setState(response);
        }
      })
      .catch(error => console.error('Error: ', error)); // eslint-disable-line no-console
    e.preventDefault();
  }

  changeEndDate = (event) => {
    let inputValue = event.target.value;
    this.setState(prevState => ({ request: { ...prevState.request, endDate: inputValue }}));
  }

  changeStartDate = (event) => {
    let inputValue = event.target.value;
    this.setState(prevState => ({ request: { ...prevState.request, startDate: inputValue }}));
  }

  changeStatus = (event) => {
    let inputValue = event.target.value;
    this.setState(prevState => ({ request: { ...prevState.request, status: inputValue }}));
  }

  render() {
    let { requestId } = this.props;
    let { request } = this.state;
    return (
      <div data-test-detail-route>
        <h6>
          Editing Request ID: {`${requestId}`}
        </h6>
        <form onSubmit={this.updateRecord}>
          <div className="field">
            <label className="label">Requestee</label>
            <div className="control">
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <input className="input" type="text" defaultValue={request.owner} readOnly data-test-owner-name/>
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
                <select value={request.status} onChange={this.changeStatus} data-test-status>
                  <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option>
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

export default DetailRoute;