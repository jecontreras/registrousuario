import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToolsService } from '../../services/tools.service';
import { FactoryModelService } from '../../services/factory-model.service';
import * as _ from 'lodash';
import { GLOBAL } from './../../services/global';
import swal from 'sweetalert';
import { ExcelServiceService } from 'src/app/services/excel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public list_usuario: any;
  public data: any;
  public text: any;
  public query:any = {
    where:{},
    //limit: -1,
    //skip: 0
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private _authSrvice: AuthService,
    private _tools: ToolsService,
    private _model: FactoryModelService,
    private _excel: ExcelServiceService
  ) {
    this.get_init();
  }

  ngOnInit() {


  }

  get_init(){
    console.log(this.query)
    this._model.query("user", this.query)
    .subscribe((rta: any) => {
      console.log(rta);
      rta = rta.data;
      this.list_usuario = rta;
    })
  }

  buscar() {
    const
      paginate: any = {
        pageIndex: 10,
        pageSize: 0
      }
      ;
    if (this.text) {
      this.query.where.or = [
        {
          cedula: {
            contains: this.text || ''
          }
        },
        {
          nombre: {
            contains: this.text || ''
          }
        },
        {
          apellido: {
            contains: this.text || ''
          }
        },
        {
          puesto: {
            contains: this.text || ''
          }
        },
        {
          comuna: {
            contains: this.text || ''
          }
        },
        {
          telefono: {
            contains: this.text || ''
          }
        }
      ];
    } else {
      delete this.query.where.or;
    }
    this.list_usuario = [];
    this.get_init();
  }
  descar(){
    this._model.create("user/descargar",this.list_usuario)
    .subscribe((rta:any)=>{
      console.log(rta);
    });
  }


}
