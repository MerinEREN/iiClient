import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Checkbox from "material-ui/Checkbox"
import TextField from "material-ui/TextField"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"

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

class ContentTile extends Component {
	constructor(props) {
		super(props)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.textFields = this.textFields.bind(this)
		this.selectField = this.selectField.bind(this)
		this.menuItems = this.menuItems.bind(this)
	}
	// index and values are for select field only
	handleFieldChange(event, index, values) {
		const {content: {ID}, handleUpdate, contentUpdate} = this.props
		const target = event.target
		const name = target.name || "pageIDs"
		const value = target.value || values
		if (ID.indexOf("newContent") === -1)
			contentUpdate(ID, name, value)
		handleUpdate(ID, name, value)
	}
	menuItems(pageIDs){
		const {allPages} = this.props
		return Object.values(allPages).map(p => <MenuItem
			key={p.ID}
			value={p.ID}
			primaryText={p.text}
			checked={pageIDs && pageIDs.indexOf(p.ID) > -1}
			insetChildren={true}
		/>
		)
	}
	selectField() {
		const {contents, content: {pageIDs}, inputErrTexts} = this.props
		return (
			<SelectField
				multiple={true} 
				hintText={contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUGFnZXMM"] || "Pages"}
				value={pageIDs}
				errorText={inputErrTexts && inputErrTexts.pageIDs}
				onChange={this.handleFieldChange}
			>
				{this.menuItems(pageIDs)}
			</SelectField>
		)
	}
	textFields() {
		const {contents, languages, content: {values}, inputErrTexts} = this.props
		return Object.entries(languages).map( a => <TextField 
				key={a[0]}
				name={a[0]}
				value={values[a[0]] || ""}
				floatingLabelText={contents[a[1].contentID]}
				errorText={inputErrTexts && inputErrTexts[a[0]]}
				onChange={this.handleFieldChange}
			/>
		)
	}
	render() {
		const {
			gridTile: {
				paddingTop, 
				marginTop, 
				marginBottom, 
				titleBackground
			}, 
			checkbox
		} = styles
		const {
			content, 
			isChecked, 
			selectedContentIDsAddRemove
		} = this.props
		const {ID} = content
		return (
			<GridTile  
				style={{
					paddingTop, 
					marginTop, 
					marginBottom, 
					opacity: isChecked ? 0.5 : 1
				}} 
				title={ID.indexOf("newContent") === -1 && ID}
				titlePosition="top"
				titleBackground={titleBackground} 
				actionIcon={
					<Checkbox
						style={checkbox} 
						checked={isChecked}
						onCheck={() => selectedContentIDsAddRemove(ID)}
					/>
				}
				actionPosition="left"
			>
				{this.textFields()}
				{this.selectField()}
			</GridTile>
		)
	}
}

ContentTile.propTypes = {
	contents: PropTypes.object.isRequired, 
	languages: PropTypes.object.isRequired, 
	allPages: PropTypes.object.isRequired, 
	content: PropTypes.object.isRequired, 
	inputErrTexts: PropTypes.object, 
	isChecked: PropTypes.bool.isRequired, 
	handleUpdate: PropTypes.func.isRequired, 
	contentUpdate: PropTypes.func.isRequired, 
	selectedContentIDsAddRemove: PropTypes.func.isRequired
}

// ContentTile.muiName = "GridTile"

export default ContentTile
