import { Box, Button, Container, Flex, HStack, Text, useColorMode, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box
			w="100%"
			h="200px"
			bgGradient={[
				"linear(to-tr, teal.300, yellow.400)",
				"linear(to-t, blue.200, teal.500)",
				"linear(to-b, orange.100, purple.300)",
			]}
			display="flex"
			alignItems="center"
			justifyContent="center"
			px={4}
		>
			<Container maxW="1140px">
				<Flex
					h={16}
					alignItems="center"
					justifyContent="space-between"
					flexDir={{ base: "column", sm: "row" }}
				>
					<Text
						fontSize={{ base: "22px", sm: "28px" }}
						fontWeight="bold"
						textTransform="uppercase"
						textAlign="center"
						bgClip="text"
					>
						<Link to="/">Product Store 🛒</Link>
					</Text>

					<HStack spacing={2} alignItems="center">
						<Tooltip label="Add Product" aria-label="Add Product">
							<Link to="/create">
								<Button>
									<PlusSquareIcon fontSize={20} />
								</Button>
							</Link>
						</Tooltip>

						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
						</Button>
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
};

export default Navbar;
