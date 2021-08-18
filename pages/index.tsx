import {
  Container,
  Heading,
  Box,
  Button
} from '@chakra-ui/react'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useSession, signIn } from "next-auth/client"

export default function Home() {

  const [session, loading] = useSession()

  console.log(session)

  if (!session) {

    return (

      <Button onClick={() => signIn(null)}>
        Login
      </Button>

    )
  }

  if (loading) {
    return (
      'Loading...'
    )
  }


  return (
    <Box>
      Hello world
    </Box>
  )
}
