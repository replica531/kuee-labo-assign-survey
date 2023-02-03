import Head from 'next/head'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import { useApiAgent } from '@/lib/api_agent';
import { Laboratory } from '@/resources/types';

export default function Home() {
  const { isAuthenticated } = useAuth0();
  const apiAgent = useApiAgent();
  const [laboratories, setLaboratories] = useState<Laboratory[]>([])

  const fetchLaboratories = async () => {
    apiAgent({
      url: `/api/laboratories`,
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        setLaboratories(json.laboratories)
      })
  }

  useEffect(() => {
    fetchLaboratories()
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isAuthenticated ? <p>ログイン中です</p> : <p>ログアウトしています</p>}
      {laboratories.map((laboratory: any) => {
        return (
          <div key={laboratory.id}>
            <h1>{laboratory.department}</h1>
          </div>
        )
      })}
    </>
  )
}
