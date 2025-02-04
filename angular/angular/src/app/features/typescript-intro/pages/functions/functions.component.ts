import { Component } from '@angular/core';
import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';

@Component({
  selector: 'features-functions',
  imports: [CodeBlockComponent],
  template: `<shared-code-block [code]="code"></shared-code-block>`
})
export class FunctionsComponent {
  public readonly code = `
    function addNumbers(a: number, b: number): number {
      return a + b;
    }
    const addNumbersArrow = (a: number, b: number): string => {
      return \`\${a + b}\`;
    }

    function multiply(firstNumber: number, secondNumber?: number, base: number = 2) {
      return firstNumber * base;
    }

    const result: number = addNumbers(1, 2);
    const result2: string = addNumbersArrow(1, 2);
    const result3: number = multiply(5);

    interface Character {
      name: string;
      hp: number;
      showHp: () => void;
    }

    console.log({ result, result2, result3 })

    const healCharacter = (character: Character, amount: number) => {
      character.hp += amount;
    }

    const strider: Character = {
      name: "Strider",
      hp: 50,
      showHp(): void {
        console.log(\`Puntos de vida \${this.hp}\`);
      }
    }

    strider.showHp();

    healCharacter(strider, 10);

    strider.showHp();

    export { };

  `
}
