import React from 'react';

import './Input.less';

const Input = (props) => {
	const {
		className = '',
		id = '',
		placeholder = '',
		value = '',
		onChange
	} = props;

	return(
		<input
			id={id}
			className={`form-control ${className}`}
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
}

export default Input;
