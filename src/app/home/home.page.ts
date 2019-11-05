import { Component, ViewChild } from '@angular/core';
import { DatecsPrinterService } from '../services/datecs-printer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('myCanvas', { static: false }) miCanvas;

  imageURL = 'https://firebase.google.com/images/integrations/pagerduty.png';
  imageLocal = './assets/images/pagerduty.png';

  mensajes: string[] = [];

  constructor(
    private datecsPrinter: DatecsPrinterService
  ) {}

  canvas() {
    this.mensajes.push('Empezó la función');
    const canvas = this.miCanvas.nativeElement;
    canvas.height = 297;
    canvas.width = 297;
    const context = canvas.getContext('2d');

    const img = new Image();
    // img.crossOrigin="anonymous"
    img.onload = async () => {
      this.mensajes.push('Cargó la imagen');
      context.drawImage(img, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
      console.log({ imageData });
      this.mensajes.push('imageData');
      this.mensajes.push(imageData);
      // Grande
      // await this.datecsPrinter.connect('DC:0D:30:80:E9:5D');
      // Pequeña
      await this.datecsPrinter.connect('DC:0D:30:04:E3:7A');
      await this.datecsPrinter.feedPaper(100);
      await this.datecsPrinter.printImage(
        imageData, //base64
        canvas.width,
        canvas.height,
        0
      );
      // await this.datecsPrinter.printBarcode();
      // await this.datecsPrinter.printQRCode();
      await this.datecsPrinter.feedPaper(100);
      this.mensajes.push('Terminó la función');
    };
    img.src = this.imageLocal;
  }

}
