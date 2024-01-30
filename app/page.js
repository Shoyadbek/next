'use client'
import { useState, useEffect, useCallback } from 'react'
import { useTelegram } from './telegram.provider'
import Link from 'next/link';

async function fetchData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const result = await res.json();
  return result;
}

export default function Home() {
  const [counter, setCounter] = useState(0)
  const telegram = useTelegram()
  const [data, setData] = useState(null);

  const handleMainButtonClick = useCallback(() => {
    // telegram.sendData(JSON.stringify({ counter }))
    telegram.sendData(JSON.stringify({counter}))
  }, [counter, telegram])

  useEffect(() => {
    telegram.MainButton.setParams({
      text: 'CLICK ON ME',
      is_active: true,
      is_visible: true
    })

    telegram.expand();

    fetchData().then((result) => {
      setData(result);
    })

  }, [telegram, telegram.MainButton])

  useEffect(() => {
    telegram.onEvent('mainButtonClicked', handleMainButtonClick)
    return () => telegram.offEvent('mainButtonClicked', handleMainButtonClick)
  }, [handleMainButtonClick, telegram])

  return (
    <>
      <h2 className="text-2xl font-bold">Hello, {telegram.initDataUnsafe?.user?.first_name || 'user'}</h2>
      <p className="text-neutral-400">Let&apos;s create a Telegram Web App!</p>
      <div className="flex gap-2 mt-2">
        <div className="bg-neutral-800 rounded-lg text-2xl px-4 py-2 grow">
          <span className="block text-xs text-neutral-400 font-semibold tracking-wider uppercase">Counter</span>
          {counter}
        </div>
        <button className="bg-neutral-800 hover:bg-neutral-800/50 focus:ring-4 focus:ring-neutral-800/50 outline-none rounded-lg text-2xl px-6 transition-[background,box-shadow]" onClick={() => setCounter(counter + 1)}>
          +
        </button>
      </div>

      {data && (
        <ul role="list" className="divide-y divide-gray-50">
        {data.map((post) => (
          <li key={post.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Link href={`/post/` + post.id}>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-white-900">{post.title}</p>
                </div>
              </Link>
              
            </div>
           
          </li>
        ))}
      </ul>
      )}
    </>
  )
}