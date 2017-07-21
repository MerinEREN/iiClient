import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ContentsComponent from '../components/contents'
import getContents, {postContents} from '../middlewares/contents'
import {getLanguagesCount} from '../middlewares/counters'

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		contents: state.entities.contents.byID, 
		langCount: state.pagination.counters.languages
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getContents, 
		postContents, 
		getLanguagesCount
	},
	dispatch
)

const Contents = connect(mapStateToProps, mapDispatchToProps)(ContentsComponent)

export default Contents


