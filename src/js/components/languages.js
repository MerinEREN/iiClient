import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import RaisedButton from "material-ui/RaisedButton"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import VerticalStepper from "./verticalStepper"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import LanguageTile from "./languageTile"
import {generateURLVariableFromIDs} from "./utilities"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "space-around"
	}, 
	gridList: {
		margin: 0
	}, 
	raisedButton: {
		marginLeft: 12
	}, 
	floatingActionButton: {
		position: "fixed",
		bottom: 32, 
		right: 48
	}
}
const items = [
	<MenuItem key={1} value="tr" primaryText="Turkish" />,
	<MenuItem key={2} value="en" primaryText="English" />,
	<MenuItem key={3} value="de" primaryText="German" />,
	<MenuItem key={4} value="zh-cn" primaryText="Chinese" />,
	<MenuItem key={5} value="pt" primaryText="Portuguese" />,
	<MenuItem key={6} value="ru" primaryText="Russian" />,
]

class Languages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			ID: "",    
			inputErrText: {}
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleRequiredInput = this.handleRequiredInput.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.getLanguages()
	}
	handleRequiredInput(i) {
		switch (i) {
			case 1:
				if(!this.state.ID) {
					this.setState({
						inputErrText:{
							ID: "Required field"
						}
					})
					return true
				}
				return false
			default:
				return false
		}
	}
	handleInputChange(event, index, value) {
		const {inputErrText} = this.state
		this.setState({
			ID: value, 
			inputErrText: {
				...inputErrText, 
				ID: ""
			}
		})
	}
	handlePost() {
		this.toggleDialog()
		const {ID} = this.state
		this.props.postLanguage({
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					[ID]: {
						ID: ID, 
						file: this.file.files[0] 
					}
				}
			}
		})
		this.setState({ID: ""})
	}
	toggleDialog() {
		const {showDialog} = this.state
		this.setState({showDialog: !showDialog})
	}
	handleDelete() {
		const {languageIDsSelected, deleteLanguages, buttonSet} = this.props
		deleteLanguages({
			URL: `/languages?IDs=${generateURLVariableFromIDs(languageIDsSelected)}`, 
			body: {
				type: "FormData", 
				data: languageIDsSelected
			}
		})
		buttonSet("languagesDelete")
	}
	languageTiles(languages) {
		const {languageIDsSelected} = this.props
		return Object.values(languages).map(v => 
			<LanguageTile 
				key={v.ID} 
				language={v} 
				isChecked={languageIDsSelected.indexOf(v.ID) !== -1}
			/>)
	}
	render() {
		const {
			root, 
			gridList, 
			raisedButton, 
			floatingActionButton
		} = styles
		const {
			showDialog, 
			inputErrText, 
			ID
		} = this.state
		const {
			languages, 
			languageIDsSelected, 
			deleteClicked
		} = this.props
		const children = <VerticalStepper 
			stepLabels={[
				"Description", 
				"Language", 
				"Thumbnail"
			]} 
			stepContents={[
				<p>
					Select a language from the select field.
				</p>, 
				<SelectField 
					value={ID}
					floatingLabelText="Language" 
					errorText={inputErrText.ID}
					onChange={this.handleInputChange}
				>
					{items}
				</SelectField>, 
				<input 
					type="file"
					ref={input => this.file = input}
				/>
			]}
			setInputErrorMessage={this.handleRequiredInput}
		/>
		const actions = [
			<FlatButton
				label="Close"
				onTouchTap={this.toggleDialog}
			/>, 
			<FlatButton
				label="Save"
				primary={true}
				onTouchTap={this.handlePost}
			/>
		]
		return (
			<div style={root}>
				<GridList 
					cols={4} 
					cellHeight="auto"
					style={gridList}
				>
					<GridTile cols={1} />  
					<GridTile cols={2}>  
					{ 
						Object.entries(languages).length !== 0 
							? 
							<GridList 
								style={gridList}
								cols={4}
								padding={10}
								cellHeight={333}
							>
								{this.languageTiles(languages)}
							</GridList>
							:
							<h3>No Languages</h3>
					}
					{
						(!deleteClicked && languageIDsSelected.length > 0)
							&& 
							<RaisedButton
								label="Delete"
								style={raisedButton}
								secondary={true}
								onTouchTap={this.handleDelete}
							/>
					}
							<FloatingActionButton 
								secondary={true}
								style={{
									...floatingActionButton, 
									display: showDialog ? "none" : "inline-block"
								}}
								onTouchTap={this.toggleDialog}
							>
								<ContentAdd />
							</FloatingActionButton>
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
				<Dialog
					title="Add New Language"
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

Languages.defaultProps = {
	deleteClicked: false
}

Languages.propTypes = {
	getLanguages: PropTypes.func.isRequired, 
	languages: PropTypes.object.isRequired, 
	postLanguage: PropTypes.func.isRequired, 
	languageIDsSelected: PropTypes.array.isRequired, 
	deleteLanguages: PropTypes.func.isRequired,
	deleteClicked: PropTypes.bool.isRequired, 
	buttonSet: PropTypes.func.isRequired
}

Languages.muiName = "GridList"

export default Languages
