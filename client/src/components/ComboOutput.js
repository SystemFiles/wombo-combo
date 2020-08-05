import React, { Component, Suspense } from 'react'
import Loader from 'react-loader-spinner'
import { Grid, Zoom } from '@material-ui/core'
import PropTypes from 'prop-types'
import axios from 'axios'
import ComboCount from './ComboCount'
import ComboDownload from './ComboDownload'

// Styles
import './ComboOutput.css'

const UPLOAD_ENDPOINT = 'http://localhost:5000/wombo-combo/api/list/upload'
const DOWNLOAD_ENDPOINT = 'http://localhost:5000/wombo-combo/api/list/download'
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
			loading    : true,
			comboList  : '',
			comboCount : 0,
			error      : false
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
		let uploadResponse = await axios.post(UPLOAD_ENDPOINT, data)

		// Download combolist from server
		try {
			let downloadResponse = await axios.get(DOWNLOAD_ENDPOINT, {
				params : {
					fileID : uploadResponse.data.fileID
				}
			})

			// Format data and verify success
			if (downloadResponse.status === 200) {
				let contentLength = downloadResponse.data.split('\n').length
				setTimeout(() => {
					this.setState({
						loading    : false,
						comboCount : contentLength,
						comboList  : downloadResponse.data
					})
				}, 500)
			} else {
				this.setState({ loading: false, error: true })
			}
		} catch (err) {
			console.log(`Error downloading combolist: ${err}`)
			this.setState({ loading: false, error: true })
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
								Couldn&apos;t find the requested file{' '}
								<span role='img' aria-label='warning-emoji'>
									⚠️
								</span>
							</h3>
							<p>Please try again later</p>
						</div>
					) : (
						<div className='ComboOutput-Container'>
							<Grid container>
								<ComboCount count={this.state.comboCount} />
								<Grid className='ComboOutput-Section' item xs={12}>
									<ComboDownload list={this.state.comboList} />
								</Grid>
								<Grid className='ComboOutput-Section' item xs={12}>
									<Suspense fallback={<p>...</p>}>
										<ComboListRaw list={this.state.comboList} />
									</Suspense>
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
