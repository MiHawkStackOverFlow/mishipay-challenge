import { Subscription } from 'rxjs';
import { BeepService } from '../services/beep.service';
import { MockBuilder } from '../test/utils/mock-builder.spec';

export class BeepServiceMock {
  public static mock(): jasmine.SpyObj<BeepService> {
    const subscr = new Subscription();
    const date = new Date();
    const mock = MockBuilder.buildStaticMock<BeepService>(
        'BeepService',
        [
          ['beep', null]
        ]
    );

    return mock;
  }
}