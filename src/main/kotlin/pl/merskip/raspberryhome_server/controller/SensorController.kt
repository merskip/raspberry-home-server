package pl.merskip.raspberryhome_server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import pl.merskip.raspberryhome_server.repository.SensorRepository

@RestController
class SensorController(
        val sensorRepository: SensorRepository
) {

    @GetMapping("/api/sensors")
    fun getSensors() = sensorRepository.findAll().toList()
}