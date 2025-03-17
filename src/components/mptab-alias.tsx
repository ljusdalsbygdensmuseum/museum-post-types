import { useState } from 'react'
import { BaseControl, ToggleControl, TextControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
interface Props {
	element: {
		id: string
		label: string
		value: string
		input: HTMLInputElement
	}[]
}
export function MPTABAlias({ element }: Props) {
	const [values, setValues] = useState(element.map((element) => element.value))

	const [useAlias, setUseAlias] = useState(
		element.some((element) => element.value.length > 0)
	)

	const inputs = element.map((element, index) => {
		return (
			<>
				<TextControl
					label={element.label}
					value={values[index]}
					onChange={(value) => {
						setValues((oldValues) => {
							const newValues = oldValues.concat()
							newValues[index] = value
							return newValues
						})
						element.input.value = value
					}}
				/>
			</>
		)
	})
	return (
		<BaseControl
			label={__('Name Alias', 'mptab-domain')}
			help={__('Ex. october, autumn or 3:rd quarter', 'mptab-domain')}
		>
			<ToggleControl
				label={__('Use alias', 'mptab-domain')}
				checked={useAlias}
				onChange={() => {
					setUseAlias((state) => {
						const newState = !state
						if (!newState) {
							setValues(() => {
								return element.map((element) => {
									element.input.value = ''
									return ''
								})
							})
						}
						return newState
					})
				}}
			/>
			{useAlias ? inputs : ''}
		</BaseControl>
	)
}
