#include <SoftwareSerial.h>
#include <NewPing.h>
#include <Servo.h>

// Control de velocidad
#define ENAB 11
int SpeedMotor = 200;

// Ultrasonico
#define TRIG_PIN 8
#define ECHO_PIN 12
#define MAX_DISTANCE 200            
NewPing sonar(TRIG_PIN, ECHO_PIN, MAX_DISTANCE); 

Servo myservo;

// CONEXIONES PARA EL BLUETOOTH
int bluetoothTx = 2;
int bluetoothRx = 3;
SoftwareSerial bluetooth(bluetoothTx, bluetoothRx);

// MOTOR 1
int Motor1A = 7;
int Motor1B = 6;

// MOTOR 2
int Motor2A = 5;
int Motor2B = 4;

// Declaración global de la variable distancia
int distance;

void setup() {
  Serial.begin(9600);

  bluetooth.begin(9600);  // Configuración del módulo Bluetooth
  bluetooth.println("$$$");  
  delay(100);
  bluetooth.println("U,9600,N");  
  delay(100);
  bluetooth.begin(9600);

  pinMode(Motor1A, OUTPUT);
  pinMode(Motor2A, OUTPUT);
  pinMode(Motor1B, OUTPUT);
  pinMode(Motor2B, OUTPUT);
  pinMode(ENAB, OUTPUT);

  digitalWrite(Motor1A, LOW);
  digitalWrite(Motor2A, LOW);
  digitalWrite(Motor1B, LOW);
  digitalWrite(Motor2B, LOW);

  analogWrite(ENAB, 135); // Velocidad de los 2 motores

  myservo.attach(9);
  myservo.write(115);
  delay(2000);
}

void loop() {
  if (bluetooth.available()) {
    char toSend = (char)bluetooth.read();

    // Mostrar la letra recibida en el monitor serial
    Serial.print("Letra recibida: ");
    Serial.println(toSend);

    // Adelante
    if (toSend == 'A') {
      moveForward();
    }
    // Atrás
    else if (toSend == 'C') {
      moveBackward();
    }
    // Izquierda
    else if (toSend == 'B') {
      turnLeft();
    }
    // Derecha
    else if (toSend == 'D') {
      turnRight();
    }
    // Detener
    else if (toSend == 'S') {
      moveStop();
    }
  }

  // Detección de obstáculos
  distance = readPing();
  if (distance <= 20) { // Se detiene si detecta un obstáculo a 20 cm
    moveStop();
    delay(200);

    int distanceR = lookRight();
    delay(200);
    int distanceL = lookLeft();
    delay(200);

    if (distanceR <= 20 && distanceL <= 20) {
      // Ambos lados están bloqueados, retrocede
      moveBackward();
      delay(800);
    } else if (distanceR > 20 && distanceL <= 20) {
      // Lado derecho está libre, gira a la derecha
      turnRight();
      delay(300);
    } else if (distanceL > 20 && distanceR <= 20) {
      // Lado izquierdo está libre, gira a la izquierda
      turnLeft();
      delay(300);
    } else {
      // Ambos lados están libres, retrocede un poco
      moveBackward();
      delay(500);
    }
    moveStop();
  }
}

int lookRight() {
  myservo.write(50);
  delay(500);
  int distance = readPing();
  delay(100);
  myservo.write(115);
  return distance;
}

int lookLeft() {
  myservo.write(170);
  delay(500);
  int distance = readPing();
  delay(100);
  myservo.write(115);
  return distance;
}

int readPing() {
  delay(70);
  int cm = sonar.ping_cm();
  if (cm == 0) {
    cm = 250;
  }
  return cm;
}

void moveStop() {
  digitalWrite(Motor1A, LOW);
  digitalWrite(Motor1B, LOW);
  digitalWrite(Motor2A, LOW);
  digitalWrite(Motor2B, LOW);
}

void moveForward() { // CARRITO AVANZA
  digitalWrite(Motor1A, HIGH);
  digitalWrite(Motor1B, LOW);
  digitalWrite(Motor2A, HIGH);
  digitalWrite(Motor2B, LOW);
}

void moveBackward() { // HACIA ATRAS
  digitalWrite(Motor1A, LOW);
  digitalWrite(Motor1B, HIGH);
  digitalWrite(Motor2A, LOW);
  digitalWrite(Motor2B, HIGH);
}

void turnRight() { // GIRA A LA DERECHA
  digitalWrite(Motor1A, HIGH);
  digitalWrite(Motor1B, LOW);
  digitalWrite(Motor2A, LOW);
  digitalWrite(Motor2B, HIGH);
}

void turnLeft() { // GIRA A LA IZQUIERDA
  digitalWrite(Motor1A, LOW);
  digitalWrite(Motor1B, HIGH);
  digitalWrite(Motor2A, HIGH);
  digitalWrite(Motor2B, LOW);
}

