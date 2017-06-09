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

// ADD 'styles' AND CHANGE DEFAULT STYLES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/**
 Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 **
 To use the vertical stepper with the contained content as seen in spec examples, 
 you must use the `<StepContent>` component inside the `<Step>`.
 **
 <small>(The vertical stepper can also be used without `<StepContent>` to display 
 a basic stepper.)</small>
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
		if (stepIndex > 0) {
			this.setState({stepIndex: stepIndex - 1})
		}
	}
	handleForm(v) {
		this.setState({stepIndex: 0})
		const {save, cancel} = this.props
		switch (v) {
			case 's':
				if(save) {
					return save()
				}
				return

			case 'c':
				if(cancel)
					cancel()
				return
		}
	}
	renderStepActions() {
		const {stepContents, cancel} = this.props
		const {stepIndex} = this.state
		return (
			<div style={{margin: '12px 0'}}>
				<RaisedButton
					label={stepIndex === stepContents.length - 1 
							? 
							'Save' 
							: 
							'Next'
					}
					disableTouchRipple={true}
					disableFocusRipple={true}
					primary={true}
					onTouchTap={stepIndex === stepContents.length - 1 
							? 
							() => this.handleForm('s')
							: 
							this.handleNext
					}
					style={{marginRight: 12}}
				/>
				{(cancel && stepIndex === stepContents.length - 1) && (
					<RaisedButton
						label='Cancel'
						disableTouchRipple={true}
						disableFocusRipple={true}
						secondary={true}
						onTouchTap={() => this.handleForm('c')}
						style={{marginRight: 12}}
					/>
				)}
				{stepIndex > 0 && (
					<FlatButton
						label="Back"
						disabled={stepIndex === 0}
						disableTouchRipple={true}
						disableFocusRipple={true}
						onTouchTap={this.handlePrev}
					/>
				)}
			</div>
		)
	}
	renderSteps() {
		const {stepLabels, stepContents} = this.props
		return stepContents.map((v, i) => (
			<Step key={i}>
				<StepLabel>{stepLabels[i]}</StepLabel>
				<StepContent>
					{v}
					{this.renderStepActions()}
				</StepContent>
			</Step>
		))
	}
	render() {
		const {stepIndex} = this.state
		const contentStyle = {margin: '0 16px'}
		return (
			<Stepper 
				orientation='vertical'
				activeStep={stepIndex}
				children={this.renderSteps()}
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
