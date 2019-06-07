import {Doctor} from './../src/doctor';

/* eslint-disable no-undef */
describe('Doctor', () => {
  let testDoctor;

  beforeEach(() => {
    testDoctor = new Doctor('Hannibal', 'Lector', '123 Blah Ave', '1(666)666-6666', 'www.url.com', true);
  })

  describe('Doctor constructor', () => {
    test('should instatiate a Doctor Object', () +> {
      expect(typeof testDoctor).toBe("object");
    })
  })

  describe('Doctor methods', () => {
    test('should do something', () => {
      
    })
  })
})
