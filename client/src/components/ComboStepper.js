import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stepper, Step, StepLabel } from '@material-ui/core';

export class ComboStepper extends Component {
	static get propTypes() {
		return {
			activeStep : PropTypes.number
		};
	}

	static defaultProps = {
		activeStep : 0
	};

	render() {
		return (
			<Stepper activeStep={this.props.activeStep} alternativeLabel>
				<Step>
					<StepLabel>Upload Files</StepLabel>
				</Step>
				<Step>
					<StepLabel>Select Rules</StepLabel>
				</Step>
				<Step>
					<StepLabel>Review &amp; Finalize</StepLabel>
				</Step>
			</Stepper>
		);
	}
}

export default ComboStepper;
