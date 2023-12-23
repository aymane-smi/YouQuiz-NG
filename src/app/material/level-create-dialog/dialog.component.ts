import { Component } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import { LevelService } from 'src/services/level.service';
import {Level} from '../../models/interfaces/Level';
import { LevelStateService } from 'src/services/level-state-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(private levelService: LevelService,
    private levelState: LevelStateService,){}
  form = new FormGroup({
    description : new FormControl<string>(''),
    maxScore: new FormControl<number>(0),
    minScore: new FormControl<number>(0),
  });
  onSubmit(): void{
    this.levelService.addLevel(<Level>this.form.getRawValue()).subscribe(level => {
      this.levelState.getState().close({
        data: level.level
      });
    });
  }
}
