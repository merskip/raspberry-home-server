package pl.merskip.raspberryhome_server.jpa

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

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

        val accuracy: Float?
)