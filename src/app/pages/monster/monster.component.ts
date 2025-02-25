import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';

@Component({
  selector: 'app-monster',
  imports: [ReactiveFormsModule, PlayingCardComponent],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css',
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);

  private routeSubscription: Subscription | null = null;
  private formValuesSubscription: Subscription | null = null;

  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(0), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [
      0,
      [Validators.required, Validators.min(0), Validators.max(200)],
    ],
    attackDescription: ['', [Validators.required]],
  });

  monster: Monster = Object.assign(new Monster(), this.formGroup.value);
  monsterTypes = Object.values(MonsterType);

  monsterId = signal<number | undefined>(-1);

  ngOnInit(): void {
    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(
      (data) => {
        this.monster = Object.assign(this.monster, data);
      }
    );
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);
      const monsterFound = this.monsterService.get(this.monsterId() ?? -1);
      if (monsterFound) {
        this.monster = monsterFound;
        this.formGroup.patchValue(monsterFound);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.formValuesSubscription?.unsubscribe();
  }

  next() {
    let nextId = this.monsterId() || 0;
    nextId++;
    this.router.navigate(['monster/' + nextId]);
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.monsterId() && this.monsterId() === -1) {
      this.monsterService.add(this.monster);
    } else {
      this.monster.id = Number(this.monsterId());
      this.monsterService.update(this.monster);
    }
    this.navigateBack();
  }

  isFieldValid(field: string) {
    const formControl = this.formGroup.get(field);

    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string,
        });
      };
    }
  }
}
