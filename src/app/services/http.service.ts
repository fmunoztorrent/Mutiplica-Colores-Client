import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public loader;

  constructor(
    private loadingSpinner:LoadingController,
    private http: HttpClient
  ) { }





  async get(url: string, token: string):Promise<any>{
    
    await this.displayHttpLoadingSpinner();

    let options = {}

    if(token!=''){
      options = { headers: this.getHeaderOptionsWithBearer(token) };
    } else {
      options = { headers: this.getHeaderOptionsWithoutBearer() }
    }

    return this.http.get(url, options).toPromise().then(response=>{

      return response;

    }).catch(error=>{

      console.log({error});

    }).finally(()=>{

      this.hideHttpLoadingSpinner();
    });

  }





  async post(url: string, data: any, token: string, showLoader:boolean=true) {

    if(showLoader){
      await this.displayHttpLoadingSpinner();
    }

    let options = {}

    if(token!=''){
      options = { headers: this.getHeaderOptionsWithBearer(token) };
    } else {
      options = { headers: this.getHeaderOptionsWithoutBearer() }
    }
    
    return this.http.post(url, JSON.stringify(data), options).toPromise().then(response=>{
      
      console.log("POST request response recieved")
      return response;

    }).catch(error=>{

      return error;

    }).finally( ()=>{

      console.log("Executed final statement post requests");
      if(showLoader){
        this.hideHttpLoadingSpinner();
      }

    })


  }




  getHeaderOptionsWithBearer(token){
    let httpHeaderOptions = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization' : `Bearer ${token}`});
    return httpHeaderOptions;
  }




  getHeaderOptionsWithoutBearer(){
    let httpHeaderOptions = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return httpHeaderOptions;
  }




  async displayHttpLoadingSpinner(title='Cargando...'){
    
    this.loader = await this.loadingSpinner.create({
      message: title
    });

    this.loader.present();
  }



  async hideHttpLoadingSpinner(){
    this.loader.dismiss();
  }



}
