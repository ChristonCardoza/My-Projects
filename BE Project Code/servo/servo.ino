#include <Servo.h>
#include <SoftwareSerial.h>
int bluetoothTx = 2;  // TX
int bluetoothRx = 3;  // RX
String dataFromBt;

Servo myservo;  // create servo object to control a servo
int servopin = 4;
int ir1 = 5;
int ir2 = 6;
int ir3 = 7;
int laser = 12;

SoftwareSerial bluetooth(bluetoothTx, bluetoothRx);
void setup() {
  // put your setup code here, to run once:
  //while (!Serial);     // Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
  myservo.attach(servopin);  // attaches the servo on pin 4 to the servo object
  myservo.write(90);
  Serial.begin(9600);

  bluetooth.begin(115200);
  bluetooth.print("$");
  bluetooth.print("$");
  bluetooth.print("$");
  delay(100);
  bluetooth.println("U,9600,N");
  bluetooth.begin(9600);

  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
pinMode(12, OUTPUT);
  pinMode(ir1, INPUT);
  pinMode(ir2, INPUT);
  pinMode(ir3, INPUT);
  pinMode(laser, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:

  // bluetooh
  if (bluetooth.available())
  {
    dataFromBt = bluetooth.readString();
    Serial.println(dataFromBt);


    //Front
    if (dataFromBt >= "1") {

      digitalWrite(8, LOW);
      digitalWrite(9, LOW);
      digitalWrite(10, LOW);
      digitalWrite(11, LOW);


      digitalWrite(8, LOW);
      digitalWrite(9, HIGH);
      digitalWrite(10, HIGH);
      digitalWrite(11, LOW);
    }

    //    //Back
    if (dataFromBt >= "2") {
      digitalWrite(8, LOW);
      digitalWrite(9, LOW);
      digitalWrite(10, LOW);
      digitalWrite(11, LOW);

      digitalWrite(8, HIGH);
      digitalWrite(9, LOW);
      digitalWrite(10, LOW);
      digitalWrite(11, HIGH);
    }
    //    //Left

    if (dataFromBt >= "3") {
      digitalWrite(8, LOW);
      digitalWrite(9, LOW);
      digitalWrite(10, LOW);
      digitalWrite(11, LOW);

      digitalWrite(8, LOW);
      digitalWrite(9, HIGH);
      digitalWrite(10, LOW);
      digitalWrite(11, HIGH);
    }
    //    //Right

    if (dataFromBt >= "4") {
      digitalWrite(8, LOW);
      digitalWrite(9, LOW);
      digitalWrite(10, LOW);
      digitalWrite(11, LOW);
    }
      digitalWrite(8, HIGH);
      digitalWrite(9, LOW);
      digitalWrite(10, HIGH);
      digitalWrite(11, LOW);
    }

    if (dataFromBt >= "5") {
      digitalWrite(8, LOW);
      digitalWrite(9, LOW);
      digitalWrite(10, LOW);
      digitalWrite(11, LOW);
    }   
                                                         
      if (dataFromBt >= "6") {
      digitalWrite(12, HIGH);
      delay(2000);
       digitalWrite(12, LOW);
        delay(2000);
    }

  }

  //IR
  int a = digitalRead(ir1);
  int b = digitalRead(ir2);
  int c = digitalRead(ir3);
  if (a == LOW || b == HIGH || c == LOW) {
    digitalWrite(8, LOW);
    digitalWrite(9, LOW);
    digitalWrite(10, LOW);
    digitalWrite(11, LOW);
    delay(100);
  }
  if (c == LOW) {
    myservo.write(180);
    Serial.println("detected");
    delay(4000);
    myservo.write(90);
  }
  if (a == LOW) {
    Serial.println("detected");
    myservo.write(0);
    delay(4000);
    myservo.write(90);
  }
  
  if (b == HIGH) {
    
    myservo.write(90);
    Serial.println("detected");
    delay(4000);
  }
  

}

