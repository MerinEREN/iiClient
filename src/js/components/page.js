import React, {Component} from "react"
import PropTypes from "prop-types"
import browserHistory from "react-router/lib/browserHistory"
import {Card, CardActions, CardMedia, CardTitle, CardText} from "material-ui/Card"
import {List, ListItem} from "material-ui/List"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentCreate from "material-ui/svg-icons/content/create"
import FlatButton from "material-ui/FlatButton"
import DialogPageUpdate from "../containers/dialogPageUpdate"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "space-around"
	}, 
	floatingActionButton: {
		position: "fixed",
		bottom: 32, 
		right: 48
	}
}

// Show and modify all stored page properties, and also delete page.
class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			photoAddShow: false, 
			dialogShow: false
		}
		this.dialogToggle = this.dialogToggle.bind(this)
		this.photoAddToggle = this.photoAddToggle.bind(this)
		this.handlePhotoPost = this.handlePhotoPost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		const {
			photosGet, 
			pageGet, 
			params: {
				ID
			}
		} = this.props
		photosGet({
			URL: `/photos?q=${ID}`, 
			key: ID
		})
		pageGet({
			URL: `/pages/${ID}`
		})

	}
	dialogToggle() {
		this.setState({dialogShow: !this.state.dialogShow})
	}
	photoAddToggle() {
		const {
			photoAddShow
		} = this.state
		this.setState({photoAddShow: !photoAddShow})
	}
	handlePhotoPost() {
		const {
			params: {ID}, 
			photosPost
		} = this.props
		this.photoAddToggle()
		// TRY TO SEND AS JSON ENCODED []byte STRING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		photosPost({
			URL: `/photos?q=${ID}`, 
			data: {
				type: "FormData", 
				// Use "contextType" for "Blob" type.
				// contextType: "application/json", 
				value: {
					file: this.file.files[0]
				}
			}, 
			key: ID
		})
	}
	handleDelete() {
		const {
			params: {ID}, 
			pageDelete, 
			removeUpdateContextsWithThatPage
		} = this.props
		pageDelete({
			URL: `/pages/${ID}`, 
			data: {
				value: [ID]
			}
		}).then(response => {
			if (response.ok)
				removeUpdateContextsWithThatPage(ID)
		})
		browserHistory.goBack()
	}
	fileInputPhoto() {
			<input 
				type="file"
				accept="image/*" 
				ref={input => this.file = input}
			/>
	}
	render() {
		const {
			photoAddShow, 
			dialogShow
		} = this.state
		const {
			contexts, 
			pagePhoto, 
			page
		} = this.props
		return (
			<div style={styles.root}>
				<Card>
					<CardMedia>
						<img src={pagePhoto.link || "/img/adele.jpg"} />
					</CardMedia>
					<CardTitle title={page.name} />
					<CardText>
						<List>
							<ListItem 
								primaryText={contexts["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITW9kaWZpZWQM"] || "Modified"} 
								secondaryText={page.lastModified} 
								disabled={true} 
							/>
							<ListItem 
								primaryText={contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHQ3JlYXRlZAw"] || "Created"} 
								secondaryText={page.created} 
								disabled={true} 
							/>
						</List>
					</CardText>
					<CardActions>
						{
							photoAddShow ? 
								<div>
									{
										this.fileInputPhoto()
									}
									{
										this.file.files.length && 
											<FlatButton
												label={contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
												primary={true}
												onTouchTap={this.handlePhotoPost}
											/>
									}
									<FlatButton
										label={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"] || "Close"}
										onTouchTap={this.photoAddToggle}
									/>
								</div> : 
								<FlatButton 
									label={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Update Photo"}
									onTouchTap={this.photoAddToggle} 
								/>
						}
						<FlatButton 
							label={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
							secondary={true}
							onTouchTap={this.handleDelete} 
						/>
					</CardActions>
				</Card>
				{
					!dialogShow 
						&& 
						<FloatingActionButton 
							secondary={true}
							style={styles.floatingActionButton}
							onTouchTap={this.dialogToggle}
						>
							<ContentCreate />
						</FloatingActionButton>
				}
				<DialogPageUpdate
					contexts={contexts} 
					title={contexts["aghkZXZ-Tm9uZXIcCxIHQ29udGVudCIPVXBkYXRlIFRoZSBQYWdlDA"] || "Update The Page"}
					page={page}
					dialogShow={dialogShow} 
			dialogToggle={this.dialogDemandToggle}
		/>
	</div>
		)
	}
}

Page.defaultProps = {
	contexts: {}, 
	page: {}
}

Page.propTypes = {
	contexts: PropTypes.object.isRequired, 
	photosGet: PropTypes.func.isRequired, 
	pagePhoto: PropTypes.object, 
	pageGet: PropTypes.func.isRequired, 
	page: PropTypes.object.isRequired, 
	pageDelete: PropTypes.func.isRequired, 
	removeUpdateContextsWithThatPage: PropTypes.func.isRequired
}

export default Page
