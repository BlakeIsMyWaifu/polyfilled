import { useState } from 'react'

const useToggle = (initialState: boolean): [boolean, () => void] => {

	const [value, setIsTrue] = useState(initialState)
	const toggle = () => setIsTrue(state => !state)

	return [value, toggle]
}

export default useToggle