'use client';

import { useTelegram } from '@/app/telegram.provider';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Post = ({ params }) => {
  const telegram = useTelegram();
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
      const result = await res.json();
      return result;
    };

    const setupBackButton = () => {
      telegram.BackButton.show().onClick(() => {
        router.back();
      });
    };

    // Вызываем setupBackButton
    setupBackButton();

    // Вызываем fetchData
    fetchData(params.id).then((result) => {
      setData(result);
    });

    // Возвращаем функцию для выполнения при размонтировании компонента
    return () => {
      telegram.BackButton.offClick();
      telegram.BackButton.hide();
    };
  }, [router, params.id, telegram.BackButton]);

  return (
    <>
      {data && (
        <>
          <h2 className="text-3xl font-bold tracking-tight text-white-900 sm:text-4xl">{data.title}</h2>
          <p className="mt-2 text-lg leading-8 text-white-600">{data.body}</p>
        </>
      )}
    </>
  );
};

export default Post;