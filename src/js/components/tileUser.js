import React from "react"
import PropTypes from "prop-types"
import Link from "react-router/lib/Link"
import {GridTile} from "material-ui/GridList"
import Checkbox from "material-ui/Checkbox"
import {selectedUserIDsAddRemove} from "../actions/users"
import {isAdmin} from "./utilities"

const styles = {
	gridTile: {
		paddingTop: 40, 
		marginTop: 30, 
		marginBottom: 30, 
		titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
	}, 
	checkbox: {
		marginLeft: 12
	}
}

// FIND A WAY TO PREVENT TO TRIGER LINK WHEN CHECKBOX CHECKED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const TileUser = ({user: {ID, email, name, link, status}, isChecked}) => {
	const {
		gridTile: {
			paddingTop, 
			marginTop, 
			marginBottom, 
			titleBackground
		}, 
		checkbox
	} = styles
	return (
		<GridTile  
			title={
				name ? 
					(
						name.first ? 
						`${name.first} ${name.last}` : 
						email
					) :
					email
			}
			titlePosition="top"
			titleBackground={titleBackground} 
			style={{
				paddingTop, 
				marginTop, 
				marginBottom, 
				opacity: (isChecked || status === "suspended") ? 0.5 : 1
			}} 
			actionIcon={
				<Checkbox
					style={{...checkbox, display: "none"}} 
					checked={isChecked}
					onCheck={() => selectedUserIDsAddRemove(ID)}
				/>
			}
			actionPosition="left"
			containerElement={
				<Link 
					to={`/users/${ID}`} 
				/> 
			}
		>
			<img src={link || "/img/adele.jpg"} />
		</GridTile>
	)
}

TileUser.propTypes = {
	user: PropTypes.object.isRequired, 
	isChecked: PropTypes.bool.isRequired
}

TileUser.muiName = "GridTile"

export default TileUser
