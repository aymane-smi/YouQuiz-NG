import { Component } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import { LevelService } from 'src/services/level.service';
import {Level} from '../../../interfaces/Level';
import { LevelStateService } from 'src/services/level-state-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(private levelService: LevelService, private levelState: LevelStateService, private toastr:ToastrService){}
  form = new FormGroup({
    description : new FormControl<string>(''),
    maxScore: new FormControl<number>(0),
    minScore: new FormControl<number>(0),
  });
  onSubmit(): void{
    this.levelService.addLevel(<Level>this.form.getRawValue()).subscribe();
    this.levelState.getState().close();
    this.toastr.success('message', 'level created with success!');
  }
}
