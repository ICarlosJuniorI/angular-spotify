import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { LeftPanelComponent } from './left-panel.component';

describe('LeftPanelComponent', () => {
  let component: LeftPanelComponent;
  let fixture: ComponentFixture<LeftPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LeftPanelComponent]
    });
    fixture = TestBed.createComponent(LeftPanelComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`selectedMenu has default value`, () => {
    expect(component.selectedMenu).toEqual(`Home`);
  });

  it(`subs has default value`, () => {
    expect(component.subs).toEqual([]);
  });

  it(`homeIcon has default value`, () => {
    expect(component.homeIcon).toEqual(faHome);
  });

  it(`searchIcon has default value`, () => {
    expect(component.searchIcon).toEqual(faSearch);
  });

  it(`artistIcon has default value`, () => {
    expect(component.artistIcon).toEqual(faGuitar);
  });

  it(`playlistIcon has default value`, () => {
    expect(component.playlistIcon).toEqual(faMusic);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getPlaylists').and.callThrough();
      component.ngOnInit();
      expect(component.getPlaylists).toHaveBeenCalled();
    });
  });
});
