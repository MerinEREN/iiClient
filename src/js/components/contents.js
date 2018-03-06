import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Content from '../containers/content'

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
		this.handleContentChange = this.handleContentChange.bind(this)
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleSave = this.handleSave.bind(this)
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
	handleContentChange(ID, field, value) {
		const {newContents, inputErrTexts} = this.state
		const {contents} = this.props
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
		this.handlePostContents(tempObj)
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
	handlePostContents(contents) {
		if(!this.handleRequiredInput(contents))
			return
		this.props.postContents({
			body: {
				type: 'Blob', 
				contentType: 'application/json', 
				data: contents
			}
		})
	}
	contents(contents) {
		const {
			inputErrTexts 
		} = this.state
		return Object.values(contents).map(c => 
			<Content 
				key={c.ID}
				languageIDs={this.props.languageIDs}
				content={c} 
				inputErrTexts={inputErrTexts[c.ID]} 
				handleContentChange={this.handleContentChange} 
			/>
		)
	}
	render() {
		const {
			showDialog, 
			newContents
		} = this.state
		const {
			contents, 
			languageIDs
		} = this.props
		const children = <GridList 
					style={styles.gridList}
					cols={4}
					padding={10}
					cellHeight={'auto'}
				>
					{this.contents(newContents)}
				</GridList>
		const actions = [
			<FlatButton
				label="Create New Contents"
				primary={true}
				onTouchTap={this.handleCreateNewContents}
			/>, 
			<FlatButton
				label="Close"
				primary={true}
				onTouchTap={this.toggleDialog}
			/>, 
			<FlatButton
				label="Save"
				primary={true}
				onTouchTap={this.handleSave}
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
						Object.keys(contents).length > 0 
							? 
							<GridList 
								style={styles.gridList}
								cols={4}
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
							<FlatButton
								label="Save"
								primary={true}
								onTouchTap={() => this.handlePostContents(contents)}
							/>
					}
					{ 
						languageIDs.length > 0 
							&&
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

Contents.propTypes = {
	languageIDs: PropTypes.array.isRequired, 
	getContents: PropTypes.func.isRequired, 
	contents: PropTypes.object.isRequired, 
	postContents: PropTypes.func.isRequired
}

export default Contents
