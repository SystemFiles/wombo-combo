import React, { Component, Suspense } from 'react'
import Loader from 'react-loader-spinner'
import { Grid, Zoom } from '@material-ui/core'
import PropTypes from 'prop-types'
import axios from 'axios'
import ComboCount from './ComboCount'
import ComboDownload from './ComboDownload'

// Styles
import './ComboOutput.css'

const { UPLOAD_ENDPOINT, DOWNLOAD_ENDPOINT } = require('../config')
const ComboListRaw = React.lazy(() => import('./ComboListRaw'))

export class ComboOutput extends Component {
	static get propTypes() {
		return {
			files  : PropTypes.object,
			vars   : PropTypes.object,
			onLoad : PropTypes.func
		}
	}

	static defaultProps = {
		files  : {},
		vars   : {},
		onLoad : () => console.log('Output loaded')
	}

	constructor(props) {
		super(props)

		this.state = {
			loading      : true,
			comboList    : '',
			comboCount   : 0,
			error        : false,
			errorMessage : ''
		}

		this.buildComboList = this.buildComboList.bind(this)
	}

	componentDidMount() {
		this.buildComboList()
		this.props.onLoad()
	}

	async buildComboList() {
		const data = new FormData()
		data.append('usernames', this.props.files.usernames)
		data.append('passwords', this.props.files.passwords)
		data.append('vars', this.props.vars)

		// Upload and let server build combolist
		try {
			let uploadResponse = await axios.post(UPLOAD_ENDPOINT, data, { params: { vars: this.props.vars } })

			if (uploadResponse.data.status === 500) {
				this.setState({ loading: false, error: true, errorMessage: uploadResponse.data.message })
			} else {
				// Download combolist from server
				let downloadResponse = await axios.get(DOWNLOAD_ENDPOINT, {
					params : {
						fileID : uploadResponse.data.fileID
					}
				})

				if (downloadResponse.data.status === 500) {
					this.setState({ loading: false, error: true, errorMessage: downloadResponse.data.message })
				} else {
					// Format data and verify success
					let contentLength = downloadResponse.data.split('\n').length
					setTimeout(() => {
						this.setState({
							loading    : false,
							comboCount : contentLength,
							comboList  : downloadResponse.data
						})
					}, 500)
				}
			}
		} catch (err) {
			console.log(`${err}`)

			// Show error message and stop loading infinitely...
			this.setState({
				error        : true,
				errorMessage : `Problem building combo list...\n${err}`,
				loading      : false
			})
		}
	}

	render() {
		return (
			<Zoom in style={{ transitionDelay: '50ms' }}>
				<div className='ComboOutput'>
					{this.state.loading ? (
						<Loader type='TailSpin' color='#2ebf91' height={50} width={50} />
					) : this.state.error ? (
						<div className='ComboOutput-Container'>
							<h3>
								<span role='img' aria-label='warning-emoji'>
									⚠️
								</span>{' '}
								We ran into a problem{' '}
								<span role='img' aria-label='warning-emoji'>
									⚠️
								</span>
							</h3>
							<p>{this.state.errorMessage}</p>
						</div>
					) : (
						<div className='ComboOutput-Container'>
							<Grid container>
								<ComboCount count={this.state.comboCount} />
								<Grid className='ComboOutput-Section' item xs={12}>
									<ComboDownload list={this.state.comboList} />
								</Grid>
								<Grid className='ComboOutput-Section' item xs={12}>
									{this.state.comboCount <= 10000 ? (
										<Suspense fallback={<p>...</p>}>
											<ComboListRaw list={this.state.comboList} />
										</Suspense>
									) : null}
								</Grid>
							</Grid>
						</div>
					)}
				</div>
			</Zoom>
		)
	}
}

export default ComboOutput
