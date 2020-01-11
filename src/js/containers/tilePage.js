import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import TilePageComponent from "../components/tilePage"
import photosGet from "../middlewares/photos"
import {selectedPageIDsAddRemove} from "../actions/pages"

// Can use "ownProps" here
// For accessing params for example.
const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			photos: photosPagination
		}, 
		entitiesBuffered: {
			photos
		}
	} = state
	const {
		page: {ID}
	} = ownProps
	return {
		pagePhoto: photosPagination[ID] && photos[photosPagination[ID].IDs[0]]
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		photosGet, 
		selectedPageIDsAddRemove
	},
	dispatch
)

const TilePage = connect(mapStateToProps, mapDispatchToProps)(TilePageComponent)

export default TilePage

