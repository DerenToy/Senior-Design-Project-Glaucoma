import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PredictImageService } from './predict-image.service';
import { faRedo, IconDefinition } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  canvasRectangleImageData: ImageData = null
  predictions: Array<number> = null;
  glaucomaPredictionPercent: number = 0
  glaucomaPredictionAnimClass: string = ''
  faRedo: IconDefinition = faRedo

  @ViewChild('predictcanvas', { static: true })
  predictcanvas: ElementRef<HTMLCanvasElement>;

  constructor(private predictImageService: PredictImageService) { }

  ngOnInit(): void {
    this.predictImageService.predictions.subscribe(predictions => {
      console.log(predictions)
      if (predictions) {
        this.predictions = predictions
        this.glaucomaPredictionPercent = 100 * (this.predictions[0] > 0.01 ? this.predictions[0] : 0.01)
        if (this.predictions[0] > 0.6) {
          this.glaucomaPredictionAnimClass = "glaucoma"
        } else if (this.predictions[0] > 0.4) {
          this.glaucomaPredictionAnimClass = "maybe-glaucoma"
        } else {
          this.glaucomaPredictionAnimClass = "not-glaucoma"
        }
      }
    })
  }

  changeImageData(imageData: ImageData) {
    this.predictcanvas.nativeElement.getContext("2d").clearRect(0, 0, this.predictcanvas.nativeElement.width, this.predictcanvas.nativeElement.height)
    let x1 = (this.predictcanvas.nativeElement.width / 2) - (imageData.width / 2)
    let y1 = (this.predictcanvas.nativeElement.height / 2) - (imageData.height / 2)
    this.canvasRectangleImageData = imageData
    this.predictcanvas.nativeElement.getContext("2d").putImageData(imageData, x1, y1)
    console.log("changed data")
  }

  predictImage() {
    if (this.canvasRectangleImageData) {
      this.predictImageService.predict(this.canvasRectangleImageData)
    }
  }

  reset() {
    location.reload()
  }

}
