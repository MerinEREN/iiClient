import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
	Step,
	Stepper,
	StepLabel,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

// ADD 'styles' AND CHANGE DEFAULT STYLES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
	renderStepLabels(ls) {
		return ls.map((l, i) => <Step key={i}><StepLabel>{l}</StepLabel></Step>)
	}
	getStepContent(stepIndex) {
		const {stepContents, cancel} = this.props
		return stepContents[stepIndex]
	}
	render() {
		const {stepIndex} = this.state
		const {stepLabels} = this.props
		const contentStyle = {margin: '0 16px'}
		return (
			<div>
				<Stepper 
					activeStep={stepIndex}
				>
					{this.renderStepLabels(stepLabels)}
				</Stepper>
				<div style={contentStyle}>
					{this.getStepContent(stepIndex)}
					<div style={{marginTop: 12}}>
						<FlatButton
							label="Back"
							disabled={stepIndex === 0}
							onTouchTap={this.handlePrev}
							style={{marginRight: 12}}
						/>
						{(cancel && stepIndex === stepLabels.length - 1) && (
							<RaisedButton
								label='Cancel'
								secondary={true}
								onTouchTap={() => this.handleForm('c')}
							/>
						)}
						<RaisedButton
							label={stepIndex === stepLabels.length - 1  
									? 
									'Save' 
									: 
									'Next'
							}
							primary={true}
							onTouchTap={stepIndex === stepContents.length - 1 
									? 
									() => this.handleForm('s')
									: 
									this.handleNext
							}
						/>
					</div>
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
