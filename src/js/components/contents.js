import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Content from '../containers/content'
import {generateURLVariableFromIDs} from './utilities'

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap', 
		justifyContent: 'space-around'
	}, 
	gridList: {
		margin: 0
	}, 
	raisedButton: {
		marginLeft: 12
	}, 
	floatingActionButton: {
		position: 'fixed',
		bottom: 32, 
		right: 48
	}
}

class Contents extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			initNewContents: true, 
			newContents: {}, 
			inputErrTexts: {}
		}
		this.handleCreateNewContents = this.handleCreateNewContents.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.getContents()
	}
	handleCreateNewContents() {
		var {newContents} = this.state
		var tempObj = {}
		for(let i = Object.keys(newContents).length; i < Object.keys(newContents).length + 8; i++) {
			tempObj[`newContent_${i}`] = {
						ID: `newContent_${i}`, 
						values: {}, 
						pages: []
					}
			this.props.languageIDs.forEach(
				v => tempObj[`newContent_${i}`].values[v] = ''
			)
		}
		this.setState({
			newContents: {
				...newContents, 
				...tempObj
			}
		})
	}
	handleUpdate(ID, field, value) {
		const {newContents, inputErrTexts} = this.state
		if (ID.indexOf('newContent') !== -1) {
			if (Array.isArray(value)) {
				this.setState({
					newContents: {
						...newContents, 
						[ID]: {
							...newContents[ID], 
							pages: value
						}
					}
				})
			} else {
				this.setState({
					newContents: {
						...newContents, 
						[ID]: {
							...newContents[ID], 
							values: {
								...newContents[ID].values, 
								[field]: value
							}
						}
					}
				})
			}
		}
		this.setState({
			inputErrTexts: {
				...inputErrTexts, 
				[ID]: {
					...inputErrTexts[ID], 
					[field]: ''
				}
			}
		})
	}
	toggleDialog() {
		this.setState({showDialog: !this.state.showDialog})
		if(this.state.initNewContents) {
			this.handleCreateNewContents()
			this.setState({initNewContents: false})
		}
	}
	handleSave() {
		var tempObj = {}
		Object.entries(this.state.newContents).forEach( a => {
			// if(a[1].en !== '' && a[1].tr !== '')
			if(a[1].values.en !== '')
				tempObj[a[0]] = a[1]
		})
		if(Object.keys(tempObj).length === 0) {
			this.toggleDialog()
			return
		}
		if(!this.handleRequiredInput(tempObj))
			return
		this.toggleDialog()
		this.setState({
			initNewContents: true, 
			newContents: {}
		})
		this.handlePost()
	}
	handleRequiredInput(contents) {
		const {inputErrTexts} = this.state
		return Object.entries(contents).every(a => {
			if(a[1].values.en === '') {
				this.setState({
					inputErrTexts: {
						...inputErrTexts, 
						[a[0]]: {
							...inputErrTexts[a[0]], 
							en: "Required field"
						}
					}
				})
				return false
			}
			if(a[1].pages.length === 0) {
				this.setState({
					inputErrTexts: {
						...inputErrTexts, 
						[a[0]]: {
							...inputErrTexts[a[0]], 
							pages: "Required field"
						}
					}
				})
				return false
			}
			return true
		})
	}
	handlePost() {
		const {contents, postContents} = this.props
		if(!this.handleRequiredInput(contents))
			return
		postContents({
			body: {
				type: 'Blob', 
				contentType: 'application/json', 
				data: contents
			}
		})
	}
	handleDelete() {
		const {contentsSelected, deleteContents, buttonSet}= this.props
		deleteContents({
			URL: `/contents/?IDs=${generateURLVariableFromIDs(contentsSelected)}`, 
			body: {
				type: "FormData", 
				data: contentsSelected
			}
		})
		buttonSet("contentsDelete")
	}
	contents(contents) {
		const {inputErrTexts} = this.state
		const {languageIDs, contentsSelected} = this.props
		return Object.values(contents).map(v => {
			return <Content 
				key={v.ID}
				languageIDs={languageIDs}
				content={v} 
				inputErrTexts={inputErrTexts[v.ID]} 
				isChecked={Object.keys(contentsSelected).indexOf(v.ID) !== -1}
				handleUpdate={this.handleUpdate} 
			/>
		})
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
			newContents
		} = this.state
		const {
			contents, 
			contentsSelected, 
			languageIDs, 
			deleteClicked
		} = this.props
		const children = <GridList 
					cols={4}
					style={gridList}
					padding={10}
					cellHeight={'auto'}
				>
					{this.contents(newContents)}
				</GridList>
		const actions = [
			<FlatButton
				label="Create New Contents"
				onTouchTap={this.handleCreateNewContents}
			/>, 
			<FlatButton
				label="Close"
				onTouchTap={this.toggleDialog}
			/>, 
			<FlatButton
				label="Save"
				primary={true}
				onTouchTap={this.handleSave}
			/>
		]
		return (
			<div style={root}>
				<GridList 
					cols={4} 
					style={gridList}
					cellHeight='auto'
				>
					<GridTile cols={1} />  
					<GridTile cols={2}>  
					{ 
						Object.keys(contents).length > 0 
							? 
							<GridList 
								cols={4}
								style={gridList}
								padding={10}
								cellHeight={'auto'}
							>
								{this.contents(contents)}
							</GridList>
							:
							<h1>No contents yet... </h1>
					}
					{
						Object.keys(contents).length > 0
							&& 
							<RaisedButton
								label="Save"
								style={raisedButton}
								primary={true}
								onTouchTap={this.handlePost}
							/>
					}
					{
						(!deleteClicked && Object.keys(contentsSelected).length > 0)
							&& 
							<RaisedButton
								label="Delete"
								style={raisedButton}
								secondary={true}
								onTouchTap={this.handleDelete}
							/>
					}
					{ 
						languageIDs.length > 0 
							&&
							<FloatingActionButton 
								secondary={true}
								style={{
									...floatingActionButton, 
									display: showDialog ? 'none' : 'inline-block'
								}}
								onTouchTap={this.toggleDialog}
							>
								<ContentAdd />
							</FloatingActionButton>
					}
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
				<Dialog
					title="Add New Contents"
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
					autoScrollBodyContent={true}
				/>
			</div>
		)
	}
}

Contents.defaultProps = {
	deleteClicked: false
}

Contents.propTypes = {
	languageIDs: PropTypes.array.isRequired, 
	getContents: PropTypes.func.isRequired, 
	contents: PropTypes.object.isRequired, 
	postContents: PropTypes.func.isRequired, 
	contentsSelected: PropTypes.object.isRequired, 
	deleteContents: PropTypes.func.isRequired, 
	deleteClicked: PropTypes.bool.isRequired, 
	buttonSet: PropTypes.func.isRequired
}

export default Contents
