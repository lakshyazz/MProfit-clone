import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function useUserState() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    const state = localStorage.getItem('mprofit_user_state');
    
    // Check local storage or URL search params for new user state
    if (state === 'new' || searchParams.get('newUser') === 'true') {
      setIsNewUser(true);
    }
  }, [searchParams]);

  return { isNewUser, mounted };
}
