import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap'
import { fetchCarTypes, fetchCars } from '../api/carApi'
import { formatPriceRange } from '../utils/format'

export default function CarTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [carType, setCarType] = useState(null)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [carTypes, allCars] = await Promise.all([fetchCarTypes(), fetchCars()])
        const found = carTypes.find((rt) => String(rt.id) === String(id))
        if (!found) {
          navigate('/not-found', { replace: true })
          return
        }
        setCarType(found)
        setCars(allCars.filter((r) => String(r.carTypeId) === String(id)))
        setLoading(false)
      } catch (err) {
        setError(err.message || 'Failed to load data.')
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger" role="alert">{error}</Alert>

  return (
    <div>
      <Button className="mb-3" variant="secondary" onClick={() => navigate('/car-types')}>
        ← Back to Car Types
      </Button>
      <Card className="shadow-sm mb-4">
        <Card.Header as="h4">
          {carType.name}{' '}
          <Badge bg="secondary">ID: {carType.id}</Badge>
        </Card.Header>
        <Card.Body>
          <p className="text-muted mb-0">{cars.length} car(s) in this category</p>
        </Card.Body>
      </Card>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Seats</th>
            <th>Transmission</th>
            <th>Price Range</th>
            <th>Last Serviced</th>
          </tr>
        </thead>
        <tbody>
          {cars.length === 0 ? (
            <tr><td colSpan={6} className="text-center">No cars in this category.</td></tr>
          ) : (
            cars.map((car, i) => (
              <tr key={car.id}>
                <td>{i + 1}</td>
                <td>{car.name}</td>
                <td>{car.seats}</td>
                <td>{car.transmission}</td>
                <td>{formatPriceRange(car.priceWeekday, car.priceWeekend)}</td>
                <td>{car.lastServiced}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  )
}
