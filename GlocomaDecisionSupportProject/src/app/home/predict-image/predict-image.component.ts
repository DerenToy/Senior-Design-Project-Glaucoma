import { Component, ElementRef, NgZone, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { PredictImageService } from '../predict-image.service';
import { CanvasRect } from './canvas-rect';

@Component({
  selector: 'app-predict-image',
  templateUrl: './predict-image.component.html',
  styleUrls: ['./predict-image.component.css']
})
export class PredictImageComponent implements OnInit {

  isDropped: boolean = false;
  reader = new FileReader();
  url: any = "#"
  img: any;
  ctx: CanvasRenderingContext2D;
  isDrawingRect: boolean = false
  canvasRectangle: CanvasRect = null
  @Output() onCanvasRectangleImageData = new EventEmitter<ImageData>();

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit(): void {
    this.reader = new FileReader();
    this.img = new Image()
    this.ctx = this.canvas.nativeElement.getContext("2d")
  }

  upload(event: FileList) {
    this.isDropped = true
    let file = event.item(0)

    this.img.onload = () => {
      this.drawImage()
      this.onCanvasRectangleImageData.emit(this.ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height))
    }
    this.reader.onload = () => {
      this.url = this.reader.result;
      this.img.src = this.reader.result.toString()
    }
    this.reader.readAsDataURL(file);
  }

  drawImage() {
    this.ctx.drawImage(this.img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
  }

  drawRect() {
    if (this.canvasRectangle) {
      this.ctx.strokeRect(this.canvasRectangle.getMinX(), this.canvasRectangle.getMinY(),
        this.canvasRectangle.getWidth(), this.canvasRectangle.getHeight())
    }
  }

  rectDrawStart(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log("started")
    this.isDrawingRect = true
    this.canvasRectangle = new CanvasRect()
    this.canvasRectangle.x1 = event.clientX - this.canvas.nativeElement.offsetLeft
    this.canvasRectangle.y1 = event.clientY - this.canvas.nativeElement.offsetTop
  }

  rectDrawing(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isDrawingRect) {
      console.log("drawing")
      this.canvasRectangle.x2 = event.clientX - this.canvas.nativeElement.offsetLeft
      this.canvasRectangle.y2 = event.clientY - this.canvas.nativeElement.offsetTop
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
      this.drawImage()
      this.drawRect()
    }
  }

  rectDrawEnd(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log("end")
    this.isDrawingRect = false
    this.onCanvasRectangleImageData.emit(this.ctx.getImageData(this.canvasRectangle.getMinX(), this.canvasRectangle.getMinY(),
      this.canvasRectangle.getWidth(), this.canvasRectangle.getHeight()))
  }
}
