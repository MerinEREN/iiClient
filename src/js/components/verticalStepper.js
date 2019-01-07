import React from "react"
import PropTypes from "prop-types"
import {
	Step,
	Stepper,
	StepLabel,
	StepContent
} from "material-ui/Stepper"
import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"

const styles = {
	stepActionsContainer: {
		margin: "12px 0"
	}, 
	raisedButton: {
		marginRight: 12
	}
}

/**
 Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 **
 To use the vertical stepper with the contained content as seen in spec examples, 
 you must use the `<StepContent>` component inside the `<Step>`.
 **
 (The vertical stepper can also be used without `<StepContent>` to display 
 a basic stepper.)
 **/
const VerticalStepper = ({contents, stepLabels, stepContents, stepIndex, updateStepIndex, save, cancel}) => {
	const stepActions = <div style={styles.stepActionsContainer}>
		{
			(save && stepIndex === stepContents.length - 1) 
			&& 
			<RaisedButton
				label={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
				disableTouchRipple={true}
				disableFocusRipple={true}
				primary={true}
				style={styles.raisedButton}
				onTouchTap={save}
			/>
		}
		{
			stepIndex !== stepContents.length - 1 
			&& 
			<RaisedButton
				label={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIETmV4dAw"] || "Next"}
				disableTouchRipple={true}
				disableFocusRipple={true}
				primary={true}
				style={styles.raisedButton}
				onTouchTap={() => updateStepIndex("next")}
			/>
		}
		{
			(cancel && stepIndex === stepContents.length - 1) 
			&& 
			<RaisedButton
				label={contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGQ2FuY2VsDA"] || "Cancel"}
				disableTouchRipple={true}
				disableFocusRipple={true}
				secondary={true}
				style={styles.raisedButton}
				onTouchTap={cancel}
			/>
		}
		{
			stepIndex > 0 
			&& 
			<FlatButton
				label={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEQmFjaww"] || "Back"}
				disabled={stepIndex === 0}
				disableTouchRipple={true}
				disableFocusRipple={true}
				onTouchTap={() => updateStepIndex("prev")}
			/>
		}
	</div>
		const steps = stepContents.map((v, i) => (
			<Step key={i}>
				<StepLabel>{stepLabels[i]}</StepLabel>
				<StepContent>
					{v}
					{stepActions}
				</StepContent>
			</Step>
		))
	return <Stepper 
		orientation="vertical"
		activeStep={stepIndex}
		children={steps}
	/>
}

VerticalStepper.defaultProps = {
	contents: {}
}

VerticalStepper.propTypes = {
	contents: PropTypes.object.isRequired,
	stepLabels: PropTypes.array.isRequired,
	stepContents: PropTypes.array.isRequired,
	stepIndex: PropTypes.number.isRequired,
	updateStepIndex: PropTypes.func.isRequired, 
	save: PropTypes.func, 
	cancel: PropTypes.func
}

export default VerticalStepper
