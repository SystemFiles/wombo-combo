import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

// Styles
import './ComboReview.css'

export class ComboReview extends Component {
	static get propTypes() {
		return {
			userFile        : PropTypes.object,
			passFile        : PropTypes.object,
			manglingOptions : PropTypes.object
		}
	}

	static defaultProps = {
		userFile        : null,
		passFile        : null,
		manglingOptions : null
	}

	render() {
		return (
			<div className='ComboReview'>
				<Grid container>
					<Grid item xs={12}>
						<p>Please review the following changes</p>
					</Grid>
					<Grid item container xs={12}>
						<h3>Your Files</h3>
					</Grid>
					<Grid item container xs={12}>
						<TableContainer elevation={2} className='ComboReview-Mangling-Container' component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Filename</TableCell>
										<TableCell align='right'>File Size (MB)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>{this.props.userFile.name}</TableCell>
										<TableCell align='right'>
											~ {Math.round(this.props.userFile.size / (1024 * 1024) + 1)} MB
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>{this.props.passFile.name}</TableCell>
										<TableCell align='right'>
											~ {Math.round(this.props.passFile.size / (1024 * 1024) + 1)} MB
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item container xs={12}>
						<h3>Mangling Options</h3>
					</Grid>
					<Grid item xs={12}>
						<TableContainer elevation={2} className='ComboReview-Mangling-Container' component={Paper}>
							<Table className='ComboReview-Table'>
								<TableHead>
									<TableRow>
										<TableCell>Option</TableCell>
										<TableCell align='right'>Selected (Yes / No)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Object.entries(this.props.manglingOptions).map((rule) => (
										<TableRow key={rule[0]}>
											<TableCell component='th' scope='row'>
												{rule[0]}
											</TableCell>
											<TableCell align='right'>{rule[1] ? 'Yes' : 'No'}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default ComboReview
