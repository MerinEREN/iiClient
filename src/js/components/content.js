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

class Content extends Component {
	constructor(props) {
		super(props)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.textFields = this.textFields.bind(this)
		this.selectField = this.selectField.bind(this)
		this.menuItems = this.menuItems.bind(this)
	}
	componentWillMount() {
		this.props.getPages()
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleFieldChange(event, index, values) {
		const {content: {ID}, handleUpdate, contentUpdate} = this.props
		const target = event.target
		const name = target.name || "pages"
		const value = target.value || values
		if (ID.indexOf("newContent") === -1)
			contentUpdate(ID, name, value)
		handleUpdate(ID, name, value)
	}
	menuItems(pages){
		const {allPages} = this.props
		return Object.values(allPages).map(p => <MenuItem
			key={p.ID}
			value={p.ID}
			primaryText={p.title}
			checked={pages && pages.indexOf(p.ID) > -1}
			insetChildren={true}
		/>
		)
	}
	selectField() {
		const {content: {pages}, inputErrTexts} = this.props
		return (
			<SelectField
				multiple={true} 
				hintText="select a page"
				value={pages}
				errorText={inputErrTexts && inputErrTexts.pages}
				onChange={this.handleFieldChange}
			>
				{this.menuItems(pages)}
			</SelectField>
		)
	}
	textFields() {
		const {languageIDs, content: {values}, inputErrTexts} = this.props
		return languageIDs.map(ID => <TextField 
				key={ID}
				name={ID}
				value={values[ID]}
				floatingLabelText={ID}
				errorText={inputErrTexts && inputErrTexts[ID]}
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
			selectedContentsAddRemove, 
			buttonReset
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
						onCheck={() => {
							buttonReset("contentsDelete")
							selectedContentsAddRemove(
								{[ID]: content}
							)
						}}
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

Content.propTypes = {
	getPages: PropTypes.func.isRequired, 
	languageIDs: PropTypes.array.isRequired, 
	allPages: PropTypes.object.isRequired, 
	content: PropTypes.object.isRequired, 
	inputErrTexts: PropTypes.object, 
	isChecked: PropTypes.bool.isRequired, 
	handleUpdate: PropTypes.func.isRequired, 
	contentUpdate: PropTypes.func.isRequired, 
	selectedContentsAddRemove: PropTypes.func.isRequired, 
	buttonReset: PropTypes.func.isRequired
}

// Content.muiName = "GridTile"

export default Content
