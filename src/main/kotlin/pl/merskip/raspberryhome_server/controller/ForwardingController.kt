package pl.merskip.raspberryhome_server.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping


@Controller
class ForwardingController {

    @Suppress("MVCPathVariableInspection")
    @RequestMapping("/{[path:[^\\.]*}")
    fun forward() = "forward:/"
}