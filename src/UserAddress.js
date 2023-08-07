import { useUserQuery } from './hooks/useUsers';

function UserAddress() {
	const { data, isSuccess } = useUserQuery();

	return <div>{isSuccess && <p>Address: {data.address.street}</p>}</div>;
}

export default UserAddress;
