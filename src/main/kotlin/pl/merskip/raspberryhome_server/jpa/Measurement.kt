package pl.merskip.raspberryhome_server.jpa

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import javax.persistence.*

@Entity
@Table(name = "measurements")
data class Measurement(

        @Id
        val id: Long,

        @JoinColumn(name = "sensor_id")
        @ManyToOne
        @JsonIgnore
        val sensor: Sensor,

        @Column(name = "sensor_id", updatable = false, insertable = false)
        val sensorId: Long,

        @JoinColumn(name = "characteristic_id")
        @ManyToOne
        @JsonIgnore
        val characteristic: Characteristic,

        @Column(name = "characteristic_id", updatable = false, insertable = false)
        val characteristicId: String,

        val value: Float,

        @Column(name = "formatted_value")
        val formattedValue: Float,

        @Column(name = "time_start")
        @JsonIgnore
        val timeStartMicroseconds: Long,

        @Column(name = "time_end")
        @JsonIgnore
        val timeEndMicroseconds: Long
) {

    @Suppress("unused")
    val timeStart: LocalDateTime
        get() {
            return toLocalDateTime(timeStartMicroseconds)
        }

    @Suppress("unused")
    val timeEnd: LocalDateTime
        get() {
            return toLocalDateTime(timeEndMicroseconds)
        }

    private fun toLocalDateTime(microseconds: Long): LocalDateTime {
        val secondsFromEpoch = microseconds / 1_000_000
        val remainingNanoseconds = (microseconds % 1_000_000) * 1_000
        val instant = Instant.ofEpochSecond(secondsFromEpoch, remainingNanoseconds)
        return instant.atZone(ZoneId.systemDefault()).toLocalDateTime()
    }
}