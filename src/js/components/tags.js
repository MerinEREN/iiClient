import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import TagTile from "./tagTile"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "center"
	}, 
	gridList: {
		margin: 20
	}, 
	floatingActionButton: {
		position: "fixed",
		bottom: 32, 
		right: 48
	}
}

class Tags extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			stepIndex: 0, 
			tagNew: {
				contentID: ""
			}, 
			inputErrTexts: {}
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.tagsGet()
	}
	handleStepIndex(direction) {
		const {stepIndex} = this.state
		switch (direction) {
			case "next":
				if(this.handleRequiredField(stepIndex))
					return
				this.setState({
					stepIndex: stepIndex + 1,
				})
				break
			case "prev":
				this.setState({
					stepIndex: stepIndex - 1,
				})
				break
		}
	}
	handleRequiredField(i) {
		const {contents} = this.props
		let key
		switch (i) {
			case 1:
				key = "contentID"
				break
			default:
				return false
		}
		if (!this.state.tagNew[key]) {
			this.setState({
				inputErrTexts: {
					...this.state.inputErrTexts, 
					[key]: contents["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOUmVxdWlyZWQgRmllbGQM"] || "Required Field"
				}
			})
			return true
		}
		return false
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleInputChange(event, index, values) {
		const target = event.target
		const name = target.name
		const value = target.value
		const {
			tagNew, 
			inputErrTexts
		} = this.state
		this.setState({
			tagNew: {
				...tagNew, 
				[name]: value
			}, 
			inputErrTexts: {
				...inputErrTexts, 
				[name]: null
			}
		})
	}
	handlePost() {
		const {
			stepIndex, 
			tagNew
		} = this.state
		if(this.handleRequiredField(stepIndex))
			return
		this.toggleDialog()
		this.props.tagsPost({
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					tag: {
						...tagNew
					}
				}
			}
		})
		this.setState({
			tagNew: {
				contentID: ""
			}, 
			stepIndex: 0
		})
	}
	toggleDialog() {
		this.setState({showDialog: !this.state.showDialog})
	}
	handleDelete(ID) {
		this.props.tagDelete({
			URL: `/tags/${ID}`, 
			body: {
				data: [ID]
			}
		})
	}
	tagTiles(tags) {
		const {
			contents
		} = this.props
		return Object.entries(tags).map(([k, v]) => 
			<TagTile 
				key={k} 
				tag={v} 
				text={contents[v.contentID]}
				handleDelete={this.handleDelete}
			/>)
	}
	render() {
		const {
			root, 
			gridList, 
			floatingActionButton
		} = styles
		const {
			showDialog, 
			stepIndex, 
			inputErrTexts, 
			tagNew
		} = this.state
		const {
			contents, 
			tags
		} = this.props
		const stepLabels = Object.keys(contents).length > 0 ?
			[
				contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"], 
				contents["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"]
			] :
			[
				"Description", 
				"Tag"
			]
		const stepContents = [
			<p>
				{contents["aghkZXZ-Tm9uZXIyCxIHQ29udGVudCIlQWRkIGEgbmV3IHRhZy4gVGhlIGZpZWxkIGlzIHJlcXVpcmVkLgw"] || "Add a new tag. The field is required."}
			</p>, 
			<TextField 
				name="contentID"
				value={tagNew.contentID || ""}
				floatingLabelText="ID"
				errorText={inputErrTexts.contentID}
				onChange={this.handleInputChange}
			/>
		]
		const children = <VerticalStepper 
			stepLabels={stepLabels} 
			stepContents={stepContents}
			stepIndex={stepIndex}
			updateStepIndex={this.handleStepIndex}
			contents={contents}
		/>
		const actions = [
			<FlatButton
				label={contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"] || "Close"}
				onTouchTap={this.toggleDialog}
			/>
		]
		stepContents.length - 1 === stepIndex && actions.push(<FlatButton
			label={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
			primary={true}
			onTouchTap={this.handlePost}
		/>)
		return (
			<div style={root}>
				{ 
					Object.entries(tags).length !== 0 
						? 
						<GridList 
							style={gridList}
						>
							{this.tagTiles(tags)}
						</GridList>
						:
						<h3>{contents["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"] || "No Content"}</h3>
				}
				{
					!showDialog && 
						<FloatingActionButton 
							secondary={true}
							style={floatingActionButton}
							onTouchTap={this.toggleDialog}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<Dialog
					title={contents["aghkZXZ-Tm9uZXIaCxIHQ29udGVudCINQWRkIEEgTmV3IFRhZww"] || "Add A New Tag"}
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

Tags.defaultProps = {
	contents: {}
}

Tags.propTypes = {
	contents: PropTypes.object.isRequired, 
	tagsGet: PropTypes.func.isRequired, 
	tags: PropTypes.object.isRequired, 
	tagsPost: PropTypes.func.isRequired, 
	tagDelete: PropTypes.func.isRequired
}

Tags.muiName = "GridList"

export default Tags
