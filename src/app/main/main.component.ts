import { Component } from '@angular/core';
import { faCircleExclamation, faGear } from '@fortawesome/free-solid-svg-icons';
import { MainService } from './main.service';
import { Level } from 'src/interfaces/Level';
import { Subject } from 'src/interfaces/Subject';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  constructor(private mainService: MainService){}
  faExclamation = faCircleExclamation;
  faGear_ = faGear;
  logoSvg = "https://assets-cdn.kahoot.it/builder/v2/assets/icn-live-game-00869c8b.svg";
  bannerImg = "https://kahoot.com/files/2019/02/KahootPlusPro_MobileChallenges.png";
  levels: Level[] = [];
  subjects: Subject[] = [];

  ngOnInit(): void{
    this.getLevels();
    this.getSubjects();
  }

  getLevels(): void{
    this.mainService.getLevels().subscribe(levels => this.levels = levels.levels);
  }

  getSubjects(): void{
    this.mainService.getSubjects().subscribe(subjects => this.subjects = subjects.subjects);
  }

}
