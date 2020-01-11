import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import TileLanguageComponent from "../components/tileLanguage"
import photosGet from "../middlewares/photos"
import {selectedLanguageIDsAddRemove} from "../actions/languages"

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
		language: {ID}
	} = ownProps
	return {
		languagePhoto: photosPagination[ID] && photos[photosPagination[ID].IDs[0]]
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		photosGet, 
		selectedLanguageIDsAddRemove
	},
	dispatch
)

const TileLanguage = connect(mapStateToProps, mapDispatchToProps)(TileLanguageComponent)

export default TileLanguage

