#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

long Num1, Num2, Number;
char action;
boolean result = false;

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
}


void loop() {
  String inBytes = Serial.readStringUntil('\n');
  Serial.print(inBytes);
  DetectButtons(inBytes);
  
  if (result == true) {
    calculateResult();
    sendResult();
  }

  displayResult();
}


void DetectButtons(String inBytes) {
  lcd.clear();

  if (inBytes == "0") {
    if (Number == 0)  {
      Number = 0;
    }
    else {
      Number = (Number * 10) + 0;
    }
  }

  if (inBytes == "1") {
    if (Number == 0) {
      Number = 1;
    }
    else {
      Number = (Number * 10) + 1;
    }
  }

  if (inBytes == "2") {
    if (Number == 0) {
      Number = 2;
    }
    else {
      Number = (Number * 10) + 2;
    }
  }

  if (inBytes == "3") {
    if (Number == 0) {
      Number = 3;
    }
    else {
      Number = (Number * 10) + 3;
    }
  }

  if (inBytes == "4") {
    if (Number == 0) {
      Number = 4;
    }
    else {
      Number = (Number * 10) + 4;
    }
  }

  if (inBytes == "5") {
    if (Number == 0) {
      Number = 5;
    }
    else {
      Number = (Number * 10) + 5;
    }
  }

  if (inBytes == "6") {
    if (Number == 0) {
      Number = 6;
    }
    else {
      Number = (Number * 10) + 6;
    }
  }

  if (inBytes == "7") {
    if (Number == 0) {
      Number = 7;
    }
    else {
      Number = (Number * 10) + 7;
    }
  }

  if (inBytes == "8") {
    if (Number == 0) {
      Number = 8;
    }
    else {
      Number = (Number * 10) + 8;
    }
  }

  if (inBytes == "9") {
    if (Number == 0) {
      Number = 9;
    }
    else {
      Number = (Number * 10) + 9;
    }
  }

  if (inBytes == "button_clear") {
    Number = Num1 = Num2 = 0;
    result = false;
  }

  if (inBytes == "button_equals") {
    Num2 = Number;
    result = true;
  }

  if (inBytes == "A" || inBytes == "B" || inBytes == "C" || inBytes == "D") {
    Num1 = Number;

    Number = 0;

    if (inBytes == "A") {
      action = '/';
    }

    if (inBytes == "B") {
      action = '*';
    }

    if (inBytes == "C") {
      action = '-';
    }

    if (inBytes == "D") {
      action = '+';
    }
  }
}

void calculateResult() {
  if (action == '+')
    Number = Num1 + Num2;

  if (action == '-')
    Number = Num1 - Num2;

  if (action == '*')
    Number = Num1 * Num2;

  if (action == '/')
    Number = Num1 / Num2;
}

void displayResult() {
  lcd.setCursor(0, 0);

  lcd.print(Num1); lcd.print(action); lcd.print(Num2);

  if (result == true) {
    lcd.print(" = "); lcd.print(Number);
  }

  lcd.setCursor(0, 1);

  lcd.print(Number);
}

void sendResult() {
  Serial.print(Num1);
  Serial.print(action);
  Serial.print(Num2);
  Serial.print("=");
  Serial.print(Number);
}
