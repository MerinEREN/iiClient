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
				name: ""
			}, 
			inputErrText: {}
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
				if(this.handleRequiredInput(stepIndex))
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
	handleRequiredInput(i) {
		const {contents} = this.props
		let key
		switch (i) {
			case 1:
				key = "name"
				break
			default:
				return false
		}
		if (!this.state.tagNew[key]) {
			this.setState({
				inputErrText: {
					...this.state.inputErrText, 
					[key]: contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaNCgw"]
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
			inputErrText
		} = this.state
		this.setState({
			tagNew: {
				...tagNew, 
				[name]: value
			}, 
			inputErrText: {
				...inputErrText, 
				[name]: null
			}
		})
	}
	handlePost() {
		const {
			stepIndex, 
			tagNew
		} = this.state
		if(this.handleRequiredInput(stepIndex))
			return
		this.toggleDialog()
		this.props.tagPost({
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
				name: ""
			}, 
			stepIndex: 0
		})
	}
	toggleDialog() {
		this.setState({showDialog: !this.state.showDialog})
	}
	handleDelete(ID) {
		this.props.tagsDelete({
			URL: `/tags?ID=${ID}`, 
			body: {
				type: "FormData", 
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
				name={contents[v.name]}
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
			inputErrText, 
			tagNew
		} = this.state
		const {
			contents, 
			tags
		} = this.props
		const stepLabels = [
			contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbDCAw"], 
			contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbDCww"]
		]
		const stepContents = [
			<p>
				{contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIH-CQw"]}
			</p>, 
			<TextField 
				name="name"
				value={tagNew.name || ""}
				floatingLabelText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIGBCAw"]}
				errorText={inputErrText.name}
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
				label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCww"] || " "}
				onTouchTap={this.toggleDialog}
			/>
		]
		stepContents.length - 1 === stepIndex && actions.push(<FlatButton
			label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbNCww"] || " "}
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
						<h3>{contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI6lCgw"]}</h3>
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
					title={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIHeCAw"]}
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
	tagPost: PropTypes.func.isRequired, 
	tagsDelete: PropTypes.func.isRequired
}

Tags.muiName = "GridList"

export default Tags
