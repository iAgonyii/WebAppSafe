import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScanService} from "../../services/scan.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-home-scan',
  templateUrl: './home-scan.component.html',
  styleUrls: ['./home-scan.component.css']
})
export class HomeScanComponent implements OnInit {

  validateForm!: FormGroup;
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  modalUrl;
  isVisible = false;

  submitForm(): void {
    // Open modal
    this.showModal();

    console.log('submit', this.validateForm.value);
    let scan = this.validateForm.value;
    scan.date = new Date().toISOString();
    scan.data = "test";
    this.scanService.postScan(scan);
    this.modalUrl = this.validateForm.value.url

    // Reset form values
    this.validateForm.value.url = '';
    this.validateForm.value.rescan = false;
    this.validateForm.value.hidden = false;
  }

  constructor(private fb: FormBuilder, private scanService: ScanService, private notificationService: NzNotificationService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      url: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      hidden: [false],
      rescan: [false]
    });

    this.scanService.scanError.subscribe(error => {
      this.isVisible = false;
      this.notificationService.error('An error occurred', `An error occurred while initiating your scan for <b>${this.modalUrl}</b><br>${error}`, {nzPlacement: 'bottomRight', nzDuration: 10000})
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    // @ts-ignore
    this.notificationService.info('Scan running', `Your scan for <b>${this.modalUrl}</b>
                                    is still running in the background.
                                    You will be automatically redirected when the results are in.`, {nzPlacement: 'bottomRight', nzDuration: 0})
  }

}
