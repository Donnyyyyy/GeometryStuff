import { ParameterManager } from './';

describe('Service: ParameterManager', () => {

    it('should create proper requiredSignature', () => {
        let requiredSignature: { [type: string]: number } = {
            'Vector3': 1,
            'Plane': 0,
            'Something': 10,
        };
        let manager = new ParameterManager(requiredSignature);
        
        expect(manager.requiredSignature)
            .toEqual(requiredSignature);
    });

    it('should add new objects', () => {
        let requiredSignature: { [type: string]: number } = {};
        let manager = new ParameterManager(requiredSignature);

        manager.add('Vector3');
        manager.add('Vector3');
        manager.add('Vector3');

        manager.add('add');

        expect(manager.currentSignature['Vector3'])
            .toEqual(3);
        expect(manager.currentSignature['add'])
            .toEqual(1);
    });

    it('should remove objects', () => {
        let requiredSignature: { [type: string]: number } = {};
        let manager = new ParameterManager(requiredSignature);

        manager.add('Vector3');
        manager.add('Vector3');
        manager.add('Vector3');
        manager.add('add');

        manager.remove('add');
        manager.remove('Vector3');
        manager.remove('Vector3');

        expect(manager.currentSignature['Vector3'])
            .toEqual(1);
        expect(manager.currentSignature['add'])
            .toEqual(0);
    });

    it('should check validity of equal signatures', () => {
        let requiredSignature: { [type: string]: number } = {
            'Vector3': 0,
            'Plane': 9,
            'Something': -1,
        };
        let manager = new ParameterManager(requiredSignature);

        for (let counter = 0; counter < 9; counter++) {
            manager.add('Plane');
        }
        manager.add('Something');
        manager.remove('Something');
        manager.remove('Something');
        manager.add('trash');
        manager.remove('trash');

        expect(manager.isValid())
            .toBeTruthy();
    });

    it('should check validity of unequal signatures (zero-number case)', () => {
        let requiredSignature: { [type: string]: number } = {
            'Vector3': 0,
            'Plane': 9,
            'Something': -1,
        };
        let manager = new ParameterManager(requiredSignature);

        manager.add('Vector3');
        for (let counter = 0; counter < 9; counter++) {
            manager.add('Plane');
        }
        manager.add('Something');
        manager.remove('Something');
        manager.remove('Something');

        expect(manager.isValid())
            .toBeFalsy();
    });

    it('should check validity of unequal signatures (non-zero-number case)', () => {
        let requiredSignature: { [type: string]: number } = {
            'Vector3': 0,
            'Plane': 9,
            'Something': -1,
        };
        let manager = new ParameterManager(requiredSignature);

        manager.add('Vector3');
        for (let counter = 0; counter < 10; counter++) {
            manager.add('Plane');
        }
        manager.add('Something');
        manager.remove('Something');

        expect(manager.isValid())
            .toBeFalsy();
    });
});
