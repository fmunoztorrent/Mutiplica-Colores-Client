import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private httpService: HttpService) { }

  async getColorList(page=1):Promise<Object>{

    const endpoint = `${environment.apiUrl}/api/colors/?page=${page}`;
    const colorList = await this.httpService.get(endpoint,'');
    return colorList;


  }

}
