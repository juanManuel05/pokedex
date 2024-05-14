import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaDialogComponent } from './social-media-dialog.component';

describe('DialogComponent', () => {
  let component: SocialMediaDialogComponent;
  let fixture: ComponentFixture<SocialMediaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialMediaDialogComponent],
    });
    fixture = TestBed.createComponent(SocialMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
