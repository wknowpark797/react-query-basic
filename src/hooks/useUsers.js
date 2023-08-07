import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 데이터를 가져오는 Custom Hook
const fetchUser = async () => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`);
	return await response.json();
};
export const useUserQuery = () => {
	return useQuery(['user'], fetchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		staleTime: 1000 * 5,
		cacheTime: 1000 * 5,
	});
};

// 데이터 변경요청 후 가져오는 Custom Hook
export const updateUserName = async (userName) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`, {
		method: 'PUT',
		body: JSON.stringify({
			name: userName,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});

	const result = await response.json();
	return result;
};

// 기존 서버데이터를 변경요청하는 Custom Hook
export const useUserMutation = () => {
	// useQueryClient로부터 객체값을 반환
	const queryClient = useQueryClient();

	return useMutation(updateUserName, {
		// mutation 요청이 성공적으로 들어가면 파라미터값을 기존 쿼리키에 추가하여 데이터 변경 처리하는 setQueryData 함수 호출
		onSuccess: (userName) => {
			queryClient.setQueryData(['user', userName]);
			// setQueryData - 기존의 쿼리키에 해당하는 데이터를 변경시켜준다.
		},
	});
};
