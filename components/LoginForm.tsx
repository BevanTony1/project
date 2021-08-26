import {
    FormControl,
    Input,
    Stack,
    Checkbox,
    Button,
    Text,
} from "@chakra-ui/react"
import Link from 'next/link'
import { useRouter } from 'next/router'

const LoginForm = ({ csrfToken }: any) => {



    const { error } = useRouter().query;

    return (
        <FormControl as='form' method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <Input marginBottom='5' name='username' type='email' />
            <Input marginBottom='5' name='password' type='password' />
            <Stack spacing={6}>
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link href='#' ><Text color='blue.500' _hover={{ cursor: 'pointer' }}>Forgot Password?</Text></Link>
                </Stack>
                <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                    Sign in
                </Button>
            </Stack>
        </FormControl>
    )
}

export default LoginForm

// export async function getServerSideProps(context: any) {
//     const { res, req } = context
//     const session = await getSession({ req })


//     if (session && res) {
//         res.writeHead(302, {
//             Location: '/'
//         })
//         res.end()
//         return;
//     }

//     return {
//         props: {
//             csrfToken: await getCsrfToken(context)
//         }
//     }
// }

