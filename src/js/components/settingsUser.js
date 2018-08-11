import React, {Component} from "react"
import PropTypes from "prop-types"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import FlatButton from "material-ui/FlatButton"

class UserSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTags: [], 
			inputErrText: {}
		}
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	componentWillMount () {
		this.props.getTags()
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleInputChange(event, index, values) {
		const target = event.target
		const name = target.name || "selectedTags"
		const value = target.value || values
		const {
			selectedTags, 
			inputErrText
		} = this.state
		this.setState({
			selectedTags: value, 
			inputErrText: {
				...inputErrText, 
				[name]: null
			}
		})
	}
	render() {
		const {
			selectedTags
		} = this.state
		const {
			contents, 
			tags
		} = this.props
		const items = Object.values(tags).map(v => <MenuItem
			key={v.ID}
			value={v.ID}
			primaryText={contents[v.name]}
			checked={selectedTags && selectedTags.indexOf(v.ID) > -1}
			insetChildren={true}
		/>)
		return (
			<div>
				<h1>USER</h1>
				<SelectField 
					multiple={true}
					hintText={"Select tags"}
					value={selectedTags}
					floatingLabelText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJaDCgw"]}
					onChange={this.handleInputChange}
				>
					{items}
				</SelectField>
				{
					// ADD CHANGED CONTROL BELOWE !!!!!!!!!!!!!!!!!!!!!
					selectedTags.length > 0 && 
						<FlatButton
							label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbNCww"] || " "}
							primary={true}
							onTouchTap={this.handlePost}
						/>
				}
			</div>
		)
	}
}

UserSettings.defaultProps = {
	contents: {}
}

UserSettings.propTypes = {
	contents: PropTypes.object.isRequired, 
	tags: PropTypes.object.isRequired, 
	getTags: PropTypes.func.isRequired, 
	// removeTags: PropTypes.func.isRequired
	removeTags: PropTypes.func
}

export default UserSettings
