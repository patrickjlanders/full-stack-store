import { Box, Text, Flex, Button, Container } from "@chakra-ui/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { ItemsService } from "../../client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const Route = createFileRoute("/_layout/summary")({
  component: ItemSummary,
})



function ItemSummary() {
  const summary = useSuspenseQuery({
    queryKey: ["items"],
    queryFn: () => ItemsService.readSummary({}),
  })

  const navigate = useNavigate()

  return (
    <Container maxW="full">

      <Flex
        flexDirection="column"
        marginTop="20px"
        padding="12px 20px"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box bg="white" p='40px'>
          <Text>Total Cost: {summary.data.sum}</Text>
        </Box>
        <Flex
          flexDirection="column"
          marginTop="20px"
          padding="12px 20px"
        >

          <Button variant="primary" size='lg' alignSelf="flex-end" onClick={() =>
            navigate({
              to: "/items",
            })
          }
          >
            Back
          </Button>
        </Flex>
      </Flex>

    </Container>

  )
}
