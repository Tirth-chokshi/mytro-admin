import { useState, useEffect } from 'react';
import { adminService } from '@/services/adminService';
import { useRouter } from 'next/navigation';

export const useAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchAdminData = async () => {
    try {
      const data = await adminService.getProfile();
      setAdmin(data);
      setError(null);
      console.log(data)
    } catch (err) {
      setError(err.message);
      // setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminService.logout();
      setAdmin(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  useEffect(() => {
    fetchAdminData();
  }, []);

  return { admin, loading, error, refetchAdmin: fetchAdminData, handleLogout };
};
