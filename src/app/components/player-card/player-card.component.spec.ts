import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardComponent } from './player-card.component';
import { newMusic } from '../../common/factories';
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { By } from '@angular/platform-browser';
import { PlayerService } from '../../services/player.service';
import { BehaviorSubject } from 'rxjs';

describe('PlayerCardComponent', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;
  let mockPlayerService: jest.Mocked<PlayerService>;
  let currentMusicSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    currentMusicSubject = new BehaviorSubject(newMusic());

    mockPlayerService = {
      play: jest.fn(),
      pause: jest.fn(),
      skipToPrevious: jest.fn(),
      skipToNext: jest.fn(),
      currentMusic: currentMusicSubject.asObservable(),
    } as unknown as jest.Mocked<PlayerService>;

    await TestBed.configureTestingModule({
      imports: [PlayerCardComponent],
      providers: [{ provide: PlayerService, useValue: mockPlayerService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the music title', () => {
    const music = newMusic();
    component.music.set(music);
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(
      By.css('[data-testId="spanTitle"]')
    ).properties['innerHTML'];

    expect(titleElement).toContain(music.title);
  });

  it('should play the previous track', () => {
    jest.spyOn(component, 'skipToPrevious');
    const previousButton = fixture.debugElement.query(
      By.css('[data-testId="previous"]')
    );
    previousButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.skipToPrevious).toHaveBeenCalled();
  });

  it('should play the next track', () => {
    jest.spyOn(component, 'skipToNext');
    const nextButton = fixture.debugElement.query(
      By.css('[data-testId="next"]')
    );
    nextButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.skipToNext).toHaveBeenCalled();
  });

  it('should pause the track', () => {
    component.music().isPlaying = true;
    fixture.detectChanges();
    jest.spyOn(component, 'pause');
    const pauseButton = fixture.debugElement.query(
      By.css('[data-testId="pause"]')
    );
    pauseButton.triggerEventHandler('click', null);

    expect(component.pause).toHaveBeenCalled();
  });

  it('should play the track', () => {
    component.music().isPlaying = false;
    fixture.detectChanges();
    jest.spyOn(component, 'play');
    const playButton = fixture.debugElement.query(
      By.css('[data-testId="play"]')
    );
    playButton.triggerEventHandler('click', null);

    expect(component.play).toHaveBeenCalled();
  });

  describe('ngOnInit', () => {
    it('music has default value', () => {
      expect(component.music()).toEqual(newMusic());
    });

    it('previousIcon has default value', () => {
      const icon = faStepBackward;
      expect(component.previousIcon).toEqual(icon);
    });

    it('nextIcon has default value', () => {
      const icon = faStepForward;
      expect(component.nextIcon).toEqual(icon);
    });

    it('playIcon has default value', () => {
      const icon = faPlay;
      expect(component.playIcon).toEqual(icon);
    });

    it('pauseIcon has default value', () => {
      const icon = faPause;
      expect(component.pauseIcon).toEqual(icon);
    });

    it('should call getCurrentMusic', () => {
      jest.spyOn(component, 'getCurrentMusic');
      component.ngOnInit();
      expect(component.getCurrentMusic).toHaveBeenCalled();
    });
  });
});
