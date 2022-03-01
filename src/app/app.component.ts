import { Component, VERSION } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  titleText = 'Angular Material Playground ' + VERSION.major;

  gpe: FormGroup = new FormGroup({
    catGpe: new FormGroup(
      {
        chck: new FormControl(false),
        category: new FormControl(-1, Validators.required),
      },
      (g): ValidationErrors | null => {
        const mustHaveCat =
          Boolean(g.get('chck').value === true) &&
          Boolean(
            g.get('category').value === -1 || g.get('category').value === null
          );
        return mustHaveCat ? { catMissing: true } : null;
      }
    ),
  });

  categories$: Observable<any> = of([
    { id: 1, description: '1 2' },
    { id: 2, description: '1 3' },
    { id: 3, description: '1 4' },
    { id: 4, description: '1 5' },
    { id: 5, description: '1 6 4' },
    { id: 6, description: '1 6' },
    { id: 7, description: '1 7' },
  ]);

  onSubmit() {
    console.log('submitted', (this.gpe as FormGroup)?.value);
  }
  reset() {
    this.gpe.reset();
  }
}
