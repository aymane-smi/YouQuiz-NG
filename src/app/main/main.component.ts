import { Component } from '@angular/core';
import { faCircleExclamation, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  faExclamation = faCircleExclamation;
  faGear_ = faGear;
  logoSvg = "https://assets-cdn.kahoot.it/builder/v2/assets/icn-live-game-00869c8b.svg";
  bannerImg = "https://kahoot.com/files/2019/02/KahootPlusPro_MobileChallenges.png";
}
