import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
	Step,
	Stepper,
	StepLabel,
	StepContent
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const styles = {
	stepActionsContainer: {
		margin: '12px 0'
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
class VerticalStepper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stepIndex: 0
		}
		this.handleNext = this.handleNext.bind(this)
		this.handlePrev = this.handlePrev.bind(this)
	}
	handleNext() {
		const {setInputErrorMessage} = this.props
		const {stepIndex} = this.state
		if(setInputErrorMessage(stepIndex))
			return
		this.setState({
			stepIndex: stepIndex + 1,
		})
	}
	handlePrev() {
		const {stepIndex} = this.state
		this.setState({stepIndex: stepIndex - 1})
	}
	handleForm(v) {
		const {setInputErrorMessage, save, cancel} = this.props
		const {stepIndex} = this.state
		if(v !== 'c' && setInputErrorMessage(stepIndex))
			return
		this.setState({stepIndex: 0})
		switch (v) {
			case 's':
				return save()

			case 'c':
				return cancel()
		}
	}
	stepActions() {
		const {stepContents, save, cancel} = this.props
		const {stepIndex} = this.state
		return (
			<div style={styles.stepActionsContainer}>
				{
					(save && stepIndex === stepContents.length - 1) 
					&& 
					<RaisedButton
						label={'Save'}
						disableTouchRipple={true}
						disableFocusRipple={true}
						primary={true}
						onTouchTap={() => this.handleForm('s')}
						style={styles.raisedButton}
					/>
				}
				{
					stepIndex !== stepContents.length - 1 
					&& 
					<RaisedButton
						label={'Next'}
						disableTouchRipple={true}
						disableFocusRipple={true}
						primary={true}
						onTouchTap={this.handleNext}
						style={styles.raisedButton}
					/>
				}
				{
					(cancel && stepIndex === stepContents.length - 1) 
					&& 
					<RaisedButton
						label='Cancel'
						disableTouchRipple={true}
						disableFocusRipple={true}
						secondary={true}
						onTouchTap={() => this.handleForm('c')}
						style={styles.raisedButton}
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
						onTouchTap={this.handlePrev}
					/>
				}
			</div>
		)
	}
	steps() {
		const {stepLabels, stepContents} = this.props
		return stepContents.map((v, i) => (
			<Step key={i}>
				<StepLabel>{stepLabels[i]}</StepLabel>
				<StepContent>
					{v}
					{this.stepActions()}
				</StepContent>
			</Step>
		))
	}
	render() {
		const {stepIndex} = this.state
		return (
			<Stepper 
				orientation='vertical'
				activeStep={stepIndex}
				children={this.steps()}
			/>
		)
	}
}

VerticalStepper.propTypes = {
	stepLabels: PropTypes.array.isRequired,
	stepContents: PropTypes.array.isRequired,
	save: PropTypes.func, 
	cancel: PropTypes.func, 
	setInputErrorMessage: PropTypes.func
}

export default VerticalStepper
