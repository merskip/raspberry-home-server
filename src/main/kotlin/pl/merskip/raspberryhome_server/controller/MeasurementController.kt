package pl.merskip.raspberryhome_server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import pl.merskip.raspberryhome_server.jpa.Measurement
import pl.merskip.raspberryhome_server.repository.MeasurementRepository
import java.sql.Date

@RestController
class MeasurementController(
        val measurementRepository: MeasurementRepository
) {

    @GetMapping("/api/availableDays")
    fun getDays() = measurementRepository.findAllDays()

    @GetMapping("/api/sensors/{sensorId}/measurements/{date}")
    fun getMeasurementsInDay(
            @PathVariable("sensorId") sensorId: Long,
            @PathVariable("date") date: Date
    ): Iterable<Measurement> {
        val afterTimeMicroseconds = date.time * 1_000
        val beforeTimeMicroseconds = afterTimeMicroseconds + microsecondsPerDay
        return measurementRepository.findMeasurementsForSensorInDate(sensorId, afterTimeMicroseconds, beforeTimeMicroseconds)
    }

    @GetMapping("/api/measurements")
    fun getLast100Measurement() = measurementRepository.findAll().reversed().take(100)

    companion object {
        private const val microsecondsPerDay = 3600 * 24 * 1_000_000L
    }
}