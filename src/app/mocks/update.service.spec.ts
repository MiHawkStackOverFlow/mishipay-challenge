import { Subscription } from 'rxjs';
import { UpdateService } from '../services/update.service';
import { MockBuilder } from '../test/utils/mock-builder.spec';

export class UpdateServiceMock {
  public static mock(): jasmine.SpyObj<UpdateService> {
    const subscr = new Subscription();
    const date = new Date();
    const mock = MockBuilder.buildStaticMock<UpdateService>(
        'UpdateService',
        [
          ['checkForUpdates', null]
        ]
    );

    return mock;
  }
}