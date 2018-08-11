import React, {Component} from "react"
import PropTypes from "prop-types"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import FlatButton from "material-ui/FlatButton"

class AccountSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTags: [], 
			inputErrText: {}
		}
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	componentWillMount () {
		const {
			getTags, 
			getTagsAccount
		} = this.props
		getTags()
		getTagsAccount()
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
		const menuItems = Object.values(tags).map(v => <MenuItem
			key={v.ID}
			value={v.ID}
			primaryText={contents[v.name]}
			checked={selectedTags && selectedTags.indexOf(v.ID) > -1}
			insetChildren={true}
		/>)
		return (
			<div>
				<h1>ACCOUNT</h1>
				<SelectField 
					multiple={true}
					hintText={"Select tags"}
					value={selectedTags}
					floatingLabelText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJaDCgw"]}
					onChange={this.handleInputChange}
				>
					{menuItems}
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

AccountSettings.defaultProps = {
	contents: {}
}

AccountSettings.propTypes = {
	contents: PropTypes.object.isRequired, 
	tags: PropTypes.object.isRequired, 
	tagsAccount: PropTypes.object.isRequired, 
	getTags: PropTypes.func.isRequired, 
	getTagsAccount: PropTypes.func.isRequired, 
	// removeTag: PropTypes.func.isRequired
	removeTag: PropTypes.func
	// addUser: PropTypes.func.isRequired
}

export default AccountSettings
