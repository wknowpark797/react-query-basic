import { useUserQuery } from './hooks/useUsers';

function UserName() {
	const { data, isSuccess } = useUserQuery();

	return <div>{isSuccess && <p>Name: {data.name}</p>}</div>;
}

export default UserName;
