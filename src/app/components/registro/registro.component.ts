import { Component, OnInit } from '@angular/core';
import { FactoryModelService } from 'src/app/services/factory-model.service';
import swal from 'sweetalert';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  
  public data:any={};
  public id:any;
  public clone:any;

  constructor(
    private _model: FactoryModelService,
    private route: ActivatedRoute,
    private _tools: ToolsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id']!=null){
        this.id = params['id'];
        this.init_user();
      };
    });
  }
  init_user(){
    this._model.query("user",{
      where: {id: this.id}
    }).subscribe((rta:any)=>{
      rta = rta.data[0];
      if(!rta) return false;
      this.data = rta;
      this.clone = _.clone(rta);
    })
  }
  registro(){
    let data = this.data;
    console.log(data);
    this._model.create("user",this.data)
    .subscribe((rta:any)=>{
      console.log(rta);
      this.data= {};
      if(rta)  swal( 'OK' ,  'Usuario Registrado!' ,  'success' );
      else swal( 'Error' ,  'Usuario No Registrado!' ,  'success' ); 
    });
  }

  buscar(){
    console.log(this.data)
    if(!this.data.cedula) return false;

    this._model.query("user",{
      where:{
        cedula: this.data.cedula
      }
    }).subscribe((rta:any)=>{
      console.log(rta);
      rta = rta.data[0];
      if(rta)  swal( 'error' ,  'Usuario Ya Registrado!' ,  'error' );
      else swal( 'ok' ,  'Usuario No Encontrado!' ,  'success' );
    });
  }

  blur(obj:any){
    if(!this.data.id) return false;
    if((this.data[obj] !== this.clone[obj]) || obj === 'todos'){
      let query = {
        id: this.data.id
      };
      if(obj === 'todos') query= this.data;
      else query[obj]=this.data[obj];
      this._model.update("user",this.data.id,query)
      .subscribe((rta:any)=>{
        console.log(rta)
        if(rta.id)  this._tools.openSnack('Actualizado', 'Completado',false);
        else this._tools.openSnack('No Actualizado', 'Completado',false);
      });
    }
  }



}
