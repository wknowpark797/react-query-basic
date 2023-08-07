import { useUserQuery, useUserMutation } from './hooks/useUsers';
import { useState } from 'react';

function UserForm() {
	const { data } = useUserQuery();
	const [UserName, setUserName] = useState(data?.name);

	const userMutation = useUserMutation();

	const handleSubmit = (e) => {
		e.preventDefault();
		userMutation.mutate(UserName);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' value={UserName || ''} onChange={(e) => setUserName(e.target.value)} />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default UserForm;
