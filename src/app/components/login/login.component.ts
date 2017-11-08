import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  error: any;
  public loading = false;
  constructor(public afAuth: AngularFireAuth, private router: Router, private spinnerService: Ng4LoadingSpinnerService ) { }

  onSubmit(formData) {
    this.spinnerService.show();    
    this.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
    .then((userdata) => {
      this.spinnerService.hide();
      this.router.navigate(['/dashboard']);
    })
    .catch((error) => {
      this.spinnerService.hide();
      this.error = 'Invalid username or password';
  });
  }
}



