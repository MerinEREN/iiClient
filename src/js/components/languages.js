import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import Language from './language'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import VerticalStepper from './verticalStepper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap', 
		justifyContent: 'space-around'
	}, 
	gridList: {
		margin: 0
	}, 
	floatingActionButton: {
		position: 'fixed',
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
			code: "",    
			inputErrText: {}
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handleRequiredInput = this.handleRequiredInput.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	componentWillMount() {
		this.props.getLanguages()
	}
	// Make dynamic
	handleRequiredInput(i) {
		switch (i) {
			case 1:
				if(!this.state.code) {
					this.setState({
						inputErrText:{
							code: 'Required field'
						}
					})
					return true
				}
				return false
			case 2:
				if(!this.file.files[0]) {
					this.setState({
						inputErrText:{
							file: 'Required field'
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
		const target = event.target
		const name = target.name
		const {inputErrText} = this.state
		if(name !== "file") {
			this.setState({
				code: value, 
				inputErrText: {
					...inputErrText, 
					code: ''
				}
			})
		}
		this.setState({
			inputErrText: {
				...inputErrText, 
				file: ''
			}
		})
	}
	handlePost() {
		this.toggleDialog()
		const {code} = this.state
		const {postLanguage} = this.props
		postLanguage({
			body: {
				type: 'FormData', 
				// Use 'contentType' for 'Blob' type.
				// contentType: 'application/json', 
				data: {
					[code]: {
						code: code, 
						file: this.file.files[0] 
					}
				}
			}
		})
		this.setState({code: ""})
	}
	toggleDialog() {
		const {showDialog} = this.state
		this.setState({showDialog: !showDialog})
	}
	addForm() {
		const {inputErrText, code} = this.state
		return (
			<form>
				<VerticalStepper 
					stepLabels={[
						'Description', 
						'Language', 
						'Thumbnail'
					]} 
					stepContents={[
						<p>
							Select a language from the select field.
						</p>, 
						<SelectField 
							value={code}
							floatingLabelText="Language" 
							errorText={inputErrText.code}
							onChange={this.handleInputChange}
						>
							{items}
						</SelectField>, 
						<input 
							type='file'
							name='file' 
							ref={input => this.file = input}
							onChange={this.handleInputChange}
						/>
					]}
					setInputErrorMessage={this.handleRequiredInput}
				/>
			</form>
		)
	}
	languages(languages) {
		return Object.entries(languages).map(a => 
			<Language 
				key={a[0]} 
				ID={a[0]} 
				language={a[1]} 
			/>)
	}
	render() {
		const {showDialog} = this.state
		const {languages} = this.props
		const actions = [
			<FlatButton
				label="Close"
				primary={true}
				onTouchTap={this.toggleDialog}
			/>, 
			<FlatButton
				label="Save"
				primary={true}
				onTouchTap={this.handlePost}
			/>
		]
		return (
			<div style={styles.root}>
				<GridList 
					cols={4} 
					cellHeight='auto'
					style={styles.gridList}
				>
					<GridTile cols={1} />  
					<GridTile cols={2}>  
					{ 
						Object.entries(languages).length !== 0 
							? 
							<GridList 
								style={styles.gridList}
								cols={4}
								padding={10}
								cellHeight={333}
							>
								{this.languages(languages)}
							</GridList>
							:
								<h3>No Languages</h3>
							}
							<FloatingActionButton 
								secondary={true}
								style={{
									...styles.floatingActionButton, 
									display: showDialog ? 'none' : 'inline-block'
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
					children={this.addForm()}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

Languages.propTypes = {
	getLanguages: PropTypes.func.isRequired, 
	languages: PropTypes.object.isRequired, 
	postLanguage: PropTypes.func.isRequired
}

Languages.muiName = 'GridList'

export default Languages
