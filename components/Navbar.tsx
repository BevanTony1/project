import { Box, Button, Flex, Text, IconButton, Spacer, useColorMode, useColorModeValue, useDisclosure, Collapse, Center, Avatar, Menu, MenuButton, MenuList, MenuGroup, MenuDivider, MenuItem, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon, TriangleDownIcon } from '@chakra-ui/icons';

import { signIn, signOut, useSession } from 'next-auth/client'
import { ProfileCard } from './ProfileCard';
import { useRouter } from 'next/router'

const Navbar = () => {

    const [session, loading] = useSession()

    const { isOpen, onToggle } = useDisclosure()
    const router = useRouter()

    const { colorMode, toggleColorMode } = useColorMode()
    const toast = useToast()
    return (
        <>

            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                variant={'ghost'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>

                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />

                </Flex>
                <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                    <DesktopNav />
                </Flex>
                <Spacer />
                {(!session) ? (
                    <>
                        <Button variant='outline' colorScheme='messenger' onClick={() => router.push('/login')}>Sign In</Button>
                        <Link href='/signup'><Button marginLeft='3' variant='solid' colorScheme='messenger'>Sign Up</Button></Link>

                    </>
                ) : (
                <Menu>

                    <MenuButton borderRadius='full' as={IconButton} variant='outline' aria-label='Profile Info'>
                        <TriangleDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuGroup>
                                    <Link href={`/${session.email}`}><MenuItem ><ProfileCard full_name={session.full_name} /></MenuItem></Link>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup>
                            <MenuItem>Give Feedback</MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem onClick={toggleColorMode}>Dark Mode</MenuItem>
                                    <MenuItem onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })}>Logout</MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
                )}


            </Flex >
            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>

        </>

    )
}

export default Navbar


const DesktopNav = () => {
    return (
        <Flex>
            {NAV_ITEMS.map((item, key) => (
                <Link key={key} href={item.href}>
                    <Text fontWeight='bold' m={'2'} style={{ textDecoration: 'none' }} cursor='pointer'>{item.label}</Text>

                </Link>
            ))}
        </Flex>
    )
}


const MobileNav = () => {
    return (
        <Box py={2}>
            <Center flexDirection={'column'}>

                {NAV_ITEMS.map((item, key) => (
                    <Link key={key} href={item.href}>
                        <Text fontWeight='bold'>{item.label}</Text>
                    </Link>
                ))}
            </Center>
        </Box>
    )
}


interface NavItem {
    label: string,
    href: string
}

const NAV_ITEMS: Array<NavItem> = [

    {
        label: 'Home',
        href: '/',
    },

]