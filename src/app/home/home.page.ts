import { Component } from '@angular/core';
import { ColorsService } from '../services/colors.service';
import { Platform } from '@ionic/angular';
import { Clipboard } from '@angular/cdk/clipboard';
import { AlertController } from '@ionic/angular';

/** Pagination */
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public colorList;
  private pageChangeSubject = new Subject<any>();
  public TOTAL_COLORS = 0;
  public CURRENT_PAGE = 1;
  public CURRENT_COLORS = 0;
  public COLORS_PER_PAGE = 0;
  public TOTAL_PAGES = 0;

  constructor(
    
    private colorSerivce:ColorsService,
    private platform: Platform,
    private clipboard: Clipboard,
    public alertController: AlertController, 

    ) {

      this.pageChangeSubject.subscribe({
        next: (page) => {
          this.CURRENT_PAGE = page;
          this.getColors();
        }
      });

    }



  ngOnInit(){

    this.platform.ready().then(  () => {

      this.getColors();

    }).catch(error=>{

      console.log({error});

    });

  }


  prevPage(){
    
    const targetPage = this.CURRENT_PAGE - 1;

    if(1 <= targetPage){

      this.pageChangeSubject.next( targetPage );

    }

  }


  nextPage(){
    
    if(this.CURRENT_PAGE < this.TOTAL_PAGES){
      this.pageChangeSubject.next(this.CURRENT_PAGE + 1);
    }

  }

  copyColor(color, name){
    this.clipboard.copy(color);
    this.alertController.create({
      header: 'Color copiado',
      message: `El color <strong>${color}</strong>, (${name}) fue copiado al portapapeles.`,
      buttons: ['Ok']
    }).then(alert=>{
      alert.present();
    });   

  }

  updateColorList(colors){
    this.colorList = colors;
  }

  setPaginationData(colorRequestResult){
    this.TOTAL_PAGES = colorRequestResult["total_pages"];
    this.CURRENT_PAGE = colorRequestResult["page"];
    this.COLORS_PER_PAGE = colorRequestResult["per_page"];
    this.setCurrentColors(this.CURRENT_PAGE);
  }

  async getColors(){
    
    console.log("Fetch colors...");

    const colors = await this.colorSerivce.getColorList( this.CURRENT_PAGE );
    this.updateColorList( colors["data"] );
    this.setPaginationData( colors );

    this.TOTAL_COLORS = colors["total"];
    return colors;

  }

  setCurrentColors(page){
    this.CURRENT_COLORS = this.COLORS_PER_PAGE * page;
  }

}
