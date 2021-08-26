import {
  Container,
  Heading,
  Box,
  Button,
  Center,
} from '@chakra-ui/react'
import styles from '../styles/Home.module.scss'
import { useSession } from "next-auth/client"

export default function Home() {

  const [session, loading] = useSession()




  if (loading) {
    return (
      'Loading...'
    )
  }

  if (!session) {
    return (
      <Box>
        <Center>
          Welcome!
        </Center>
      </Box>
    )
  }



  return (
    <Box>
      Hello world
    </Box>
  )
}

