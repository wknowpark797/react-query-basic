import { useQuery } from '@tanstack/react-query';

const fetchUser = async ({ queryKey }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
	return await response.json();
};

export const useUserQuery = (opt) => {
	return useQuery(['user', opt], fetchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		staleTime: 1000 * 5,
		cacheTime: 1000 * 5,
	});
};
