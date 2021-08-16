import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    useToast,
    Image,
    Box,
} from '@chakra-ui/react';
import { getCsrfToken } from 'next-auth/client'
import { useRouter } from "next/router";



export default function SignIn({ csrfToken }: any) {


    const { error } = useRouter().query;
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>

                    {error && <SignInError />}
                    <FormControl as='form' method='post' action='/api/auth/callback/credentials'>
                        <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                        <Input name='username' type='email' />
                        <Input name='password' type='password' />
                        <Stack spacing={6}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.500'}>Forgot password?</Link>
                            </Stack>
                            <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                                Sign in
                            </Button>
                        </Stack>
                    </FormControl>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
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
    return {
        props: {
            csrfToken: await getCsrfToken(context)
        }
    }
}



