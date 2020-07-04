import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import { Grid, Stepper, Step, StepLabel, Zoom, Button } from '@material-ui/core';

// Modules
import FileUpload from '../components/FileUpload';
import ComboRules from '../components/ComboRules';

// Media
import Logo from '../assets/logo.png';

// Styles
import './Home.css';

export class Home extends Component {
	constructor(props) {
		super(props);

		this.totalSteps = 3;
		this.state = {
			activeStep : 0,
			valid      : false,
			done       : false
		};

		this.handleForward = this.handleForward.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.getStepTitle = this.getStepTitle.bind(this);
		this.getStepModule = this.getStepModule.bind(this);
	}

	getStepTitle() {
		switch (this.state.activeStep) {
			case 0:
				return 'Upload Files';
			case 1:
				return 'Select Rules';
			case 2:
				return 'Review';
			case 3:
				return 'Done!';
			default:
				return 'Unknown Step...';
		}
	}

	getStepModule() {
		switch (this.state.activeStep) {
			case 0:
				return (
					<div>
						<FileUpload color='info' placeholder='username list (.txt)' />
						<FileUpload color='info' placeholder='password list (.txt)' />
					</div>
				);
			case 1:
				return <ComboRules />;
			case 2:
				return 'Review';
			case 3:
				return 'Done!';
			default:
				return 'Unknown Step...';
		}
	}

	handleForward() {
		if (this.state.activeStep + 1 <= this.totalSteps) {
			this.setState((st) => ({
				activeStep : st.done ? st.activeStep : st.activeStep++,
				done       : st.activeStep - 1 === this.totalSteps
			}));
		}
	}

	handleBack() {
		if (this.state.activeStep - 1 >= 0) {
			this.setState((st) => ({
				activeStep : st.activeStep--,
				done       : st.activeStep - 1 === this.totalSteps
			}));
		}
	}

	render() {
		const title = this.getStepTitle();

		return (
			<div className='Home'>
				<div className='Home-Logo'>
					<img src={Logo} alt='Wombo Combo Logo' width={400} height={200} />
				</div>
				<Zoom in={true} style={{ transitionDelay: '50ms' }}>
					<div className='Home-Container'>
						<Grid container>
							<Grid className='Home-Form' item xs={12} sm={8} lg={6}>
								<div className='Home-Main'>
									<div className='Home-Main-Header'>
										<h1 className={this.state.done ? 'Done' : null}>
											{this.state.activeStep === 3 ? (
												<span className='fas fa-check' />
											) : (
												this.state.activeStep + 1
											)}
										</h1>
										<h3>{title}</h3>
									</div>
									<div className='Home-Main-Module'>
										<FadeIn delay={50} transitionDuration={300}>
											{this.getStepModule()}
										</FadeIn>
									</div>
								</div>
								<div className='Home-Main-Nav'>
									<Grid container>
										<Grid item xs={6} style={{ textAlign: 'left', paddingLeft: '15px' }}>
											<Button onClick={this.handleBack}>Back</Button>
										</Grid>
										<Grid item xs={6} style={{ textAlign: 'right', paddingRight: '15px' }}>
											<Button
												disabled={this.state.done || !this.state.valid}
												style={
													this.state.done || !this.state.valid ? (
														{ backgroundColor: 'rgba(66,66,66,0.4)' }
													) : (
														{ backgroundColor: '#5b8faa' }
													)
												}
												onClick={this.handleForward}
											>
												{this.state.activeStep >= this.totalSteps - 1 ? 'Done' : 'Next'}
											</Button>
										</Grid>
									</Grid>
								</div>
							</Grid>
						</Grid>
					</div>
				</Zoom>
				<div className='Home-Progress'>
					<Stepper activeStep={this.state.activeStep} alternativeLabel>
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
				</div>
			</div>
		);
	}
}

export default Home;
