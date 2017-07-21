import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import TextField from 'material-ui/TextField'
import {trimSpace} from '../middlewares/utilities'

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap', 
		justifyContent: 'space-around'
	}, 
	gridList: {
		margin: 0
	}, 
	link: {
		activeStyle: {
			color: '#0097a7'
		}
	}, 
	gridTile: {
		titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)", 
		style: {
			cursor: 'pointer'
		}
	}
}

class Contents extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dapb: true, 
			title: "", 
			inputErrText: {}
		}
		this.handleAddContent = this.handleAddContent.bind(this)
		this.handlePostContent = this.handlePostContent.bind(this)
		this.handleRequiredInput = this.handleRequiredInput.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	componentWillMount() {
		const {getContents, getLanguagesCount} = this.props
		getLanguagesCount()
		getContents()
		/* this.setState({contents: {
			...this.state.contents, 
			'Add Content': {
				title: 'Add Content', 
				src: '/img/1075699_472676169493047_514880014_n.jpg'
			}
		}}) */
	}
	handleRequiredInput(i) {
		switch (i) {
			case 0:
				if(!this.state.title) {
					this.setState({
						inputErrText:{
							title: 'Content name is required'
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
	handlePostContent() {
		const {title} = this.state
		const {postContent} = this.props
		this.handleAddContent()
		postContent({
			body: {
				type: 'FormData', 
				// Use 'contentType' for 'Blob' type.
				// contentType: 'appliceation/json', 
				data: {
					[trimSpace(title)]: {
						ID: trimSpace(title), 
						title: title, 
						file: this.file.files[0] 
					}
				}
			}
		})
	}
	handleAddContent() {
		const {dapb} = this.state
		this.setState({
			dapb: !dapb, 
			title: ""
		})
	}
	renderGridTile(ID, p) {
		const {dapb} = this.state
		return (
			<GridTile  
				key={ID}
				title={p.title}
				titleBackground={styles.gridTile.titleBackground} 
				cols={ID === 'Body' ? 2 : 1} 
				rows={ID === 'Body' ? 1 : 1}
				style={styles.gridTile.style} 
				containerElement={
						<Link 
							to={p.ID} 
							activeStyle={styles.link.activeStyle} 
						/> 
				}
			>
				<img src={p.link || 'img/adele.jpg'} />
			</GridTile>
		)
	}
	renderAddContentForm() {
		const {inputErrText, title} = this.state
		return (
			<form>
				<VerticalStepper 
					stepLabels={[
						'Content Title', 
						'Content Thumbnail'
					]} 
					stepContents={[
						<TextField 
							name='title' 
							value={title}
							floatingLabelText="Content Title" 
							errorText={inputErrText.title}
							onChange={this.handleInputChange}
						/>, 
						<input 
							type='file'
							name='file' 
							ref={i => this.file = i}
						/>
					]}
					save={this.handlePostContent}
					cancel={this.handleAddContent}
					setInputErrorMessage={this.handleRequiredInput}
				/>
			</form>
		)
	}
	render() {
		const {dapb} = this.state
		const {contents} = this.props
		return (
			<div style={styles.root}>
				<GridList 
					cols={4} 
					cellHeight='auto'
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
								Object.entries(contents).map(a => this.renderGridTile(...a))
							}
							<GridTile  
								title={'Add Content'}
								titleBackground={styles.gridTile.titleBackground} 
								style={{
									display: dapb
									? 
									'block' 
									: 
									'none', 
									...styles.gridTile.style
								}}
								onTouchTap={this.handleAddContent}
							>
								<img src='/img/1075699_472676169493047_514880014_n.jpg' />
							</GridTile>
							<GridTile 
								cols={4}
								style={{display: !dapb ? 'block' : 'none', ...styles.gridTile.style}}
							>
								{this.renderAddContentForm()}
							</GridTile>
						</GridList>
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
			</div>
		)
	}
}

Contents.propType = {
	getContents: PropTypes.func.isRequired, 
	contents: PropTypes.object.isRequired, 
	getLanguagesCount: PropTypes.func.isRequired, 
	langCount: PropTypes.object.isRequired, 
	postContents: PropTypes.func.isRequired
}

export default Contents

