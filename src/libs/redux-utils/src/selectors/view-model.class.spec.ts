import { ViewModel } from './view-model.class';

export interface IPlanet {
  name: string;
}

export class Planet extends ViewModel<IPlanet> {
  protected static readonly defaults = {
    name: 'Earth',
  };

  public name: string;

  constructor(props: Partial<IPlanet>) {
    super({ ...Planet.defaults, ...props });
  }
}

interface IPerson {
  id: string;
  firstname: string;
  lastname: string;
  planet: IPlanet | null;
}

// tslint:disable-next-line:max-classes-per-file
class Person extends ViewModel<IPerson> {
  protected static readonly defaults: IPerson = {
    id: '42',
    firstname: '',
    lastname: '',
    planet: null,
  };

  public id: string;
  public firstname: string;
  public lastname: string;

  get planet() {
    return this.getInstance('planet', Planet);
  }

  constructor(args?: Partial<IPerson>) {
    super({ ...Person.defaults, ...args });
  }
}

describe('ViewModel', () => {
  let subject: Person;

  beforeEach(() => {
    subject = new Person({ firstname: 'Arthur', lastname: 'Dent' });
  });

  it('creates getters for all attributes', () => {
    expect(subject.id).toEqual('42');
    expect(subject.firstname).toEqual('Arthur');
    expect(subject.lastname).toEqual('Dent');
  });

  describe('without params', () => {
    beforeEach(() => {
      subject = new Person();
    });

    it('returns the default values', () => {
      expect(subject.id).toEqual('42');
      expect(subject.firstname).toEqual('');
      expect(subject.lastname).toEqual('');
    });
  });

  describe('getProp', () => {
    it('returns the property value', () => {
      expect(subject.getProp('lastname')).toEqual('Dent');
    });
  });

  describe('merge', () => {
    let newPerson: Person;

    beforeEach(() => {
      newPerson = subject.merge({ id: '44' });
    });

    it('creates an new instance', () => {
      expect(subject).not.toBe(newPerson);
    });

    it('keeps the unset values', () => {
      expect(subject.firstname).toEqual(newPerson.firstname);
      expect(subject.lastname).toEqual(newPerson.lastname);
    });

    it('overwrites the set values', () => {
      expect(newPerson.id).toEqual('44');
      expect(subject.id).not.toEqual(newPerson.id);
    });
  });

  describe('toObject', () => {
    it('returns a clone of the props attribute', () => {
      const props = subject.toObject();
      expect(props).toEqual((subject as any).props);
      expect(props).not.toBe((subject as any).props);
    });
  });

  describe('toJSON', () => {
    it('returns a clone of the props attribute', () => {
      const json = subject.toJSON();
      expect(json).toEqual('{"id":"42","firstname":"Arthur","lastname":"Dent","planet":null}');
    });
  });

  describe('loaded', () => {
    it('returns true if an id is set', () => {
      expect(subject.loaded).toBe(true);
    });

    it('returns false if no id is set', () => {
      expect(subject.merge({ id: null }).loaded).toBe(false);
    });
  });

  describe('getInstance', () => {
    it('creates a class instance from the raw data in props', () => {
      expect(subject.planet).toBeInstanceOf(Planet);
    });

    it('caches the instance', () => {
      expect(subject.planet).toBe(subject.planet);
    });

    it('gives access to the props data', () => {
      expect(subject.planet.name).toEqual('Earth');
    });
  });
});
