import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScanService} from "../../services/scan.service";

@Component({
  selector: 'app-home-scan',
  templateUrl: './home-scan.component.html',
  styleUrls: ['./home-scan.component.css']
})
export class HomeScanComponent implements OnInit {

  validateForm!: FormGroup;
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    let scan = this.validateForm.value;
    scan.date = new Date().toISOString();
    scan.data = "test";
    this.scanService.postScan(scan);
  }

  constructor(private fb: FormBuilder, private scanService: ScanService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      url: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      hidden: [false],
      rescan: [false]
    });
  }

}
