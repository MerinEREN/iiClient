import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
	Step,
	Stepper,
	StepLabel,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const styles = {
	stepActionsContainer: {
		margin: '12px 0'
	}, 
	raisedButton: {
		marginRight: 12
	}, 
	contentStyle: {
		margin: '0 16px'
	}
}

/**
 Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 Avoid using long step names in horizontal steppers.
 **
 Linear steppers require users to complete one step in order to move on to the next.
 **/
class HorizontalStepper extends Component {
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
	stepContent(stepIndex) {
		const {stepContents} = this.props
		return stepContents[stepIndex]
	}
	stepLabels(ls) {
		return ls.map((l, i) => <Step key={i}><StepLabel>{l}</StepLabel></Step>)
	}
	render() {
		const {stepIndex} = this.state
		const {stepLabels} = this.props
		return (
			<div>
				<Stepper 
					activeStep={stepIndex}
				>
					{this.stepLabels(stepLabels)}
				</Stepper>
				<div style={styles.contentStyle}>
					{this.stepContent(stepIndex)}
					{this.stepActions()}
				</div>
			</div>
		)
	}
}

HorizontalStepper.propTypes = {
	stepLabels: PropTypes.array.isRequired,
	stepContents: PropTypes.array.isRequired,
	save: PropTypes.func, 
	cancel: PropTypes.func, 
	setInputErrorMessage: PropTypes.func
}

export default HorizontalStepper
