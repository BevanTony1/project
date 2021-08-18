import {
    Avatar,
    Box,
    Flex,
    Text
} from '@chakra-ui/react'



interface ProfileCardProps {
    full_name?: string | undefined | any;
    image?: string
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ full_name }) => {
    return (
        <Box>
            <Flex>
                <Avatar name={full_name} />
                <Box marginLeft='2'>
                    {full_name}
                    <Text>See your profile</Text>
                </Box>
            </Flex>
        </Box>
    )
}