import styled from "styled-components";

export const HomeTemplate = () => {
  return (
    <Container>
      <h1>HomeTemplate</h1>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
