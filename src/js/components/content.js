import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
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
		this.props.getPages()
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleFieldChange(event, index, values) {
		const {content: {ID}, handleContentChange, contentChange} = this.props
		const target = event.target
		const name = target.name || "pages"
		const value = target.value || values
		if (ID.indexOf('newContent') === -1)
			contentChange(ID, name, value)
		handleContentChange(ID, name, value)
	}
	handleDelete(ID, obj) {
		this.props.deleteContent({
			URL: `/contents/?ID=${ID}`, 
			body: {
				type: 'FormData', 
				data: obj
			}
		})
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
		const {content} = this.props
		const {ID} = content
		return (
			<GridTile  
				style={styles.gridTile.style} 
				title={ID.indexOf('newContent') === -1 && ID}
				actionIcon={
					<IconButton 
						onTouchTap={() => this.handleDelete(ID, {[ID]: content})}
					>
						<Delete />
					</IconButton>
				}
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
	handleContentChange: PropTypes.func.isRequired, 
	contentChange: PropTypes.func.isRequired, 
	deleteContent: PropTypes.func.isRequired
}

Content.muiName = "GridTile"

export default Content
