import { Navbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

function AppNavbar() {
  const { state, dispatch } = useAuth()
  const { isAuthenticated, user } = state

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">FER202 - Lab 3</Navbar.Brand>

        {isAuthenticated && (
          <div className="d-flex align-items-center gap-3">
            <span className="text-white">
              {user?.name}
            </span>

            <Button
              variant="outline-light"
              onClick={() => dispatch({ type: 'LOGOUT' })}
            >
              Đăng xuất
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  )
}

export default AppNavbar