import { type ChangeEventHandler } from 'react'
import styled from 'styled-components'

const Container = styled.div`
	height: 60px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const SelectInput = styled.select`
	width: 100%;
	max-width: 360px;
	height: 26px;
	padding: 4px;
	border-radius: 1px;
	border: 1px solid ${props => props.theme.colours.select.border};
	background-color: ${props => props.theme.colours.select.background};
	color: ${props => props.theme.colours.text};
`

interface SelectProps {
	label: string;
	data: string[];
	defaultValue: this['data'][number];
	onChange: ChangeEventHandler<HTMLSelectElement>;
}

const Select = ({ label, data, defaultValue, onChange }: SelectProps) => {
	return (
		<Container>
			<label>{label}</label>
			<SelectInput onChange={onChange}>
				{
					data.map(value => {
						const isSelected = value === defaultValue
						return <option
							key={value}
							value={value}
							selected={isSelected}
						>
							{value}
						</option>
					})
				}
			</SelectInput>
		</Container>
	)
}

export default Select