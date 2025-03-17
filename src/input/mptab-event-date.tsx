import { MPTABDateSelect } from '../components/mptab-date-select'
import { MPTABAlias } from '../components/mptab-alias'

interface Props {
	datesInput: HTMLInputElement[]
	aliasInput: HTMLInputElement[]
}

export function MPTABEventDate({ datesInput, aliasInput }: Props) {
	return (
		<>
			<MPTABDateSelect dates={[]} input={datesInput} />
			<MPTABAlias
				element={[
					{
						id: 'mptab-event-date-alias',
						label: '',
						value: aliasInput[0].value,
						input: aliasInput[0],
					},
				]}
			/>
		</>
	)
}
