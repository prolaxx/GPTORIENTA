'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirige siempre a la nueva ruta
    router.push('/user-form');
  }, [router]);

  return null; // No necesitas renderizar nada, ya que redirigirás al usuario
};

export default Home;
