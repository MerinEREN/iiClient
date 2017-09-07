import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ContentsComponent from '../components/contents'
import getContents, {postContents} from '../middlewares/contents'

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		contents: state.entities.contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getContents, 
		postContents
	},
	dispatch
)

const Contents = connect(mapStateToProps, mapDispatchToProps)(ContentsComponent)

export default Contents
