import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 데이터 가져오기 Custom Hook
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

// 데이터 변경요청 후 가져오기 Custom Hook
export const updateUserName = async (userName, num) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`, {
		method: 'PUT',
		body: JSON.stringify({
			title: userName,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});

	return await response.json();
};

export const useUpdateUserNameMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(updateUserName, {
		onSuccess: (userName, num) => {
			queryClient.setQueryData(['user', userName, num]);
		},
	});
};
