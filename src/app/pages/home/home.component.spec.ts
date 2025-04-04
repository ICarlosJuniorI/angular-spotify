import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './home.component';
import { newMusic } from '../../common/factories';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HomeComponent],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('musics has default value', () => {
    expect(component.musics()).toEqual([]);
  });

  it('currentMusic has default value', () => {
    expect(component.currentMusic).toEqual(newMusic());
  });

  it(`playIcon has default value`, () => {
    expect(component.playIcon).toEqual(faPlay);
  });

  describe('ngOnInit', () => {
    it('should make expected calls', () => {
      jest.spyOn(component, 'getMusics');
      jest.spyOn(component, 'getCurrentMusic');
      component.ngOnInit();
      expect(component.getMusics).toHaveBeenCalled();
      expect(component.getCurrentMusic).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call destroy$', () => {
      const nextSpy = jest.spyOn(component['destroy$'], 'next');
      const completeSpy = jest.spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });
});
