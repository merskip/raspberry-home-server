package pl.merskip.raspberryhome_server.repository

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import pl.merskip.raspberryhome_server.jpa.Measurement
import java.sql.Date

@Repository
interface MeasurementRepository : CrudRepository<Measurement, Long> {

    @Query("""
        select DATE(FROM_UNIXTIME(m.time_start / 1e6)) as d
        from measurements m
        group by d""",
            nativeQuery = true)
    fun findAllDays(): List<Date>

    @Query("""
        select m 
        from Measurement m 
        where
            m.sensorId = :sensorId
            and m.timeStartMicroseconds >= :afterTime
            and m.timeStartMicroseconds <= :beforeTime""")
    fun findMeasurementsForSensorInDate(sensorId: Long, afterTime: Long, beforeTime: Long): Iterable<Measurement>
}