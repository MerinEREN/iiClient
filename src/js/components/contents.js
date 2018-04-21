import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ContentTile from '../containers/contentTile'
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
		this.handlePost = this.handlePost.bind(this)
		this.handlePut = this.handlePut.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.getContents()
	}
	handleCreateNewContents() {
		let {newContents} = this.state
		let tempObj = {}
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
	handlePost() {
		let newContents = {}
		Object.entries(this.state.newContents).forEach( a => {
			if(a[1].values.en !== '')
				newContents[a[0]] = a[1]
		})
		if(Object.keys(newContents).length === 0) {
			this.toggleDialog()
			return
		}
		if(!this.handleRequiredInput(newContents))
			return
		this.toggleDialog()
		this.setState({
			initNewContents: true, 
			newContents: {}
		})
		this.props.postContents({
			body: {
				type: 'Blob', 
				contentType: 'application/json', 
				data: newContents
			}
		})
	}
	handleRequiredInput(contents) {
		const {inputErrTexts} = this.state
		return Object.entries(contents).every(a => {
			// Not necessary for newContents but necessary for contents
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
	handlePut() {
		const {contents, putContents} = this.props
		if(!this.handleRequiredInput(contents))
			return
		putContents({
			body: {
				type: 'Blob', 
				contentType: 'application/json', 
				data: contents
			}
		})
	}
	handleDelete() {
		const {contentIDsSelected, deleteContents, buttonSet}= this.props
		deleteContents({
			URL: `/contents?IDs=${generateURLVariableFromIDs(contentIDsSelected)}`, 
			body: {
				data: contentIDsSelected
			}
		})
		buttonSet("contentsDelete")
	}
	contentTiles(contents) {
		const {inputErrTexts} = this.state
		const {languageIDs, contentIDsSelected} = this.props
		return Object.values(contents).map(v => <ContentTile 
			key={v.ID}
			languageIDs={languageIDs}
			content={v} 
			inputErrTexts={inputErrTexts[v.ID]} 
			isChecked={contentIDsSelected.indexOf(v.ID) !== -1}
			handleUpdate={this.handleUpdate} 
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
			newContents
		} = this.state
		const {
			contents, 
			contentIDsSelected, 
			languageIDs, 
			deleteClicked
		} = this.props
		const children = <GridList 
					cols={4}
					style={gridList}
					padding={10}
					cellHeight={'auto'}
				>
					{this.contentTiles(newContents)}
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
				onTouchTap={this.handlePost}
			/>
		]
		return (
			<div style={root}>
				<GridList 
					cols={4} 
					cellHeight='auto'
					style={gridList}
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
								{this.contentTiles(contents)}
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
								onTouchTap={this.handlePut}
							/>
					}
					{
						(!deleteClicked && contentIDsSelected.length > 0)
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
	putContents: PropTypes.func.isRequired, 
	contentIDsSelected: PropTypes.array.isRequired, 
	deleteContents: PropTypes.func.isRequired, 
	deleteClicked: PropTypes.bool.isRequired, 
	buttonSet: PropTypes.func.isRequired
}

Contents.muiName = "GridList"

export default Contents
