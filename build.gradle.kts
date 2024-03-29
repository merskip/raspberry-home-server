import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.1.7.RELEASE"
    id("io.spring.dependency-management") version "1.0.7.RELEASE"
    kotlin("plugin.jpa") version "1.2.71"
    war
    kotlin("jvm") version "1.2.71"
    kotlin("plugin.spring") version "1.2.71"
    id("idea")
}

group = "pl.merskip"
version = "0.0.1"
java.sourceCompatibility = JavaVersion.VERSION_12

val developmentOnly: Configuration by configurations.creating
configurations {
    runtimeClasspath {
        extendsFrom(developmentOnly)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    runtimeOnly("mysql:mysql-connector-java")
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    implementation("org.webjars:jquery:3.4.1")
    implementation("org.webjars:bootstrap:4.3.1")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "12"
    }
}

sourceSets {
    main {
        java {
            srcDir("src/main/kotlin")
        }
        resources {
            srcDir("src/main/webapp")
        }
    }
}

task<Exec>("npmInstall") {
    workingDir("src/main/webapp")
    commandLine("npm", "install")
}

task<Exec>("webpack") {
    dependsOn("npmInstall")
    workingDir("src/main/webapp")
    commandLine("npm", "run", "webpack")
}

tasks.named("idea") {
    dependsOn("cleanIdeaModule", "ideaModule", "npmInstall")
}
