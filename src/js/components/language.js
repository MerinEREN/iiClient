import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Checkbox from "material-ui/Checkbox"
import {selectedLanguagesAddRemove} from "../actions/languages"
import {buttonReset} from "../actions/buttons"

const styles = {
	gridTile: {
		titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
	}, 
	checkbox: {
		marginLeft: 12
	}
}

const Language = ({language, isChecked, dispatch}) => {
	const {
		gridTile: {
			marginTop, 
			marginBottom, 
			titleBackground
		}, 
		checkbox
	} = styles
	return (
		<GridTile  
			style={{
				marginTop, 
				marginBottom, 
				opacity: isChecked ? 0.5 : 1
			}}
			title={language.ID}
			titlePosition="top"
			titleBackground={titleBackground} 
			actionIcon={
				<Checkbox
					style={checkbox} 
					checked={isChecked}
					onCheck={() => {
						dispatch(buttonReset("languagesDelete"))
						dispatch(selectedLanguagesAddRemove(
							{[language.ID]: language}
						))
					}}
				/>
			}
			actionPosition="left"
		>
			<img src={language.link || "/img/adele.jpg"} />
		</GridTile>
	)
}

Language.propTypes = {
	language: PropTypes.object.isRequired, 
	isChecked: PropTypes.bool.isRequired
}

// Language.muiName = "GridTile"

export default connect()(Language)
