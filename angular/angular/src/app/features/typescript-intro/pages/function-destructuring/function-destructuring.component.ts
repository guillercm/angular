import { Component } from '@angular/core';
import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';

@Component({
  selector: 'features-function-destructuring',
  imports: [CodeBlockComponent],
  template: `<shared-code-block [code]="code"></shared-code-block>`
})
export class FunctionDestructuringComponent {
  protected readonly code = `
    interface Product {
        description: string;
        price: number;
    }

    const phone: Product = {
        description: 'Nokia A1',
        price: 150.0
    }

    const tablet: Product = {
        description: 'iPad Air',
        price: 250.0
    }

    interface TaxCalculationOptions {
        tax: number;
        products: Product[];
    }

    // function taxCalculation({ tax, products }: TaxCalculationOptions): [number, number] {
    function taxCalculation(options: TaxCalculationOptions): [number, number] {
        const { tax, products } = options;
        let total = 0;
        products.forEach(({ price }) => {
            total += price;
        });
        return [total, total * tax];
    }

    const shoppingCart = [phone, tablet];
    const tax = 0.15;
    const [total, taxResult] = taxCalculation({
        products: shoppingCart,
        tax: tax,
    });

    console.log('Total', total);
    console.log('Tax', taxResult);

    export { };

  `
}
