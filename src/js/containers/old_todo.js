import React from "react"
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import muiThemeable from 'material-ui/styles/muiThemeable'
import FlatButton from 'material-ui/FlatButton'
import {save, edit} from '../actions/timeline'

let input

const ToDo = ({muiTheme, id, children, editable, remove, dispatch}) => editable
	?
	(
		<div>
			<input
				type="text"
				ref={ref => input = ref}
				defaultValue= {children}
			/>
			<FlatButton
				label="Save"
				onTouchTap={e => {
					e.preventDefault()
					if(!input.value.trim()) {
						return
					}
					dispatch(save(
						id,
						input.value
					))

				}}
			/>
		</div>
	)
	:
	(
		<div>
			<h2 style={{color: muiTheme.palette.textColor}}>
				{children}
			</h2>
			<FlatButton
				label="Edit"
				primary={true}
				onTouchTap={() => {dispatch(edit(id))}}
			/>
			<FlatButton
				label="Remove"
				secondary={true}
				onTouchTap={remove}
			/>
		</div>
	)

ToDo.propTypes = {
	muiTheme: PropTypes.object.isRequired,
	id: PropTypes.number.isRequired,
	children: PropTypes.node.isRequired,
	editable: PropTypes.bool.isRequired,
	remove: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired
}

// connect IS A MUST FOR INTERNAL dispatch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default connect()(muiThemeable()(ToDo))
