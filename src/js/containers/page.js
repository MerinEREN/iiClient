import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import PageComponent from "../components/page"
import pageGet, {pageDelete} from "../middlewares/page"
import photosGet from "../middlewares/photos"
import {removeUpdateCoxtentsWithThatPage} from "../middlewares/contexts"
import {filterAnObjectByKeys} from "../middlewares/utilities"

const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			contexts: {page}, 
			photos: photosPagination
		}, 
		entitiesBuffered: {
			contexts, 
			photos, 
			pages
		}
	} = state
	const {
		params: {ID}
	} = ownProps	
	return {
		contexts: page && filterAnObjectByKeys(contexts, page.IDs), 
		pagePhoto: photosPagination[ID] && photos[photosPagination[ID].IDs[0]], 
		page: pages[ID]
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		pageGet, 
		photosGet, 
		pageDelete, 
		removeUpdateCoxtentsWithThatPage
	},
	dispatch
)

const Page = connect(mapStateToProps, mapDispatchToProps)(PageComponent)

export default Page
