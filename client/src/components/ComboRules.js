import React, { Component } from 'react'
import { Button, Zoom } from '@material-ui/core'
import PropTypes from 'prop-types'
import ComboRuleOption from './ComboRuleOption'

// Styles
import './ComboRules.css'

export class ComboRules extends Component {
	static get propTypes() {
		return {
			handleConfirm : PropTypes.func
		}
	}

	static defaultProps = {
		handleConfirm : () => console.log('Confirmed selection')
	}

	constructor(props) {
		super(props)

		this.state = {
			noChanges             : false,
			commonReplacements    : false,
			autoCorrect           : false,
			wordPermutations      : false,
			prefixSuffixInsertion : false,
			commonPasswords       : false
		}

		this.handleCheck = this.handleCheck.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)
	}

	handleConfirm(evt) {
		evt.preventDefault()
		let { ...vars } = this.state
		this.props.handleConfirm(vars)

		this.setState({
			noChanges : true
		})
	}

	handleCheck(evt) {
		this.setState({
			noChanges         : false,
			[evt.target.name]: evt.target.checked
		})
	}

	render() {
		return (
			<Zoom in style={{ transitionDelay: '50ms' }}>
				<div>
					<div className='ComboRules'>
						<ComboRuleOption
							label='Common Replacements (E=3, A=4)'
							name='commonReplacements'
							checked={this.state.commonReplacements}
							onChecked={this.handleCheck}
						/>
						<ComboRuleOption
							label='Auto-correct checks (wordpass => password)'
							name='autoCorrect'
							checked={this.state.autoCorrect}
							onChecked={this.handleCheck}
						/>
						<ComboRuleOption
							label='Word Permutations (pass => [sasp, assp, ssap, etc.])'
							name='wordPermutations'
							checked={this.state.wordPermutations}
							onChecked={this.handleCheck}
							disabled
						/>
						<ComboRuleOption
							label='Prefix &amp; Suffix Insertion (pass => [$pass, pass%])'
							name='prefixSuffixInsertion'
							checked={this.state.prefixSuffixInsertion}
							onChecked={this.handleCheck}
							disabled
						/>
						<ComboRuleOption
							label='Insert some pre-defined common passwords'
							name='commonPasswords'
							checked={this.state.commonPasswords}
							onChecked={this.handleCheck}
							disabled
						/>
					</div>
					<div className='ComboRules-Confirm'>
						<Button disabled={this.state.noChanges} onClick={this.handleConfirm}>
							Confirm Rule Selection
						</Button>
					</div>
				</div>
			</Zoom>
		)
	}
}

export default ComboRules
