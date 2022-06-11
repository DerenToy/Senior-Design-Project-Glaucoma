import { Injectable, OnInit } from '@angular/core';

import * as tf from '@tensorflow/tfjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictImageService {

  model: tf.LayersModel;
  predictions: BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>(null);

  constructor() {
    this.loadModel()
  }

  async loadModel() {
    this.model = await tf.loadLayersModel('/assets/ai-acrima-model/model.json');
    console.log(this.model)
  }

  async predict(imageData: ImageData) {

    console.log(imageData)
    let img = tf.browser.fromPixels(imageData, 3)
      .resizeBilinear([100, 100])
      .div(tf.scalar(255));
    img = img.reshape([1, 100, 100, 3]);
    img = tf.cast(img, 'float32');

    // Make and format the predications
    const output = this.model.predict(img) as any;

    // Save predictions on the component
    this.predictions.next(Array.from(output.dataSync()))
    console.log(this.predictions.value)


  }

}
