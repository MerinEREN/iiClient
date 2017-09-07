import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GridTile} from 'material-ui/GridList'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const styles = {
	gridTile: {
		style: {
			marginBottom: 60
		}
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
		const {getLanguages, getPages} = this.props
		getLanguages()
		getPages()
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleFieldChange(event, index, values) {
		const {content: {ID}, handleContentChange} = this.props
		const target = event.target
		const name = target.name || "pages"
		const value = target.value || values
		handleContentChange(ID, name, value)
	}
	menuItems(){
		const {content: {pages}, allPages} = this.props
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
				{this.menuItems()}
			</SelectField>
		)
	}
	textFields() {
		const {languageIDs, content, inputErrTexts} = this.props
		return languageIDs.map(ID => <TextField 
				key={ID}
				name={ID}
				value={content[ID]}
				floatingLabelText={ID}
				errorText={inputErrTexts && inputErrTexts[ID]}
				onChange={this.handleFieldChange}
			/>
		)
	}
	render() {
		return (
			<GridTile  
				style={styles.gridTile.style} 
			>
				{this.textFields()}
				{this.selectField()}
			</GridTile>
		)
	}
}

Content.propTypes = {
	getLanguages: PropTypes.func.isRequired, 
	getPages: PropTypes.func.isRequired, 
	languageIDs: PropTypes.array.isRequired, 
	allPages: PropTypes.object.isRequired, 
	content: PropTypes.object.isRequired, 
	inputErrTexts: PropTypes.object, 
	handleContentChange: PropTypes.func.isRequired
}

Content.muiName = "GridTile"

export default Content
