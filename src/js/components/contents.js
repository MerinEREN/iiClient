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

const contents = {
	book: {
		ID: 'book', 
		en: 'book', 
		tr: 'kitap', 
		de: '', 
		pt: '', 
		ru: '', 
		pages: ['Adele', 'MerinEREN']
	}, 
	pen: {
		ID: 'pen', 
		en: 'pen', 
		tr: 'kalem', 
		de: 'bilmem ne', 
		pt: '', 
		ru: '', 
		pages: ['TheMan', 'MerinEREN']
	}, 
	clock: {
		ID: 'clock', 
		en: 'clock', 
		tr: 'saat', 
		de: '', 
		pt: '', 
		ru: '', 
		pages: ['Adele', 'MerinEREN']
	}, 
	table: {
		ID: 'table', 
		en: 'table', 
		tr: 'masa', 
		de: 'bilmem ne', 
		pt: '', 
		ru: '', 
		pages: ['TheMan', 'MerinEREN']
	}, 
	success: {
		ID: 'success', 
		en: 'success', 
		tr: 'basari', 
		de: '', 
		pt: '', 
		ru: '', 
		pages: ['Adele', 'MerinEREN']
	}, 
	love: {
		ID: 'love', 
		en: 'love', 
		tr: 'ask', 
		de: 'bilmem ne', 
		pt: '', 
		ru: '', 
		pages: ['TheMan', 'MerinEREN']
	}, 
	victory: {
		ID: 'victory', 
		en: 'victory', 
		tr: 'zafer', 
		de: '', 
		pt: '', 
		ru: '', 
		pages: ['Adele', 'MerinEREN']
	}, 
	power: {
		ID: 'power', 
		en: 'power', 
		tr: 'guc', 
		de: 'bilmem ne', 
		pt: '', 
		ru: '', 
		pages: ['TheMan', 'MerinEREN']
	}, 
	happyness: {
		ID: 'happyness', 
		en: 'happyness', 
		tr: 'mutluluk', 
		de: '', 
		pt: '', 
		ru: '', 
		pages: ['Adele', 'MerinEREN']
	}, 
	IQ: {
		ID: 'IQ', 
		en: 'IQ', 
		tr: 'IQ', 
		de: 'IQ', 
		pt: '', 
		ru: '', 
		pages: ['TheMan', 'MerinEREN']
	}, 
	humanity: {
		ID: 'humanity', 
		en: 'humanity', 
		tr: 'insanlik', 
		de: '', 
		pt: '', 
		ru: '', 
		pages: ['Adele', 'MerinEREN']
	}, 
	justice: {
		ID: 'justice', 
		en: 'justice', 
		tr: 'adalet', 
		de: 'justice', 
		pt: '', 
		ru: '', 
		pages: ['TheMan', 'MerinEREN']
	}
}

class Contents extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			// contents: props.contents, 
			contents: contents, 
			newContents: {}, 
			inputErrTexts: {}
		}
		this.handleCreateNewContents = this.handleCreateNewContents.bind(this)
		this.handleContentChange = this.handleContentChange.bind(this)
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handlePostContents = this.handlePostContents.bind(this)
	}
	componentWillMount() {
		const {params, getContents} = this.props
		getContents({
			groupID: params.page
		})
		this.handleCreateNewContents()
	}
	handleCreateNewContents() {
		var {newContents} = this.state
		var tempObj = {}
		// MAKE THIS DYNAMIC !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		for(let i = Object.keys(newContents).length; i < Object.keys(newContents).length + 8; i++) {
			tempObj[`newContent_${i}`] = {
						ID: `newContent_${i}`, 
						en: '', 
						de: '', 
						pt:'', 
						tr: '', 
						ru: '', 
						pages: []
					}
		}
		this.setState({
			newContents: {
				...newContents, 
				...tempObj
			}
		})
	}
	handleContentChange(ID, field, value) {
		const {contents, newContents, inputErrTexts} = this.state
		if(contents.hasOwnProperty(ID)) {
			this.setState({
				contents: {
					...contents, 
					[ID]: {
						...contents[ID], 
						[field]: value
					}
				}, 
				inputErrTexts: {
					...inputErrTexts, 
					[ID]: {
						...inputErrTexts[ID], 
						[field]: ''
					}
				}
			})
		} else {
			this.setState({
				newContents: {
					...newContents, 
					[ID]: {
						...newContents[ID], 
						[field]: value
					}
				}, 
				inputErrTexts: {
					...inputErrTexts, 
					[ID]: {
						...inputErrTexts[ID], 
						[field]: ''
					}
				}
			})
		}
	}
	toggleDialog() {
		this.setState({showDialog: !this.state.showDialog})
	}
	handleAdd() {
		this.toggleDialog()
		const {contents, newContents} = this.state
		var tempObj = {}
		Object.entries(newContents).forEach( a => {
			// if(a[1].en !== '' && a[1].tr !== '')
			if(a[1].en !== '')
				tempObj[a[0]] = a[1]
		})
		this.setState({
			contents: {
				...contents, 
				...tempObj
			}, 
			newContents: {}
		})
	}
	handleRequiredInput() {
		const {contents, inputErrTexts} = this.state
		Object.entries(contents).forEach(a => {
			if(a[1].en === '') {
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
		})
		return true
	}
	handlePostContents() {
		if(!this.handleRequiredInput())
			return
		this.props.postContent({
			body: {
				type: 'FormData', 
				// Use 'contentType' for 'Blob' type.
				// contentType: 'application/json', 
				data: this.state.contents
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
				content={c} 
				inputErrTexts={inputErrTexts[c.ID]} 
				handleContentChange={this.handleContentChange} 
			/>
		)
	}
	render() {
		const {
			showDialog, 
			contents, 
			newContents
		} = this.state
		const {
			params
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
				onClick={this.handleCreateNewContents}
			/>, 
			<FlatButton
				label="Close"
				primary={true}
				onClick={this.toggleDialog}
			/>, 
			<FlatButton
				label="Add"
				primary={true}
				onClick={this.handleAdd}
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
						<GridList 
							style={styles.gridList}
							cols={4}
							padding={10}
							cellHeight={'auto'}
						>
							{ 
								Object.entries(contents).length > 0 
									? 
									this.contents(contents)
									:
									<h1>{params.page} page has no contents yet... </h1>
							}
							<FloatingActionButton 
								secondary={true}
								style={{
									...styles.floatingActionButton, 
									display: showDialog ? 'none' : 'inline-block'
								}}
								onClick={this.toggleDialog}
							>
								<ContentAdd />
							</FloatingActionButton>
						</GridList>
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
	getContents: PropTypes.func.isRequired, 
	contents: PropTypes.object.isRequired, 
	postContents: PropTypes.func.isRequired
}

export default Contents
