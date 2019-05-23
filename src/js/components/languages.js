import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import RaisedButton from "material-ui/RaisedButton"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import DialogLanguageCreate from "../containers/DialogLanguageCreate"
import TileLanguage from "./tileLanguage"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContext: "space-around"
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
			dialogShow: false
		}
		this.dialogToggle = this.dialogToggle.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.languagesGet()
	}
	dialogToggle() {
		this.setState({dialogShow: !this.state.dialogShow})
	}
	handleDelete() {
		const {
			languageIDsSelected, 
			languagesDelete
		} = this.props
		languagesDelete({
			URL: `/languages?IDs=${generateURLVariableFromIDs(languageIDsSelected)}`, 
			data: {
				value: languageIDsSelected
			}
		})
	}
	tilesLanguage(languages) {
		const {
			contexts, 
			languageIDsSelected
		} = this.props
		return Object.values(languages).map(v => 
			<TileLanguage 
				key={v.ID} 
				language={v} 
				title={contexts[v.contextID] || v.ID}
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
			dialogShow
		} = this.state
		const {
			contexts, 
			languages, 
			languageIDsSelected
		} = this.props
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
							Object.keys(languages).length ? 
							<GridList 
								style={gridList}
								cols={4}
								padding={10}
								cellHeight={333}
							>
								{this.tilesLanguage(languages)}
							</GridList> : 
							<h3>{contexts["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"] || "No Content"}</h3>
						}
						{
							languageIDsSelected.length > 0 && 
								<RaisedButton
									label={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
									style={raisedButton}
									secondary={true}
									onTouchTap={this.handleDelete}
								/>
						}
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
				{
					!dialogShow && 
						<FloatingActionButton 
							secondary={true}
							style={floatingActionButton}
							onTouchTap={this.dialogToggle}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<DialogLanguageCreate
					contexts={contexts} 
					title={contexts["aghkZXZ-Tm9uZXIfCxIHQ29udGVudCISQWRkIEEgTmV3IExhbmd1YWdlDA"] || "Add A New Language"}
					dialogShow={dialogShow} 
					dialogToggle={this.dialogToggle}
				/>
			</div>
		)
	}
}

Languages.defaultProps = {
	contexts: {}
}

Languages.propTypes = {
	contexts: PropTypes.object.isRequired, 
	languagesGet: PropTypes.func.isRequired, 
	languages: PropTypes.object, 
	languageIDsSelected: PropTypes.array, 
	languagesDelete: PropTypes.func.isRequired
}

Languages.muiName = "GridList"

export default Languages
