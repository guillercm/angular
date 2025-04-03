import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {

    let service: CalculatorService;

    // Antes de cada prueba
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);
    })

    // Antes de todas las pruebas
    beforeAll(() => {

    })

    // Después de cada prueba
    afterEach(() => {

    })

    // Después de todas las pruebas
    afterAll(() => {

    })

    it('should be created', () => {
        expect(CalculatorService).toBeTruthy();
    })

    it('should be created with default values', () => {
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    })

    it('should be resultText, subResultText to "0" when C is pressed', () => {
        service.constructNumber('4')
        service.constructNumber('7')
        service.constructNumber('*')
        service.constructNumber('2')
        service.constructNumber('C')
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    })

    it('should update resultText with number input', () => {
        service.constructNumber('1')
        expect(service.resultText()).toBe('1');

        service.constructNumber('2')
        expect(service.resultText()).toBe('12');
    })

    it('should handle operators correctly', () => {
        service.constructNumber('1')
        service.constructNumber('+')
        expect(service.lastOperator()).toBe('+');
        expect(service.subResultText()).toBe('1');
    })

    it('should calculate result correctly for adition', () => {
        service.constructNumber('1')
        service.constructNumber('+')
        service.constructNumber('2')
        service.constructNumber('=')
        expect(service.resultText()).toBe('3')
    })
    it('should calculate result correctly for subtraction', () => {
        service.constructNumber('6')
        service.constructNumber('-')
        service.constructNumber('5')
        service.constructNumber('=')
        expect(service.resultText()).toBe('1')
    })

    it('should calculate result correctly for multiplication', () => {
        service.constructNumber('2');
        service.constructNumber('*');
        service.constructNumber('4');
        service.constructNumber('=');
    
        expect(service.resultText()).toBe('8');
      });
    
      it('should calculate result correctly for division', () => {
        service.constructNumber('1');
        service.constructNumber('0');
        service.constructNumber('/');
        service.constructNumber('2');
        service.constructNumber('=');
    
        expect(service.resultText()).toBe('5');
      });
    
      it('should handle decimal point correctly', () => {
        service.constructNumber('1');
        service.constructNumber('.');
        service.constructNumber('5');
    
        expect(service.resultText()).toBe('1.5');
        service.constructNumber('.');
        expect(service.resultText()).toBe('1.5');
      });
    
      it('should handle decimal point correctly starting with zero', () => {
        service.constructNumber('0');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('0');
    
        expect(service.resultText()).toBe('0.0');
      });
    
      it('should handle sign change correctly', () => {
        service.constructNumber('1');
        service.constructNumber('+/-');
    
        expect(service.resultText()).toBe('-1');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('1');
      });
    
      it('should handle backspace correctly', () => {
        service.constructNumber('1');
        service.constructNumber('2');
        service.constructNumber('3');
    
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('12');
    
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('1');
    
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('0');
      });
    
      it('should handle max length correctly', () => {
        Array.from({ length: 10 }).forEach(() => {
            service.constructNumber('1');
        });
    
        expect(service.resultText().length).toBe(10);
    
        service.constructNumber('1');
        expect(service.resultText().length).toBe(10);
      });
    
})