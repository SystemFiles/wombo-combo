import React, { Component, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import { Grid, Zoom } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import ComboCount from './ComboCount';
import ComboDownload from './ComboDownload';

// Styles
import './ComboOutput.css';

const ENDPOINT = 'http://localhost:5000/wombo-combo/api/list/upload';
const ComboListRaw = React.lazy(() => import('./ComboListRaw'));

export class ComboOutput extends Component {
	static get propTypes() {
		return {
			files : PropTypes.object,
			vars  : PropTypes.object
		};
	}

	static defaultProps = {
		files : {},
		vars  : {}
	};

	constructor(props) {
		super(props);

		this.state = {
			loading    : true,
			comboList  : '',
			comboCount : 0
		};

		this.buildComboList = this.buildComboList.bind(this);
	}

	componentDidMount() {
		this.buildComboList();
	}

	async buildComboList() {
		const data = new FormData();
		data.append('usernames', this.props.files.usernames);
		data.append('passwords', this.props.files.passwords);
		data.append('vars', this.props.vars);

		// Make request to server
		axios
			.post(ENDPOINT, data)
			.then((response) => {
				if (response.status === 200) {
					let contentLength = response.data.split('\n').length;
					setTimeout(() => {
						this.setState({
							loading    : false,
							comboCount : contentLength,
							comboList  : response.data
						});
					}, 500);
				}
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<Zoom in style={{ transitionDelay: '50ms' }}>
				<div className='ComboOutput'>
					{this.state.loading ? (
						<Loader type='TailSpin' color='#2ebf91' height={50} width={50} />
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
		);
	}
}

export default ComboOutput;
