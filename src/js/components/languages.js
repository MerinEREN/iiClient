import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import RaisedButton from "material-ui/RaisedButton"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import VerticalStepper from "./verticalStepper"
import SelectField from "material-ui/SelectField"
import TextField from "material-ui/TextField"
import MenuItem from "material-ui/MenuItem"
import LanguageTile from "./languageTile"
import {generateURLVariableFromIDs} from "./utilities"

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

class Languages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			stepIndex: 0, 
			langNew: {
				ID: "",  
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
		this.props.getLanguages()
	}
	componentWillReceiveProps (nextProps) {
		if (this.props.contents !== nextProps.contents)
			this.items = [
				<MenuItem 
					key={1} 
					value="tr-TR" 
					primaryText={nextProps.contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgKaTCgw"]} 
				/>,
				<MenuItem 
					key={2} 
					value="en-US" 
					primaryText={nextProps.contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgKaTCQw"]} 
				/>,
				<MenuItem 
					key={3} 
					value="de-DE" 
					primaryText={nextProps.contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgKaTCww"]} 
				/>,
				<MenuItem 
					key={4} 
					value="ru-RU" 
					primaryText={nextProps.contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgKbTCAw"]} 
				/>
			]
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
		const {
			contents
		} = this.props
		let key
		switch (i) {
			case 1:
				key = "ID"
				break
			case 2:
				key = "name"
				break
			default:
				return false
		}
		if (!this.state.langNew[key]) {
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
		const name = target.name || "ID"
		const value = target.value || values
		const {langNew, inputErrText} = this.state
		this.setState({
			langNew: {
				...langNew, 
				[name]: value
			}, 
			inputErrText: {
				...inputErrText, 
				[name]: null
			}
		})
	}
	handlePost() {
		this.toggleDialog()
		const {langNew} = this.state
		this.props.postLanguage({
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					[langNew.ID]: {
						...langNew, 
						file: this.file.files[0] 
					}
				}
			}
		})
		this.setState({
			langNew: {
				ID: "", 
				name: ""
			}, 
			stepIndex: 0
		})
	}
	toggleDialog() {
		this.setState({showDialog: !this.state.showDialog})
	}
	handleDelete() {
		const {languageIDsSelected, deleteLanguages} = this.props
		deleteLanguages({
			URL: `/languages?IDs=${generateURLVariableFromIDs(languageIDsSelected)}`, 
			body: {
				type: "FormData", 
				data: languageIDsSelected
			}
		})
	}
	languageTiles(languages) {
		const {contents, languageIDsSelected} = this.props
		return Object.values(languages).map(v => 
			<LanguageTile 
				key={v.ID} 
				language={v} 
				title={contents[v.name] || v.ID}
				isChecked={languageIDsSelected.indexOf(v.ID) !== -1}
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
			stepIndex, 
			inputErrText, 
			langNew
		} = this.state
		const {
			contents, 
			languages, 
			languageIDsSelected
		} = this.props
		const stepLabels = [
			contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbDCAw"], 
			contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJaDCgw"], 
			contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbDCww"], 
			contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLajCAw"]
		]
		const stepContents = [
			<p>
				{contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaDCAw"]}
			</p>, 
			<SelectField 
				value={langNew.ID}
				floatingLabelText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJaDCgw"]}
				errorText={inputErrText.ID}
				onChange={this.handleInputChange}
			>
				{this.items}
			</SelectField>, 
			<TextField 
				name="name"
				value={langNew.name || ""}
				floatingLabelText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaTCQw"]}
				errorText={inputErrText.name}
				onChange={this.handleInputChange}
			/>, 
			<input 
				type="file"
				ref={input => this.file = input}
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
				<GridList 
					cols={4} 
					cellHeight="auto"
					style={gridList}
				>
					<GridTile cols={1} />  
					<GridTile cols={2}>  
					{ 
						Object.entries(languages).length !== 0 
							? 
							<GridList 
								style={gridList}
								cols={4}
								padding={10}
								cellHeight={333}
							>
								{this.languageTiles(languages)}
							</GridList>
							:
							<h3>{contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI6lCgw"]}</h3>
					}
					{
						languageIDsSelected.length > 0 && 
							<RaisedButton
								label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCAw"] || " "}
								style={raisedButton}
								secondary={true}
								onTouchTap={this.handleDelete}
							/>
					}
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
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
					title={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbTCQw"]}
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

Languages.defaultProps = {
	contents: {}
}

Languages.propTypes = {
	contents: PropTypes.object.isRequired, 
	getLanguages: PropTypes.func.isRequired, 
	languages: PropTypes.object.isRequired, 
	postLanguage: PropTypes.func.isRequired, 
	languageIDsSelected: PropTypes.array.isRequired, 
	deleteLanguages: PropTypes.func.isRequired
}

Languages.muiName = "GridList"

export default Languages
