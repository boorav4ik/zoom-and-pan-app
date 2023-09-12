import PropTypes from 'prop-types'
import './index.css'

export default function Toolbar({ className, ...props }) {
  return (
    <div
      className={'toolbar'.concat(className ? ` ${className}` : '')}
      {...props}
    />
  )
}

Toolbar.propTypes = {
  className: PropTypes.string,
}
