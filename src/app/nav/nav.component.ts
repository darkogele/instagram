import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  menuModes = ['side', 'over', 'push'];
  mode = 'over';
  title = 'Instagram';
  versionSpaInfo: VersionClass = new VersionClass();

  constructor(public translate: TranslateService) {
    translate.addLangs(['mk', 'en']);
    translate.setDefaultLang('mk');
  }

  ngOnInit(): void {
    this.versionInformation();
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
  }

  switchMenuMode(value: string): void {
    this.mode = value;
  }

  versionInformation(): void {
    this.versionSpaInfo.name = 'SPA V';
    this.versionSpaInfo.version = '0.0.1';
  }
}

export class VersionClass {
  name: string;
  version: string;
}
