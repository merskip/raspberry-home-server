package pl.merskip.raspberryhome_server.repository

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import pl.merskip.raspberryhome_server.jpa.Measurement
import java.sql.Date

@Repository
interface MeasurementRepository : CrudRepository<Measurement, Long> {

    @Query("""
        select DATE(FROM_UNIXTIME(m.time_start / 1e6)) as d
        from measurements m
        group by d
        """, nativeQuery = true)
    fun findAllDays(): List<Date>

    @Query("""
        select m.*
        from sensors s
        left join sensors_to_characteristics s2c on s.id = s2c.sensor_id
        right join characteristics c on s2c.characteristic_id = c.id
        left join measurements m on c.last_measurement_id = m.id
        where s.id in :sensorsIds
        """, nativeQuery = true)
    fun findLastMeasurementsForSensors(sensorsIds: List<Long>): Iterable<Measurement>

    @Query("""
        select m 
        from Measurement m 
        where
            m.sensorId = :sensorId
            and m.timeStartMicroseconds >= :afterTime
            and m.timeStartMicroseconds <= :beforeTime""")
    fun findMeasurementsForSensorInDate(sensorId: Long, afterTime: Long, beforeTime: Long): Iterable<Measurement>
}