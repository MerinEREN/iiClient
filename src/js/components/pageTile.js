import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router"
import {GridTile} from "material-ui/GridList"
import Checkbox from "material-ui/Checkbox"
import {selectedPageIDsAddRemove} from '../actions/pages'

const styles = {
	gridTile: {
		paddingTop: 40, 
		marginTop: 30, 
		marginBottom: 30, 
		titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
	}, 
	link: {
		activeStyle: {
			color: "#0097a7"
		}
	}, 
	checkbox: {
		marginLeft: 12
	}
}

// FIND A WAY TO PREVENT TO TRIGER LINK WHEN CHECKBOX CHECKED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const PageTile = ({page, isChecked}) => {
		const {
			gridTile: {
				paddingTop, 
				marginTop, 
				marginBottom, 
				titleBackground
			}, 
			link: {activeStyle}, 
			checkbox
		} = styles
		const {ID, title, link} = page
		return (
			<GridTile  
				title={title}
				titlePosition="top"
				titleBackground={titleBackground} 
				cols={ID === "Root" ? 2 : 1} 
				rows={ID === "Root" ? 1 : 1}
				style={{
					paddingTop, 
					marginTop, 
					marginBottom, 
					opacity: isChecked ? 0.5 : 1
				}} 
				actionIcon={
					<Checkbox
						style={{...checkbox, display: "none"}} 
						checked={isChecked}
						onCheck={() => selectedPageIDsAddRemove(ID)}
					/>
				}
				actionPosition="left"
				containerElement={
					<Link 
						to={`/pages/${ID}`} 
						activeStyle={activeStyle} 
					/> 
				}
			>
				<img src={link || "/img/adele.jpg"} />
			</GridTile>
		)
	}

PageTile.propTypes = {
	page: PropTypes.object.isRequired, 
	isChecked: PropTypes.bool.isRequired
}

// PageTile.muiName = "GridTile"

export default PageTile
