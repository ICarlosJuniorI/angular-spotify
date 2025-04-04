import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MenuButtonComponent } from './menu-button.component';
import { By } from '@angular/platform-browser';

describe('MenuButtonComponent', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MenuButtonComponent],
    });

    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('description has default value', () => {
    expect(component.description()).toEqual('');
  });

  it('selected has default value', () => {
    expect(component.selected()).toEqual(false);
  });

  it('should call onClick on button click', () => {
    const clickEmitSpy = jest.spyOn(component.click, 'emit');

    const button = fixture.debugElement.query(By.css('[data-testid="button"]'));

    button.triggerEventHandler('click', null);

    expect(clickEmitSpy).toHaveBeenCalled();
  });

  it('should render description', () => {
    const expectedDescription = 'Test description';

    jest.spyOn(component, 'description').mockReturnValue(expectedDescription);

    fixture.detectChanges();

    const spanDescription = fixture.debugElement.query(
      By.css('[data-testid="spanDescription"]')
    ).nativeElement;

    expect(spanDescription.textContent).toEqual(expectedDescription);
  });
});
