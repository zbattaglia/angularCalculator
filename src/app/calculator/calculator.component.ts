import { Component, OnInit } from '@angular/core';

// @Component decorator links the template (HTML) to component.html and styles to component.css
// all of the logic is in the .ts file
// selector creates an HTML tag for this component (See the .html file)
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  // holds the string value of the result
  currentNumber = '0';
  // holds the value of the first operand of the operation
  firstOperand = null;
  // will store which operator was clicked
  operator = null;
  // boolean indicating if user has finished typing first number and selected an operand
  waitForSecondNumber = false;

  // updates number
  public getNumber( v: string ) {
    console.log( v );
    if( this.waitForSecondNumber) {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
    }
  }

  // appends decimal to number when clicked
  getDecimal() {
    if( !this.currentNumber.includes('.') ) {
      this.currentNumber += '.';
    }
  }

  private doCalculation( op, secondOp ) {
    switch( op ) {
      case '+':
        return this.firstOperand += secondOp;
      case '-':
        return this.firstOperand -= secondOp;
      case '*':
        return this.firstOperand *= secondOp;
      case '/':
        return this.firstOperand /= secondOp;
      case '=':
        return secondOp;
    }
  }

  public getOperation( op: String ) {
    console.log( op );

    if( this.firstOperand === null ) {
      this.firstOperand = Number( this.currentNumber );
    } else if( this.operator ) {
      const result = this.doCalculation( this.operator, Number( this.currentNumber ));
      this.currentNumber = String( result );
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log( this.firstOperand );
  }

  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
