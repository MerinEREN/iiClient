import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import VerticalStepper from './verticalStepper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap', 
		justifyContent: 'space-around'
	}, 
	gridList: {
		margin: 0
	}, 
	gridTile: {
		titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)", 
		style: {
			cursor: 'pointer'
		}
	}
}

const items = [
	<MenuItem key={1} value="tr" primaryText="Turkish" />,
	<MenuItem key={2} value="en" primaryText="English" />,
	<MenuItem key={3} value="de" primaryText="German" />,
	<MenuItem key={4} value="zh-cn" primaryText="Chinese" />,
	<MenuItem key={5} value="pt" primaryText="Portuguese" />,
	<MenuItem key={6} value="ru" primaryText="Russian" />,
]

class Languages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dalb: true, 
			code: "",    
			inputErrText: {}
		}
		this.handleAddLanguage = this.handleAddLanguage.bind(this)
		this.handlePostLanguage = this.handlePostLanguage.bind(this)
		this.handleRequiredInput = this.handleRequiredInput.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	componentWillMount() {
		this.props.getLanguages()
	}
	handleRequiredInput(i) {
		switch (i) {
			case 1:
				if(!this.state.code) {
					this.setState({
						inputErrText:{
							code: 'Required field'
						}
					})
					return true
				}
				return false
			case 2:
				if(!this.file.files[0]) {
					this.setState({
						inputErrText:{
							file: 'Required field'
						}
					})
					return true
				}
				return false
			default:
				return false
		}
	}
	handleInputChange(event, index, value) {
		const target = event.target
		const name = target.name
		if(name !== "file") {
			this.setState({
				code: value, 
				inputErrText: {code: ''}
			})
		}
		this.setState({
			inputErrText: {file: ''}
		})
	}
	handlePostLanguage() {
		const {code} = this.state
		const {postLanguage} = this.props
		this.handleAddLanguage()
		postLanguage({
			body: {
				type: 'FormData', 
				// Use 'contentType' for 'Blob' type.
				// contentType: 'appliceation/json', 
				data: {
					[code]: {
						code: code, 
						file: this.file.files[0] 
					}
				}
			}
		})
	}
	handleAddLanguage() {
		const {dalb} = this.state
		this.setState({
			dalb: !dalb, 
			code: ""
		})
	}
	renderGridTile(ID, language) {
		const {dalb} = this.state
		return (
			<GridTile  
				key={ID}
				title={language.code}
				titleBackground={styles.gridTile.titleBackground} 
				style={styles.gridTile.style} 
			>
				<img src={language.link || 'img/adele.jpg'} />
			</GridTile>
		)
	}
	renderAddLanguageForm() {
		const {inputErrText, code} = this.state
		return (
			<form>
				<VerticalStepper 
					stepLabels={[
						'Description', 
						'Language', 
						'Thumbnail'
					]} 
					stepContents={[
						<p>
							Select a language from the select field.
						</p>, 
						<SelectField 
							value={code}
							floatingLabelText="Language" 
							errorText={inputErrText.code}
							onChange={this.handleInputChange}
						>
							{items}
						</SelectField>, 
						<input 
							type='file'
							name='file' 
							ref={i => this.file = i}
							onChange={this.handleInputChange}
						/>
					]}
					save={this.handlePostLanguage}
					cancel={this.handleAddLanguage}
					setInputErrorMessage={this.handleRequiredInput}
				/>
			</form>
		)
	}
	render() {
		const {dalb} = this.state
		const {languages} = this.props
		return (
			<div style={styles.root}>
				<GridList 
					cols={3} 
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
								Object.entries(languages).map(a => this.renderGridTile(...a))
							}
							<GridTile  
								title={'Add Language'}
								titleBackground={styles.gridTile.titleBackground} 
								style={{
									display: dalb
									? 
									'block' 
									: 
									'none', 
									...styles.gridTile.style
								}}
								onTouchTap={this.handleAddLanguage}
							>
								<img src='/img/1075699_472676169493047_514880014_n.jpg' />
							</GridTile>
							<GridTile 
								cols={4}
								style={{display: !dalb ? 'block' : 'none', ...styles.gridTile.style}}
							>
								{this.renderAddLanguageForm()}
							</GridTile>
						</GridList>
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
			</div>
		)
	}
}

Languages.propType = {
	getLanguages: PropTypes.func.isRequired, 
	languages: PropTypes.object.isRequired, 
	postLanguage: PropTypes.func.isRequired
}

export default Languages

