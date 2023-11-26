import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faCircleArrowUp, faFolderTree, faFileCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  faUp = faCircleArrowUp;
  faFolder = faFolderTree;
  faQuestion = faFileCircleQuestion;
  menuToggle: Boolean = false;
  toggle(): void{
    this.menuToggle = !this.menuToggle;
    console.log(this.menuToggle);
  }
}
