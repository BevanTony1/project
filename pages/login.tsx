import Link from 'next/link'

import {
    chakra,
    Button,
    Text,
    Checkbox,
    Flex,
    FormControl,
    Heading,
    Input,
    Stack,
    Image,
    Box,
} from '@chakra-ui/react';
import { getCsrfToken, getSession } from 'next-auth/client'
import { useRouter } from "next/router";
import LoginForm from '../components/LoginForm'
import NextImage from 'next/image'

const CoverImg = chakra(NextImage, {
    shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt', 'quality', 'placeholder', 'blurDataURL', 'loader '].includes(prop),
})

const myLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality}`;
};


export default function SignIn({ csrfToken }: any) {


    const { error } = useRouter().query;
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>

                    {error && <SignInError />}
                    <LoginForm csrfToken={csrfToken} />
                    {/* <FormControl as='form' method='post' action='/api/auth/callback/credentials'>
                        <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                        <Input marginBottom='5' name='username' type='email' />
                        <Input marginBottom='5' name='password' type='password' />
                        <Stack spacing={6}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link href='#' ><Text color='blue.200' _hover={{ cursor: 'pointer' }}>Forgot password?</Text></Link>
                            </Stack>
                            <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                                Sign in
                            </Button>
                        </Stack>
                    </FormControl> */}
                    <Text>Don&apos;t have an Account?  <Link href='/signup'><Text _hover={{ cursor: 'pointer' }} color='blue.500'>Sign up!</Text></Link></Text>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <CoverImg
                    w="auto"
                    h="auto"
                    loader={myLoader}
                    width={800}
                    quality={100}
                    height={400}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }

                />
            </Flex>
        </Stack>
    )
}





const SignInError = () => {
    const errorMessage = "Sign in failed. Check the details you provided are correct."

    return <Box textColor='red.200'> {errorMessage}</Box>;
};




// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: any) {
    const { res, req } = context
    const session = await getSession({ req })


    if (session && res) {
        res.writeHead(302, {
            Location: '/'
        })
        res.end()
        return;
    }

    return {
        props: {
            csrfToken: await getCsrfToken(context)
        }
    }
}



