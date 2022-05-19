import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  me: any = {};
  email;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.me().subscribe(res => {
      this.me = res;
    });
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.userService.makeAdmin(formData.value.email);
      formData.reset('');
    }
  }

}
