// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointment, staredAppoint} = props
  const {name, time, isStared, id} = appointment

  const stared = () => {
    staredAppoint(id)
  }

  const image = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list">
      <div>
        <p>{name}</p>
        <p>{time}</p>
      </div>
      <button
        onClick={stared}
        className="star-button"
        type="button"
        data-testid="star"
      >
        <img src={image} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
