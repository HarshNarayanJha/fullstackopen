import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      &nbsp;
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.showLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>{props.hideLabel || 'cancel'}</button>
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string,
}

export default Togglable
