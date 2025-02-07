import { Component } from '@angular/core';
import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';
import { DataCode } from '@shared/components/code-block/interfaces/data-code.interface';

@Component({
  selector: 'features-installation',
  imports: [CodeBlockComponent],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.css'
})
export class InstallationComponent {

  example: DataCode[] = [//<shared-code-block [code]="example"></shared-code-block>
    {
      code: 'codigo',
      label: 'ts'
    },
    {
      code: 'codigo2',
      label: 'html'
    }
  ]
 }
