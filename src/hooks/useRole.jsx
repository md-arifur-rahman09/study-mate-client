// src/hooks/useRole.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';


const useRole = () => {
  const { user, loading } = useAuth();

  const { data: roleData, isPending } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://study-mate-server-nine.vercel.app/users/role/${user.email}`, {
        withCredentials: true
      });
      return res.data; // expected { role: 'admin' } or 'tutor' or 'student'
    },
  });

  return {
    role: roleData?.role,
    isRoleLoading: loading || isPending,
  };
};

export default useRole;
