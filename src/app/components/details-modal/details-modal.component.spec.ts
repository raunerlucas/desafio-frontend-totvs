import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DetailsModalComponent} from './details-modal.component';
import {MOCK_POKEMON_DETAILS} from "../../mocks/pokemon-data.mock";

describe('DetailsModalComponent', () => {
  let component: DetailsModalComponent;
  let fixture: ComponentFixture<DetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pokemon image when pokemon input is set', () => {
    component.pokemon = MOCK_POKEMON_DETAILS;
    component.ngOnChanges();
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain(MOCK_POKEMON_DETAILS.sprites.other.dream_world.front_default);
  });

  it('should emit close event when closeModal is called', () => {
    spyOn(component.close, 'emit');
    component.closeModal();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
