import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Checkbox from "material-ui/Checkbox"
import {selectedLanguageIDsAddRemove} from "../actions/languages"

const styles = {
	gridTile: {
		titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
	}, 
	checkbox: {
		marginLeft: 12
	}
}

const LanguageTile = ({language: {ID, link}, title, isChecked, dispatch}) => {
	const {
		gridTile: {
			titleBackground
		}, 
		checkbox
	} = styles
	return (
		<GridTile  
			style={{
				opacity: isChecked ? 0.5 : 1
			}}
			title={title}
			titlePosition="top"
			titleBackground={titleBackground} 
			actionIcon={
				<Checkbox
					style={checkbox} 
					checked={isChecked}
					onCheck={() => dispatch(selectedLanguageIDsAddRemove(ID))}
				/>
			}
			actionPosition="left"
		>
			<img src={link || "/img/adele.jpg"} />
		</GridTile>
	)
}

LanguageTile.propTypes = {
	language: PropTypes.object.isRequired, 
	title: PropTypes.string.isRequired, 
	isChecked: PropTypes.bool.isRequired
}

// LanguageTile.muiName = "GridTile"

export default connect()(LanguageTile)
