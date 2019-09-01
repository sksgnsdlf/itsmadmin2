import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtml } from './safe-html';

@NgModule({
    declarations: [ SafeHtml ],
    imports: [ CommonModule ],
    exports: [ SafeHtml ],
    providers: [],
})
export class SafeHtmlPipeModule {}