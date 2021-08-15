import { Container, Heading, Box } from '@chakra-ui/react'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useSession } from "next-auth/client"

export default function Home() {


  const [session, loading] = useSession()


  console.log(session)

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
