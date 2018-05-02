import React from "react"
import PropTypes from "prop-types"
import {
	Step,
	Stepper,
	StepLabel,
} from "material-ui/Stepper"
import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"

const styles = {
	stepActionsContainer: {
		margin: "12px 0"
	}, 
	raisedButton: {
		marginRight: 12
	}, 
	contentStyle: {
		margin: "0 16px"
	}
}

/**
 Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 Avoid using long step names in horizontal steppers.
 **
 Linear steppers require users to complete one step in order to move on to the next.
 **/
const HorizontalStepper = ({stepLabels, stepContents, stepIndex, updateStepIndex, save, cancel}) => {
	const stepActions = <div style={styles.stepActionsContainer}>
		{
			(save && stepIndex === stepContents.length - 1) 
			&& 
			<RaisedButton
				label={"Save"}
				disableTouchRipple={true}
				disableFocusRipple={true}
				primary={true}
				onTouchTap={save}
				style={styles.raisedButton}
			/>
		}
		{
			stepIndex !== stepContents.length - 1 
				&& 
				<RaisedButton
					label={"Next"}
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
					label="Cancel"
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
					label="Back"
					disabled={stepIndex === 0}
					disableTouchRipple={true}
					disableFocusRipple={true}
					onTouchTap={() => updateStepIndex("prev")}
				/>
		}
	</div>
		const stepLabels = stepLabels.map((v, i) => 
			<Step key={i}>
				<StepLabel>{v}</StepLabel>
			</Step>
		)
	return <div>
		<Stepper 
			activeStep={stepIndex}
		>
			{this.stepLabels(stepLabels)}
		</Stepper>
		<div style={styles.contentStyle}>
			{stepContent(stepIndex)}
			{stepActions}
		</div>
	</div>
}

HorizontalStepper.propTypes = {
	stepLabels: PropTypes.array.isRequired,
	stepContents: PropTypes.array.isRequired,
	stepIndex: PropTypes.number.isRequired,
	updateStepIndex: PropTypes.func.isRequired, 
	save: PropTypes.func, 
	cancel: PropTypes.func
}

export default HorizontalStepper
