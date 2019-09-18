package pl.merskip.raspberryhome_server.jpa

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "sensors")
data class Sensor(
        @Id
        val id: Long,

        val name: String,

        @Column(name = "class_name")
        val className: String,

        @ManyToMany
        @JoinTable(
                name = "sensors_to_characteristics",
                joinColumns = [JoinColumn(name = "sensor_id")],
                inverseJoinColumns = [JoinColumn(name = "characteristic_id")]
        )
        val characteristics: List<Characteristic>,

        @Column(name = "flags")
        @JsonIgnore
        val _flags: String?
) {

        val flags: List<String>
                get() = _flags?.split(",").orEmpty()
}