import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Checkbox from "material-ui/Checkbox"

const styles = {
	gridTile: {
		titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
	}, 
	checkbox: {
		marginLeft: 12
	}
}

class TileLanguage extends Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		const {
			language: {ID}, 
			photosGet
		} = this.props
		let URL = new URL("/photos", window.location.href)
		URL.searchParams.set("pID", ID)
		photosGet({
			URL, 
			key: ID
		})
	}
	render() {
		const {
			gridTile: {
				titleBackground
			}, 
			checkbox
		} = styles
		const {
			language: {ID}, 
			title, 
			isChecked, 
			languagePhoto: {link}, 
			selectedLanguageIDsAddRemove
		} = this.props
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
						onCheck={() => selectedLanguageIDsAddRemove(ID)}
					/>
				}
				actionPosition="left"
			>
				<img src={link || "/img/adele.jpg"} />
			</GridTile>
		)
	}
}

TileLanguage.defaultProps = {
	languagePhoto: {}
}

TileLanguage.propTypes = {
	language: PropTypes.object.isRequired, 
	title: PropTypes.string.isRequired, 
	isChecked: PropTypes.bool.isRequired, 
	languagePhoto: PropTypes.object, 
	photosGet: PropTypes.func.isRequired, 
	selectedLanguageIDsAddRemove: PropTypes.func.isRequired
}

// TileLanguage.muiName = "GridTile"

export default TileLanguage
