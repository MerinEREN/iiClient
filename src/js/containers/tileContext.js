import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import TileContextComponent from "../components/tileContext"
import {contextUpdate} from "../actions/context"
import {selectedContextIDsAddRemove} from "../actions/contexts"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		contextUpdate, 
		selectedContextIDsAddRemove
	},
	dispatch
)

const TileContext = connect(null, mapDispatchToProps)(TileContextComponent)

export default TileContext
