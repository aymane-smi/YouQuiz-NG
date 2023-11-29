import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faCircleArrowUp, faFolderTree, faFileCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from '../material/dialog/dialog.component';
import { LevelStateService } from 'src/services/level-state-service.service';

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

  constructor(public dialog: MatDialog, private levelState: LevelStateService){}
  toggle(): void{
    this.menuToggle = !this.menuToggle;
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {enterAnimationDuration: '400ms', exitAnimationDuration: '400ms', autoFocus: false	});
    this.levelState.setState(dialogRef);
  }
}
