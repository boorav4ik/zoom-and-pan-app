import PropTypes from 'prop-types'
import './index.css'

const FluidContainer = ({ className, ...props }) => (
  <div
    {...props}
    className={'fluid'.concat(className ? ` ${className}` : '')}
  />
)

FluidContainer.propTypes = {
  className: PropTypes.string,
}

export default FluidContainer
