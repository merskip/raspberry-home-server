package pl.merskip.raspberryhome_server.repository

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import pl.merskip.raspberryhome_server.jpa.Sensor

@Repository
interface SensorRepository : CrudRepository<Sensor, Long>