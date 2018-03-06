import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import {deleteLanguage} from '../middlewares/language'

const styles = {
	gridTile: {
		titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
	}
}

const Language = ({ID, language, dispatch}) => (
	<GridTile  
		key={ID}
		title={language.code}
		titleBackground={styles.gridTile.titleBackground} 
		actionIcon={
			<IconButton 
				onTouchTap={() => dispatch(deleteLanguage(
					{
						URL: `/languages/?code=${ID}`, 
						body: {
							type: 'FormData', 
							data: {[ID]: language}
						}
					}
				))}
			>
				<Delete />
			</IconButton>
		}
	>
		<img src={language.link || '/img/adele.jpg'} />
	</GridTile>
)

Language.propTypes = {
	ID: PropTypes.string.isRequired, 
	language: PropTypes.object.isRequired
}

Language.muiName = 'GridTile'

export default connect()(Language)
