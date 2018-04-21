import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Checkbox from "material-ui/Checkbox"
import {selectedLanguageIDsAddRemove} from "../actions/languages"
import {buttonReset} from "../actions/buttons"

const styles = {
	gridTile: {
		titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
	}, 
	checkbox: {
		marginLeft: 12
	}
}

const LanguageTile = ({language, isChecked, dispatch}) => {
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
						dispatch(selectedLanguageIDsAddRemove(language.ID))
					}}
				/>
			}
			actionPosition="left"
		>
			<img src={language.link || "/img/adele.jpg"} />
		</GridTile>
	)
}

LanguageTile.propTypes = {
	language: PropTypes.object.isRequired, 
	isChecked: PropTypes.bool.isRequired
}

// LanguageTile.muiName = "GridTile"

export default connect()(LanguageTile)
