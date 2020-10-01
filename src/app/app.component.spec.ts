import { ChangeDetectorRef } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BeepService } from './services/beep.service';
import { UpdateService } from './services/update.service';

import { BeepServiceMock } from './mocks/beep.service.spec';
import { UpdateServiceMock } from './mocks/update.service.spec';

import { GetPrivate, SetPrivate } from './mocks/common-mocks.spec';

describe('AppComponent', () => {
  let component: AppComponent;
  let updateServiceMock: jasmine.SpyObj<UpdateService> = null;
  let beepServiceMock: jasmine.SpyObj<BeepService> = null;
  let changeDetectorMock: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async(() => {
    changeDetectorMock = jasmine.createSpyObj('ChangeDetectorRef', [
      'markForCheck', 'detectChanges'
    ]);
    updateServiceMock = UpdateServiceMock.mock();
    beepServiceMock = BeepServiceMock.mock();
    component = new AppComponent(changeDetectorMock, beepServiceMock, updateServiceMock);
  }));

  it(`should have properties set`, () => {
    expect(component.title).toEqual('mishipay-challenge');
    expect(GetPrivate(component, 'catalogue')).toBeDefined();
  });

  it('should correct ngAfterViewInit', fakeAsync(() => {
    let funBackup = navigator.mediaDevices.getUserMedia;
    navigator.mediaDevices.getUserMedia = null;
    component.ngAfterViewInit();
    expect(component.errorMessage).toBe('getUserMedia is not supported');

    navigator.mediaDevices.getUserMedia = funBackup;
    component.ngAfterViewInit();
    tick(10000);
    expect(updateServiceMock.checkForUpdates).toHaveBeenCalled();
  }));

  it('should correct onBarcodeScanned', () => {
    let mockCode: string = '12345678';

    let timeAhead = new Date().getTime() + 2000;
    SetPrivate(component, 'lastScannedCode', mockCode);
    SetPrivate(component, 'lastScannedCodeDate', timeAhead);
    const result1 = component.onBarcodeScanned(mockCode);
    expect(result1).toBeUndefined();

    SetPrivate(component, 'lastScannedCodeDate', new Date().getTime());
    SetPrivate(component, 'lastScannedCode', '224215252');
    const result2 = component.onBarcodeScanned(mockCode);
    expect(result2).toBeUndefined();

    SetPrivate(component, 'lastScannedCodeDate', new Date().getTime() - 5000);
    component.onBarcodeScanned('7601234567890');
    expect(GetPrivate(component, 'lastScannedCode')).toBe('7601234567890');
  });

});
