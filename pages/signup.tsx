import { useState } from 'react'
import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    useToast,
    SimpleGrid,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { getSession } from 'next-auth/client'
import router from 'next/router';

interface Signup {
    full_name: string
    email: string

}


interface ParamsProps {
    email: string;
    full_name: string;
    redirect_to: string;
    [k: string]: string;

}


export default function Signup() {


    const toast = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Signup>()

    const onSubmit: SubmitHandler<Signup> = async (data) => {
        try {
            setLoading(true)
            const esc = encodeURIComponent;
            var params: ParamsProps = { email: data.email, full_name: data.full_name, redirect_to: 'http://localhost:3000/login' }
            const query = Object.keys(params).map(k => `${esc(k)}=${esc(params[k])}`).join('&')
            const res = await fetch('http://0.0.0.0:8001/api/method/frappe.core.doctype.user.user.sign_up?' + query, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            })
            const message = await res.json()
            if (message.message[1] == 'error') {

                toast({
                    title: message.message[2],
                    description: message.message[3],
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Successfully created your account',
                    description: 'check email for confirmation',
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(true)
                router.push('/login')
            }

        }
        catch (err) {
            console.log('Something went wrong')
        }
        setLoading(false)
    }

    return (
        <Box position={'relative'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>

                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Sign up
                            <Text
                                as={'span'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text">
                                !
                            </Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                            We’re looking for amazing engineers just like you! Become a part
                            of our rockstar engineering team and skyrocket your career!
                        </Text>
                    </Stack>
                    <Box as={'form'} onSubmit={handleSubmit(onSubmit)} mt={10}>
                        <Stack spacing={4}>
                            <Input
                                placeholder="Full Name"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                                {...register('full_name')}
                            />
                            <Input
                                placeholder="Email"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                                {...register('email')}
                            />
                        </Stack>
                        {!loading ? (
                            <Button
                                fontFamily={'heading'}
                                mt={8}
                                w={'full'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                color={'white'}
                                _hover={{
                                    bgGradient: 'linear(to-r, red.400,pink.400)',
                                    boxShadow: 'xl',
                                }}
                                type='submit'>
                                Submit
                            </Button>
                        ) : (
                            <Button
                                fontFamily={'heading'}
                                mt={8}
                                w={'full'}
                                isLoading
                                loadingText="Submitting"
                                bgGradient="linear(to-r, red.400,pink.400)"
                                color={'white'}
                                _hover={{
                                    bgGradient: 'linear(to-r, red.400,pink.400)',
                                    boxShadow: 'xl',
                                }}
                                type='submit'>
                                Submit
                            </Button>
                        )}

                    </Box>
                    form
                </Stack>
                <Stack spacing={{ base: 10, md: 20 }}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                        Sign up in my {' '}
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            hire a service
                        </Text>{' '}
                        website
                    </Heading>

                </Stack>
            </Container>

        </Box>
    );
}

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

        }
    }

}
