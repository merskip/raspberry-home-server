package pl.merskip.raspberryhome_server.jpa

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "characteristics")
data class Characteristic(

        @Id
        val id: String,

        val name: String,

        val type: String,

        val unit: String?,

        @Column(name = "min_value")
        val minValue: Float?,

        @Column(name = "max_value")
        val maxValue: Float?,

        val accuracy: Float?,

        @JoinColumn(name = "last_measurement_id")
        @ManyToOne
        @JsonIgnore
        val lastMeasurement: Measurement
)