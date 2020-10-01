 
export class MockBuilder {
    public static buildStaticMock<T>(mockName: string, mockList: Array<[keyof T, any]>): jasmine.SpyObj<T> {
      const methodsNames: (keyof T)[] = MockBuilder.getMockMethodsNames<T>(mockList);
  
      const mock = jasmine.createSpyObj<any>(mockName, methodsNames);
  
      mockList.forEach((mockConfig: [keyof T, any]) => {
        const mName: keyof T = mockConfig[0];
        const mockResult: any = mockConfig[1];
        mock[mName].and.returnValue(mockResult);
      });
  
      return mock;
    }
  
    public static buildDynamicMock<T>(mockName: string, mockList: Array<[keyof T, (...args: any[]) => any]>): jasmine.SpyObj<T> {
      const methodsNames: (keyof T)[] = MockBuilder.getMockMethodsNames<T>(mockList);
  
      const mock = jasmine.createSpyObj<any>(mockName, methodsNames);
  
      mockList.forEach((mockConfig: [keyof T, (...args: any[]) => any]) => {
        const mName: keyof T = mockConfig[0];
        const mockFunction: any = mockConfig[1];
        mock[mName].and.callFake(mockFunction);
      });
  
      return mock;
    }
  
    private static getMockMethodsNames<M>(mockList: Array<[keyof M, any]>): (keyof M)[] {
      return mockList.map((mockConfig: [keyof M, any]) => mockConfig[0]);
    }
  }
  