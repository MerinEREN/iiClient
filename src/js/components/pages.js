import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {GridList, GridTile} from 'material-ui/GridList'
import VerticalStepper from './verticalStepper'
import TextField from 'material-ui/TextField'

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

class Pages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dapb: true, 
			title: '', 
			inputErrText: {}
		}
		this.handleAddPage = this.handleAddPage.bind(this)
		this.handlePostPage = this.handlePostPage.bind(this)
		this.handleRequiredInput = this.handleRequiredInput.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	componentWillMount() {
		this.props.getPages()
		/* this.setState({pages: {
			...this.state.pages, 
			'Add Page': {
				title: 'Add Page', 
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
							title: 'Page name is required'
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
			[name]: value, 
			inputErrText: {[name]: ''}
		})
	}
	handlePostPage() {
		const {title} = this.state
		const {postPage} = this.props
		this.handleAddPage()
		const blob = new Blob([JSON.stringify({
			title: title, 
			path: this.fileName.value 
		})], {type : 'application/json'})
		postPage({
			body: blob
		})
	}
	handleAddPage() {
		const {dapb} = this.state
		this.setState({
			dapb: !dapb, 
			title: ''
		})
	}
	renderGridTile(ID, p) {
		const {dapb} = this.state
		console.log(ID, p)
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
							to={p.path} 
							activeStyle={styles.link.activeStyle} 
						/> 
				}
			>
				<img src={p.path} />
			</GridTile>
		)
	}
	renderAddPageForm() {
		const {inputErrText, title} = this.state
		return (
			<form>
				<VerticalStepper 
					stepLabels={[
						'Page Title', 
						'Page Thumbnail'
					]} 
					stepContents={[
						<TextField 
							name='title' 
							value={title}
							floatingLabelText="Page Title" 
							errorText={inputErrText.title}
							onChange={this.handleInputChange}
						/>, 
						<input 
							type='file'
							name='Path' 
							ref={i => this.fileName = i}
						/>
					]}
					save={this.handlePostPage}
					cancel={this.handleAddPage}
					setInputErrorMessage={this.handleRequiredInput}
				/>
			</form>
		)
	}
	render() {
		const {dapb} = this.state
		const {pages} = this.props
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
								Object.entries(pages).map((ID, p) => this.renderGridTile(ID, p))
							}
							<GridTile  
								title={'Add Page'}
								titleBackground={styles.gridTile.titleBackground} 
								style={{
									display: dapb
									? 
									'block' 
									: 
									'none', 
									...styles.gridTile.style
								}}
								onTouchTap={this.handleAddPage}
							>
								<img src='/img/1075699_472676169493047_514880014_n.jpg' />
							</GridTile>
							<GridTile 
								cols={4}
								style={{display: !dapb ? 'block' : 'none', ...styles.gridList}}
							>
								{this.renderAddPageForm()}
							</GridTile>
						</GridList>
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
			</div>
		)
	}
}

Pages.propType = {
	getPages: PropTypes.func.isRequired, 
	pages: PropTypes.object.isRequired, 
	postPage: PropTypes.func.isRequired
}

export default Pages
