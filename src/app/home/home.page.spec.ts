import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    localStorage.clear();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens on the level path with level 1 selected', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Level 1 selected');
    expect(text).toContain('Scroll the path, tap a bright level, or press Play.');
    expect(text).toContain('Cleared 0 of 15');
  });

  it('offers the next level after a win', () => {
    component.screen.set('play');
    component.levelNumber.set(1);
    component.complete.set(true);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Play again');
    expect(text).toContain('Next level');
    expect(text).not.toContain('Level path');
    expect(fixture.nativeElement.querySelector('ion-toolbar .timer')?.textContent).toBe('00:00');
    expect(fixture.nativeElement.querySelectorAll('.status-bar .level')).toHaveLength(0);
  });

  it('hides the next level after the last level', () => {
    component.screen.set('play');
    component.levelNumber.set(15);
    component.complete.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent as string).not.toContain('Next level');
  });
});
