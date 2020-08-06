import React, { Component } from 'react'
import FadeIn from 'react-fade-in'
import { Grid, Zoom, Button } from '@material-ui/core'
import ComboStepper from '../components/ComboStepper'

// Modules
import FileUpload from '../components/FileUpload'
import ComboRules from '../components/ComboRules'
import ComboReview from '../components/ComboReview'
import ComboOutput from '../components/ComboOutput'

// Media
import Logo from '../assets/logo.png'

// Styles
import './Home.css'

export class Home extends Component {
	constructor(props) {
		super(props)

		this.totalSteps = 3
		this.state = {
			activeStep    : 0,
			startFiles    : null,
			serverVars    : null,
			valid         : false, // The input valid for this module/step
			restartOption : false
		}

		// Method binding
		this.handleForward = this.handleForward.bind(this)
		this.handleBack = this.handleBack.bind(this)
		this.getStepTitle = this.getStepTitle.bind(this)
		this.getStepModule = this.getStepModule.bind(this)
		this.onFileUpload = this.onFileUpload.bind(this)
		this.updateVars = this.updateVars.bind(this)
		this.setRestartAvailable = this.setRestartAvailable.bind(this)
	}

	/* HOME */
	getStepTitle() {
		switch (this.state.activeStep) {
			case 0:
				return 'Upload Files'
			case 1:
				return 'Select Rules'
			case 2:
				return 'Review'
			case 3:
				return 'Done!'
			default:
				return 'Unknown Step...'
		}
	}

	getStepModule() {
		switch (this.state.activeStep) {
			case 0:
				return (
					<div id='Upload-Module'>
						<FileUpload
							type='usernames'
							color='default'
							placeholder='username list (.txt)'
							onUpload={this.onFileUpload}
						/>
						<FileUpload
							type='passwords'
							color='default'
							placeholder='password list (.txt)'
							onUpload={this.onFileUpload}
						/>
					</div>
				)
			case 1:
				return <ComboRules handleConfirm={this.updateVars} />
			case 2:
				return (
					<ComboReview
						userFile={this.state.startFiles.usernames}
						passFile={this.state.startFiles.passwords}
						manglingOptions={this.state.serverVars}
					/>
				)
			case 3:
				return (
					<ComboOutput
						onLoad={this.setRestartAvailable}
						files={this.state.startFiles}
						vars={this.state.serverVars}
					/>
				)
			default:
				return 'Unknown Step...'
		}
	}

	updateVars(data) {
		let { noChanges, ...formData } = data
		this.setState((st) => ({
			...st,
			valid      : true,
			serverVars : formData
		}))
	}

	handleForward() {
		if (this.state.activeStep + 1 <= this.totalSteps) {
			if (this.state.activeStep + 1 === 2) {
				// If this is review page (default valid with no input)
				this.setState((st) => ({
					activeStep : st.activeStep++,
					valid      : true
				}))
			} else {
				this.setState((st) => ({
					activeStep : st.restartOption ? st.activeStep : st.activeStep++,
					valid      : false
				}))
			}
		} else {
			if (this.state.restartOption) {
				this.setState({
					activeStep    : 0,
					valid         : false,
					restartOption : false,
					startFiles    : null,
					serverVars    : null
				})
			}
		}
	}

	handleBack() {
		if (this.state.activeStep - 1 >= 0) {
			this.setState((st) => ({
				activeStep    : st.activeStep--,
				restartOption : false
			}))
		}
	}

	setRestartAvailable() {
		this.setState({ restartOption: true, valid: true })
	}

	/* HOME */

	/* UPLOAD MODULE */
	onFileUpload(file, type) {
		this.setState(
			(st) => ({
				startFiles : {
					...st.startFiles,
					[type] : file
				}
			}),
			() => {
				if (this.state.startFiles.usernames && this.state.startFiles.passwords) {
					this.setState({ valid: true })
				}
			}
		)
	}
	/* UPLOAD MODULE */

	render() {
		const title = this.getStepTitle()

		return (
			<div className='Home'>
				<div className='Home-Logo'>
					<img src={Logo} alt='Wombo Combo Logo' />
				</div>
				<Zoom in={true} style={{ transitionDelay: '50ms' }}>
					<div className='Home-Container'>
						<Grid container>
							<Grid className='Home-Form' item xs={12} sm={8} lg={6} xl={4}>
								<div className='Home-Main'>
									<div className='Home-Main-Header'>
										<h1 className={this.state.restartOption ? 'Done' : null}>
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
											<Button
												style={
													this.state.activeStep === 0 ? (
														{ visibility: 'hidden' }
													) : (
														{ visibility: 'visible' }
													)
												}
												onClick={this.handleBack}
											>
												Back
											</Button>
										</Grid>
										<Grid item xs={6} style={{ textAlign: 'right', paddingRight: '15px' }}>
											<Button
												disabled={!this.state.valid}
												style={
													!this.state.valid ? (
														{ backgroundColor: 'rgba(66,66,66,0.4)' }
													) : (
														{ backgroundColor: '#5b8faa' }
													)
												}
												onClick={this.handleForward}
											>
												{this.state.restartOption ? 'Restart' : 'Next'}
											</Button>
										</Grid>
									</Grid>
								</div>
							</Grid>
						</Grid>
					</div>
				</Zoom>
				<div className='Home-Progress'>
					<ComboStepper activeStep={this.state.activeStep} />
				</div>
			</div>
		)
	}
}

export default Home
