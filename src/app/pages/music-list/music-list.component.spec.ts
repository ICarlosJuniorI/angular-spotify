import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListComponent } from './music-list.component';

describe('MusicListComponent', () => {
  let component: MusicListComponent;
  let fixture: ComponentFixture<MusicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   jest.spyOn(mockRouter, 'navigateByUrl');
  //   const mockPlaylistId: string = '3WlAfHbriUPICeO5CfACnt';
  //   mockRouter.navigateByUrl(`player/list/playlist/${mockPlaylistId}`);
  //   expect(component).toBeTruthy();
  // });
});
