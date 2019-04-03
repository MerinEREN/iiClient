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

class TileContext extends Component {
	constructor(props) {
		super(props)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.textFields = this.textFields.bind(this)
		this.selectField = this.selectField.bind(this)
		this.menuItems = this.menuItems.bind(this)
	}
	// index and values are for select field only
	handleFieldChange(event, index, values) {
		const {
			context: {
				ID
			}, 
			handleUpdate, 
			contextUpdate
		} = this.props
		const target = event.target
		const name = target.name || "pageIDs"
		const value = target.value || values
		if (ID.indexOf("newContext") === -1)
			contextUpdate(ID, name, value)
		handleUpdate(ID, name, value)
	}
	menuItems(pageIDs){
		const {
			pages
		} = this.props
		return Object.values(pages).map(p => <MenuItem
			key={p.ID}
			value={p.ID}
			primaryText={p.text}
			checked={pageIDs && pageIDs.indexOf(p.ID) > -1}
			insetChildren={true}
		/>
		)
	}
	selectField() {
		const {
			contextsRoot, 
			context: {
				pageIDs
			}, 
			inputErrTexts
		} = this.props
		return (
			<SelectField
				multiple={true} 
				hintText={contextsRoot["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUGFnZXMM"] || "Pages"}
				value={pageIDs}
				errorText={inputErrTexts && inputErrTexts.pageIDs}
				onChange={this.handleFieldChange}
			>
				{this.menuItems(pageIDs)}
			</SelectField>
		)
	}
	textFields() {
		const {
			contextsRoot, 
			languages, 
			context: {
				values
			}, 
			inputErrTexts
		} = this.props
		return Object.entries(languages).map( a => <TextField 
				key={a[0]}
				name={a[0]}
				value={values[a[0]] || ""}
				floatingLabelText={contextsRoot[a[1].contextID]}
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
			context, 
			isChecked, 
			selectedContextIDsAddRemove
		} = this.props
		const {ID} = context
		return (
			<GridTile  
				style={{
					paddingTop, 
					marginTop, 
					marginBottom, 
					opacity: isChecked ? 0.5 : 1
				}} 
				title={ID.indexOf("newContext") === -1 && ID}
				titlePosition="top"
				titleBackground={titleBackground} 
				actionIcon={
					<Checkbox
						style={checkbox} 
						checked={isChecked}
						onCheck={() => selectedContextIDsAddRemove(ID)}
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

TileContext.propTypes = {
	contextsRoot: PropTypes.object.isRequired, 
	languages: PropTypes.object.isRequired, 
	pages: PropTypes.object.isRequired, 
	context: PropTypes.object.isRequired, 
	inputErrTexts: PropTypes.object, 
	isChecked: PropTypes.bool.isRequired, 
	handleUpdate: PropTypes.func.isRequired, 
	contextUpdate: PropTypes.func.isRequired, 
	selectedContextIDsAddRemove: PropTypes.func.isRequired
}

// TileContext.muiName = "GridTile"

export default TileContext
