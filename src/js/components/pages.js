import React, {Component} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router"
import {GridList, GridTile} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import {trimSpace} from "../middlewares/utilities"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "space-around"
	}, 
	gridList: {
		margin: 0
	}, 
	link: {
		activeStyle: {
			color: "#0097a7"
		}
	}, 
	gridTile: {
		titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)", 
		style: {
			cursor: "pointer"
		}
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
		this.handlePost = this.handlePost.bind(this)
		this.handleRequiredInput = this.handleRequiredInput.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
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
	page(ID, p) {
		return (
			<GridTile  
				key={ID}
				title={p.title}
				titleBackground={styles.gridTile.titleBackground} 
				cols={ID === "Root" ? 2 : 1} 
				rows={ID === "Root" ? 1 : 1}
				style={styles.gridTile.style} 
				containerElement={
					<Link 
						to={`/pages/${p.ID}`} 
						activeStyle={styles.link.activeStyle} 
					/> 
				}
			>
				<img src={p.link || "/img/adele.jpg"} />
			</GridTile>
		)
	}
	addPageForm() {
		const {inputErrText, title} = this.state
		return (
			<form>
				<VerticalStepper 
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
			</form>
		)
	}
	render() {
		const {showDialog} = this.state
		const {pages} = this.props
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
			<div style={styles.root}>
				<GridList 
					cols={4} 
					cellHeight="auto"
					style={styles.gridList}
				>
					<GridTile cols={1} />  
					<GridTile cols={2}>  
						<GridList 
							style={styles.gridList}
							cols={4}
							padding={10}
							cellHeight={333}
						>
							{ 
								Object.entries(pages).length !== 0 
									? 
									Object.entries(pages).map(a => this.page(...a))
									:
									<h3>No Pages</h3>
							}
							<FloatingActionButton 
								secondary={true}
								style={{
									...styles.floatingActionButton, 
									display: showDialog ? "none" : "inline-block"
								}}
								onTouchTap={this.toggleDialog}
							>
								<ContentAdd />
							</FloatingActionButton>
						</GridList>
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
				<Dialog
					title="Add New Page"
					children={this.addPageForm()}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

Pages.propTypes = {
	getPages: PropTypes.func.isRequired, 
	pages: PropTypes.object.isRequired, 
	postPage: PropTypes.func.isRequired
}

Pages.muiName = "GridList"

export default Pages
