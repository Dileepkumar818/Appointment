// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointList: [], listStared: false}

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  getDate = event => {
    const times = event.target.value
    this.setState({date: times})
  }

  onAddAppoint = () => {
    const {date, title} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const appointObj = {
      name: title,
      time: formattedDate,
      id: v4(),
      isStared: false,
    }

    this.setState(prev => ({
      appointList: [...prev.appointList, appointObj],
      title: '',
      date: '',
    }))
  }

  staredAppoint = id => {
    this.setState(prev => ({
      appointList: prev.appointList.map(each => {
        if (id === each.id) {
          return {...each, isStared: !each.isStared}
        }
        return each
      }),
    }))
  }

  staredList = () => {
    this.setState(prev => ({listStared: !prev.listStared}))
  }

  render() {
    const {title, date, appointList, listStared} = this.state
    const updatedList = listStared
      ? appointList.filter(each => each.isStared === true)
      : appointList
    const val = listStared ? 'stared' : 'not'
    return (
      <div className="bg-container">
        <div className="appoints">
          <div className="appoint">
            <div className="inputs">
              <h1>Add Appointments</h1>
              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                value={title}
                type="text"
                id="title"
                onChange={this.getTitle}
                placeholder="Title"
              />
              <label className="label" htmlFor="date">
                Date
              </label>
              <input
                value={date}
                type="date"
                id="date"
                onChange={this.getDate}
              />
              <button
                type="button"
                className="button"
                onClick={this.onAddAppoint}
              >
                Add
              </button>
            </div>
            <div className="image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <div className="list-container">
            <hr className="line" />
            <div className="lists">
              <p>Appointments</p>
              <button type="button" onClick={this.staredList} className={val}>
                Starred
              </button>
            </div>
            <ul className="lists-container">
              {updatedList.map(each => (
                <AppointmentItem
                  key={each.id}
                  appointment={each}
                  staredAppoint={this.staredAppoint}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
