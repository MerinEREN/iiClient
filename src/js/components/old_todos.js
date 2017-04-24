import React from "react"
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {Link} from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import ToDo from "../containers/todo"

const Timeline = ({muiTheme, params, toDos, addNewToDo, removeToDo}) => (
	<div>
		{
			// Test for params
			// CAN'T DECLARE A VARIABLE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// const {user} = params
			params.user !== "MerinEREN" && 
				<Link
					style={{color: muiTheme.palette.textColor}}
					to="MerinEREN"
					activeStyle={{
						textDecoration: 'none',
						color: 'black'
					}}
				>
				Navigate to Merin
				</Link>
		}
		<FlatButton
			label="Add New"
			onTouchTap={() => addNewToDo()}
		/>
		{/* 
			toDos.map((toDo, i) => 
				<ToDo
					key={i}
					index={i}
					{...toDo}
					remove={() => removeToDo(i)}
				/>
			)
		*/}
		{/*
			for(const todo of toDos) {
				return (
					<ToDo
						key={todo.id}
						index={todo.id}
						{...todo}
						remove={() => removeToDo(todo.id)}
					/>
				)
			}
		*/}
		{
			Object.keys(toDos).map(function (key) {
				let todo = toDos[key];
				return (
					<ToDo
						key={todo.id}
						{...todo}
						remove={() => removeToDo(todo.id)}
					/>
				)
			})
		}
	</div>
)

Timeline.propTypes = {
	muiTheme: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired,
	toDos: PropTypes.objectOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		children: PropTypes.node.isRequired,
		editable: PropTypes.bool.isRequired
	}).isRequired).isRequired,
	addNewToDo: PropTypes.func.isRequired,
	removeToDo: PropTypes.func.isRequired
}

export default muiThemeable()(Timeline)
