import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';
import { Component, inject, ViewContainerRef, viewChild, signal, OnInit } from '@angular/core';
import { DataCode } from '@shared/components/code-block/interfaces/data-code.interface';
import { environment } from '@environments/environments';
import { MarkdownModule } from 'ngx-markdown';
import { Router } from '@angular/router';


@Component({
  selector: 'core-docs',
  imports: [MarkdownModule],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.css'
})
export class DocsComponent implements OnInit {

  private readonly _container = viewChild.required('container', { read: ViewContainerRef })

  private readonly _markdownComponent = viewChild.required('markdownComponent', { read: ViewContainerRef })

  private _path = signal<string>("");
  protected path = this._path.asReadonly();

  private readonly _router = inject(Router);

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this._path.set(environment.docsPath.replace("{filename}", this._router.url.replace("/", "")))
  }

  loadMarkdown() {
    const codeBlocks = this._markdownComponent().element.nativeElement.querySelectorAll('code-block');
    codeBlocks.forEach((codeBlock: HTMLElement) => {
      const details = codeBlock.querySelectorAll("details");
      const data: DataCode[] = [];
      details.forEach((detail: HTMLElement) => {
        const label = detail.querySelector("summary")?.innerHTML || "";
        const code = detail.querySelector("code")?.innerHTML || "";
        data.push({label, code})
      });
      const comp = this._container().createComponent(CodeBlockComponent)
      comp.setInput('type', codeBlock.getAttribute('type') || 'code')
      if (!data.length) {
        comp.setInput('code', codeBlock.querySelector("code")?.innerHTML)
        const span = codeBlock.querySelector('span');
        if (span && !span.getAttribute("class"))
        comp.setInput('label', span.innerHTML || "")
      } else {
        comp.setInput('code', data)
      }
      codeBlock.innerHTML = ""
      codeBlock.appendChild(comp.location.nativeElement)
    });
  }




// @Directive({
//   selector: '[appHighlight]'
// })
// export class HighlightDirective {
//   constructor(private el: ElementRef, private renderer: Renderer2) {
//     this.renderer.setStyle(this.el, 'background-color', 'yellow');
//     console.log("DIRECTIVAAAAAAAs")
//   }
// }

  //   ref = inject(ViewContainerRef);

  // renderer = inject(Renderer2)

  // cargo(data: string) {
  //   console.log(data)
  //   console.log(this.markdownComponent().element.nativeElement.innerHTML)
  //   const codeBlocks = this.markdownComponent().element.nativeElement.querySelectorAll('code-block');
  //   codeBlocks.forEach((codeBlock: HTMLElement) => {
  //     console.log(this.markdownComponent())
  //     const comp = this.container().createComponent(CodeBlockComponent)
  //     comp.setInput('code', "holaassa")
  //     comp.setInput('type', codeBlock.getAttribute('type') || 'code')

  //     const directive = new HighlightDirective(comp.location.nativeElement, this.renderer)
  //     codeBlock.appendChild(comp.location.nativeElement)
  //   });
  // }

}
