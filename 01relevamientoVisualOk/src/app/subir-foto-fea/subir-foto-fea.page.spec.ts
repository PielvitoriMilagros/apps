import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubirFotoFeaPage } from './subir-foto-fea.page';

describe('SubirFotoFeaPage', () => {
  let component: SubirFotoFeaPage;
  let fixture: ComponentFixture<SubirFotoFeaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirFotoFeaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubirFotoFeaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
