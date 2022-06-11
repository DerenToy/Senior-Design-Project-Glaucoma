import { Directive, EventEmitter, HostListener, Output, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {

  @Output() fileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = '#c8dadf';
  @HostBinding('style.width') private width = '97%';
  @HostBinding('style.height') private height = '97%';

  // Dragover Event
  @HostListener('dragover', ['$event']) dragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#e5edf0';
    this.height = "95%"
    this.width = "95%"
  }

  // Dragleave Event
  @HostListener('dragleave', ['$event']) public dragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#c8dadf';
    this.height = "97%"
    this.width = "97%"
  }

  // Drop Event
  @HostListener('drop', ['$event']) public drop(event) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files)
    }
  }

}
