import { Grid, Skeleton, Container } from "@mantine/core";

const child = <Skeleton height={140} radius="md" animate={false} />;

export function HomeGrid() {
  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
}
