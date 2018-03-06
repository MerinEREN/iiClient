import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {Link} from 'react-router'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import VerticalStepper from './verticalStepper'
import TextField from 'material-ui/TextField'

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap', 
		justifyContent: 'space-around'
	}, 
	link: {
		activeStyle: {
			color: '#0097a7'
		}
	}, 
	floatingActionButton: {
		position: 'fixed',
		bottom: 32, 
		right: 48
	}
}

// Show and modify all stored page properties, and also delete page.
// Link to the corresponding page contents.
class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			title: "", 
			inputErrText: {}
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handlePut = this.handlePut.bind(this)
		this.handleRequiredInput = this.handleRequiredInput.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	componentWillMount() {
		const {getPage, params: {ID}} = this.props
		getPage({
			URL: `/pages/?ID=${ID}`
		})

	}
	// Make dynamic
	handleRequiredInput(i) {
		switch (i) {
			case 0:
				if(!this.state.title) {
					this.setState({
						inputErrText:{
							title: 'Required filed'
						}
					})
					return true
				}
				return false
		}
	}
	handleInputChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value
		this.setState({
			title: value, 
			inputErrText: {[name]: ''}
		})
	}
	handlePut() {
		this.toggleDialog()
		const {title} = this.state
		const {putPage, params: {ID}, page} = this.props
		// ADD ALSO ORIGINAL PAGE AS dataOld IF PUT FAILS !!!!!!!!!!!!!!!!!!!!!!!!!
		putPage({
			URL: `/pages/?ID=${ID}`, 
			body: {
				type: 'FormData', 
				// Use 'contentType' for 'Blob' type.
				// contentType: 'application/json', 
				data: {
					[ID]: {
						title: title.trim(), 
						file: this.file.files[0] 
					}
				}, 
				dataOld: {
					[ID]: page
				}
			}
		})
		this.setState({title: ""})
	}
	handleDelete(ID, pageObj) {
		this.props.deletePage({
			URL: `/pages/?ID=${ID}`, 
			body: {
				type: 'FormData', 
				data: pageObj
			}
		})
		browserHistory.goBack()
	}
	toggleDialog() {
		const {showDialog} = this.state
		this.setState({showDialog: !showDialog})
	}
	updatePageForm() {
		const {inputErrText, title} = this.state
		return (
			<VerticalStepper 
				stepLabels={[
					'Page Title', 
					'Page Thumbnail'
				]} 
				stepContents={[
					<TextField 
						name='title' 
						value={title}
						floatingLabelText="Page Title" 
						errorText={inputErrText.title}
						onChange={this.handleInputChange}
					/>, 
					<input 
						type='file'
						name='file' 
						ref={input => this.file = input}
					/>
				]}
				setInputErrorMessage={this.handleRequiredInput}
			/>
		)
	}
	render() {
		const {showDialog} = this.state
		const {page, params: {ID}} = this.props
		const actions = [
			<FlatButton
				label="Close"
				primary={true}
				onClick={this.toggleDialog}
			/>, 
			<FlatButton
				label="Save"
				primary={true}
				onClick={this.handlePut}
			/>
		]
		return (
			<div style={styles.root}>
				<Card>
					<CardMedia>
						<img src={page.link || '/img/adele.jpg'} />
					</CardMedia>
					<CardTitle title={page.title} />
					<CardText>
						<List>
							<ListItem primaryText="Last Modified" secondaryText={page.lastModified} disabled={true} />
							<ListItem primaryText="Created" secondaryText={page.created} disabled={true} />
						</List>
					</CardText>
					<CardActions>
						<FlatButton 
							label="Delete" 
							onTouchTap={() => this.handleDelete(ID, {[ID]: page})} 
						/>
					</CardActions>
				</Card>
				<FloatingActionButton 
					secondary={true}
					style={{
						...styles.floatingActionButton, 
						display: showDialog ? 'none' : 'inline-block'
					}}
					onTouchTap={this.toggleDialog}
				>
					<ContentCreate />
				</FloatingActionButton>
				<Dialog
					title="Update The Page"
					children={this.updatePageForm()}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

// For "undefined required page" error when refreshing the page.
Page.defaultProps = {
	page: {}
}

Page.propTypes = {
	getPage: PropTypes.func.isRequired, 
	page: PropTypes.object.isRequired, 
	putPage: PropTypes.func.isRequired
}

Page.muiName = 'GridList'

export default Page
