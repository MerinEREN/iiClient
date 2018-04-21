import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from 'material-ui/RaisedButton'
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import {trimSpace} from "../middlewares/utilities"
import PageTile from "./pageTile"
import {generateURLVariableFromIDs} from './utilities'

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

class Pages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			title: "", 
			inputErrText: {}
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleRequiredInput = this.handleRequiredInput.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.getPages()
	}
	handleRequiredInput(i) {
		switch (i) {
			case 1:
				if(!this.state.title) {
					this.setState({
						inputErrText:{
							title: "Required filed"
						}
					})
					return true
				}
				return false
			default:
				return false
		}
	}
	handleInputChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value
		this.setState({
			title: value, 
			inputErrText: {[name]: ""}
		})
	}
	handlePost() {
		this.toggleDialog()
		const {title} = this.state
		this.props.postPage({
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					[trimSpace(title)]: {
						ID: trimSpace(title), 
						title: title.trim(), 
						file: this.file.files[0] 
					}
				}
			}
		})
		this.setState({title: ""})
	}
	toggleDialog() {
		const {showDialog} = this.state
		this.setState({showDialog: !showDialog})
	}
	handleDelete() {
		const {
			pageIDsSelected, 
			deletePages, 
			buttonSet
		}= this.props
		deletePages({
			URL: `/pages?IDs=${generateURLVariableFromIDs(pageIDsSelected)}`, 
			body: {
				data: pageIDsSelected
			}
		})
		buttonSet("pagesDelete")
	}
	pageTiles(pages) {
		return Object.entries(pages).map(([k, v]) => {
			console.log(this.props.pageIDsSelected.indexOf(k) !== -1)
			return <PageTile
				key={k} 
				page={v} 
				isChecked={this.props.pageIDsSelected.indexOf(k) !== -1}
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
			title, 
			inputErrText
		} = this.state
		const {
			pages, 
			pageIDsSelected, 
			deleteClicked
		} = this.props
		const children = <VerticalStepper 
			stepLabels={[
				"Description", 
				"Page Title", 
				"Page Thumbnail"
			]} 
			stepContents={[
				<p>
					Create a new page with a name.
					Uploading a file as a page foto is 
					not required.
				</p>, 
				<TextField 
					name="title" 
					value={title}
					floatingLabelText="Page Title" 
					errorText={inputErrText.title}
					onChange={this.handleInputChange}
				/>, 
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
							Object.entries(pages).length !== 0 
							? 
							<GridList 
								style={gridList}
								cols={4}
								padding={10}
								cellHeight={333}
							>
								{this.pageTiles(pages)}
							</GridList>
							:
							<h3>No Pages</h3>
						}
						{
							(!deleteClicked && pageIDsSelected.length > 0)
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
					title="Add New Page"
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

Pages.defaultProps = {
	deleteClicked: false
}

Pages.propTypes = {
	getPages: PropTypes.func.isRequired, 
	pages: PropTypes.object.isRequired, 
	postPage: PropTypes.func.isRequired, 
	pageIDsSelected: PropTypes.array.isRequired, 
	deletePages: PropTypes.func.isRequired, 
	deleteClicked: PropTypes.bool.isRequired, 
	buttonSet: PropTypes.func.isRequired
}

Pages.muiName = "GridList"

export default Pages
