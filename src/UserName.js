import UserForm from './UserForm';
import { useUserQuery } from './hooks/useUsers';

function UserName() {
	const { data, isSuccess } = useUserQuery();

	return (
		<div>
			{isSuccess && <h2>Name: {data.name}</h2>}
			<UserForm />
		</div>
	);
}

export default UserName;
