import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../coin.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title = 'Add Product';
  angForm: FormGroup;
  constructor(private coinservice: CoinService, private fb: FormBuilder, private router: Router) {
    this.createForm();
   }
  createForm() {
    this.angForm = this.fb.group({
      codigo: ['', Validators.required ],
      nombre: ['', Validators.required ]
   });
  }
  addCoin(codigo, precio) {
      this.coinservice.addCoin(codigo, precio);
      this.router.navigate(['index']);
  }
  ngOnInit() {
  }
}
